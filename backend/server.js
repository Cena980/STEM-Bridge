import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mysql from "mysql2/promise";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";

import { db } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Set up storage for avatars
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "uploads/avatars");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Save file as: avatar-<timestamp>.<ext>
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

// ===== SIGNUP =====
app.post("/api/auth/signup", upload.single("avatar"), async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const avatarFile = req.file; // this will contain the uploaded file

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // if user exists
    const [rows] = await db.execute("SELECT * FROM profiles WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = uuidv4();
    const now = new Date();
    await db.execute(
      `INSERT INTO profiles 
      (id, email, full_name, role, password, avatar_url, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        email,
        fullName,
        role,
        hashedPassword,
        avatarFile ? `/uploads/avatars/${avatarFile.filename}` : null, // store avatar path
        now,
        now,
      ]
    );

    console.log(`Created user: ${email} (${role})`);
    return res.json({
      message: "User created successfully",
      user: {
        id,
        email,
        full_name: fullName,
        role,
        avatar: avatarFile ? `/uploads/avatars/${avatarFile.filename}` : null,
      },
      token: id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// ===== ENROLL IN COURSE =====

app.post("/api/auth/enroll", async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ message: "Student ID and Course ID are required" });
  }

  try {
    // Optional: check if already enrolled
    const [existing] = await db.execute(
      "SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?",
      [userId, courseId]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Student already enrolled in this course" });
    }

    // Insert new enrollment
    await db.execute(
      "INSERT INTO enrollments (id, student_id, course_id, status) VALUES (?, ?, ?, ?)",
      [uuidv4(), userId, courseId, "active"]
    );

    res.status(201).json({ message: "Enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// ===== CourseList =====
app.get("/api/auth/courses", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM courses");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===== Student CourseList =====
app.get("/api/auth/courses/student/:studentId", async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const [courses] = await db.execute(
      `
        SELECT c.* 
        FROM courses c
        JOIN enrollments e ON c.id = e.course_id
        WHERE e.student_id = ?
      `,
      [studentId]
    );

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found for this student" });
    }

    res.json(courses);

  } catch (err) {
    console.error("Error fetching student courses:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ===== Professor AssignmentList =====
app.get("/api/auth/assignment/fetch/professor/:P_Id", async (req, res) => {
  const { P_Id } = req.params;

  if (!P_Id) {
    return res.status(400).json({ message: "User Id is required" });
  }

  try {
    const [assignments] = await db.execute(
      `
        SELECT a.*, c.name AS course_name, c.code AS course_code
        FROM assignments a
        JOIN courses c ON a.course_id = c.id
        WHERE c.professor_id = ?
      `,
      [P_Id]
    );

    if (assignments.length === 0) {
      return res.status(404).json({ message: "No assignments found for this user" });
    }

    res.json(assignments);

  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ===== Professor projectList =====
app.get("/api/auth/project/fetch/professor/:P_Id", async (req, res) => {
  const { P_Id } = req.params;

  if (!P_Id) {
    return res.status(400).json({ message: "User Id is required" });
  }

  try {
    const [projects] = await db.execute(
      `
        SELECT p.*, c.title AS course_name, c.course_code AS course_code
        FROM projects p
        JOIN courses c ON p.course_id = c.id
        WHERE c.professor_id = ?
      `,
      [P_Id]
    );

    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found for this user" });
    }

    res.json(projects);

  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// ===== Student AssignmentList =====
app.get("/api/auth/assignment/fetch/student/:P_Id", async (req, res) => {
  const { P_Id } = req.params;

  if (!P_Id) {
    return res.status(400).json({ message: "User Id is required" });
  }

  try {
    const [assignments] = await db.execute(`
      SELECT a.*
      FROM assignments a
      JOIN courses c ON a.course_id = c.id
      JOIN enrollments e ON c.id = e.course_id
      JOIN profiles p ON e.student_id = p.id
      WHERE p.id = ?
    `, [P_Id]);

    if (assignments.length === 0) {
      return res.status(404).json({ message: "No assignments found for this user" });
    }

    res.json(assignments);

  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===== Student ProjectList =====
app.get("/api/auth/project/fetch/student/:P_Id", async (req, res) => {
  const { P_Id } = req.params;

  if (!P_Id) {
    return res.status(400).json({ message: "User Id is required" });
  }

  try {
    const [projects] = await db.execute(`
      SELECT a.*
      FROM projects a
      JOIN courses c ON a.course_id = c.id
      JOIN enrollments e ON c.id = e.course_id
      JOIN profiles p ON e.student_id = p.id
      WHERE p.id = ?
    `, [P_Id]);

    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found for this user" });
    }

    res.json(projects);

  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===== CommunityList =====
app.get("/api/auth/Community", async (req, res) => {

  try {
    const [Communitys] = await db.execute(`
      SELECT a.full_name, a.email, a.role, a.avatar_url
      FROM profiles a
    `);

    if (Communitys.length === 0) {
      return res.status(404).json({ message: "No Communitys found for this user" });
    }

    res.json(Communitys);

  } catch (err) {
    console.error("Error fetching Communitys:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// ===== CourseDetails =====
app.get("/api/auth/courses/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM courses where id = ?", [req.params.id] );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ===== CREATE COURSE =====
app.post("/api/auth/create-course", async (req, res) => {
  const { title, description, code, professor_id, credits, start_date, end_date } = req.body;
  const id = uuidv4();
  try {
    await db.execute(
      "INSERT INTO courses (id, title, description, course_code,professor_id, credits, start_date, end_date) VALUES (?,?, ?, ?, ?, ?, ?, ?)",
      [id,title || null, description || null, code || null,professor_id || null, credits || null, start_date || null, end_date || null]
    );

    res.status(201).json({ message: "Course created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create course" });
  }
});


// ===== LOGIN =====
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const [rows] = await db.execute("SELECT * FROM profiles WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return res.json({
      message: "Login successful",
      user: rows[0],
      token: user.id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GradeTable
app.get("/api/auth/courses/:courseId/grades", async (req, res) => {
  const { courseId } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT * from courses where id = ?`,
      [courseId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// AssignmentList
app.get("/api/auth/courses/:courseId/assignments", async (req, res) => {
  const { courseId } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT * from assignments where course_id = ?`,
      [courseId]
    );
    res.json(rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ProjectList
app.get("/api/auth/courses/:courseId/projects", async (req, res) => {
  const { courseId } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT * from projects where course_id = ?`,
      [courseId]
    );
    res.json(rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// QuizList
app.get("/api/auth/courses/:courseId/quizzes", async (req, res) => {
  const { courseId } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT * from quizzes where course_id = ?`,
      [courseId]
    );
    res.json(rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
