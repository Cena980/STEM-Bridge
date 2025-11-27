import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
const router = "express.Router()";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";

import { db } from "./db.js";
import submissionsRoutes from "./routes/submissions.js";
import detailsRoutes from "./routes/detailsRoutes.js";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/submissions", submissionsRoutes);
app.use("/api", detailsRoutes);


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


// Create assignment, project, and quiz
// ===== CREATE ASSIGNMENT ===== //
app.post("/api/auth/assignments/create", async (req, res) => {
  const { courseId, title, description, max_points, due_date } = req.body;

  if (!courseId || !title) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const id = uuidv4();

  try {
    await db.execute(
      "INSERT INTO assignments (id, course_id, title, description,max_points, due_date) VALUES (?, ?, ?, ?,?,?)",
      [id, courseId, title, description,max_points, due_date]
    );

    res.json({ message: "Assignment created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating assignment" });
  }
});

//Create project
app.post("/api/auth/projects/create", async (req, res) => {
  const { courseId, title, max_points, description, due_date } = req.body;

  if (!courseId || !title) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const id = uuidv4();

  try {
    await db.execute(
      "INSERT INTO projects (id, course_id, title, description,max_points, due_date) VALUES (?, ?, ?, ?, ?,?)",
      [id,courseId, title, description, max_points, due_date]
    );

    res.json({ message: "Project created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating project" });
  }
});


// create quiz
app.post("/api/auth/quizzes/create", async (req, res) => {
  const { courseId, title, description, time_limit, available_from, due_date } = req.body;

  if (!courseId || !title) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const id = uuidv4();
  const available_from1 = available_from.replace("T", " ") + ":00";
  const available_until = due_date.replace("T", " ") + ":00";

  try {
    await db.execute(
      "INSERT INTO quizzes (id, course_id, title, description, time_limit, available_from, available_until) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, courseId, title, description, time_limit, available_from1, available_until]
    );
    res.json({ message: "Quiz created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating quiz" });
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
        SELECT a.*, c.title AS course_name, c.course_code AS course_code
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
// GET /api/grades?courseId=1&itemType=assignment
app.get("/api/grades", async (req, res) => {
  const { courseId, itemType } = req.query;

  if (!courseId || !itemType) {
    return res.status(400).json({ message: "Missing courseId or itemType" });
  }

  try {
    // Fetch all submissions with grades for this course and item type
    const [rows] = await db.execute(
      `SELECT s.id, s.student_id, u.full_name AS student_name, s.item_type, s.item_id, s.grade, s.feedback
       FROM submissions s
       JOIN profiles u ON s.student_id = u.id
       WHERE s.course_id = ? AND s.item_type = ?`,
      [courseId, itemType]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/courses/:courseId/grades
app.get("/api/courses/:courseId/grades", async (req, res) => {
  const { courseId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT 
         u.id AS student_id,
         u.full_name AS studentName,
         SUM(CASE WHEN s.item_type='assignment' THEN s.grade END) AS assignmentGrade,
         SUM(CASE WHEN s.item_type='project' THEN s.grade END) AS projectGrade,
         SUM(CASE WHEN s.item_type='quiz' THEN s.grade END) AS quizGrade,
         SUM(s.grade) AS total
       FROM submissions s
       JOIN profiles u ON s.student_id = u.id
       WHERE s.course_id = ?
       GROUP BY u.id, u.full_name`,
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


// Create conversation //
app.post("/api/conversations", async (req, res) => {
  const { user1_id, user2_email, user2_name } = req.body;

  try {
    // 1. Find the other user by email (profiles table)
    const [otherUser] = await db.execute(
      "SELECT id FROM profiles WHERE email = ?",
      [user2_email]
    );

    if (otherUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user2_id = otherUser[0].id;

    // 2. Check if conversation already exists
    const [existing] = await db.execute(
      `SELECT c.conversation_id
       FROM conversations c
       JOIN participants p1 ON p1.conversation_id = c.conversation_id
       JOIN participants p2 ON p2.conversation_id = c.conversation_id
       WHERE p1.user_id = ? AND p2.user_id = ? AND c.type = 'individual'`,
      [user1_id, user2_id]
    );

    if (existing.length > 0) {
      return res.json({ conversation_id: existing[0].conversation_id });
    }

    // 3. Create new conversation
    const [conv] = await db.execute(
      `INSERT INTO conversations (type, group_name)
       VALUES ('individual', NULL)`
    );

    const conversation_id = conv.insertId;

    // 4. Insert both participants
    await db.execute(
      `INSERT INTO participants (conversation_id, user_id)
       VALUES (?, ?), (?, ?)`,
      [conversation_id, user1_id, conversation_id, user2_id]
    );

    res.json({ conversation_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});


// Fetch messages for a conversation //
app.get("/api/messages/:conversationId", async (req, res) => {
  const { conversationId } = req.params;

  try {
    const [messages] = await db.execute(
      `SELECT m.message_id, m.conversation_id, m.sender_id, 
              p.full_name AS sender_name, p.avatar_url,
              m.content, m.timestamp, m.status
       FROM messages m
       JOIN profiles p ON p.id = m.sender_id
       WHERE m.conversation_id = ?
       ORDER BY m.timestamp ASC`,
      [conversationId]
    );

    res.json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// message controller
app.post("/api/messages", async (req, res) => {
  const { conversation_id, sender_id, content } = req.body;

  if (!conversation_id || !sender_id || !content) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // 1. Insert message
    const [result] = await db.execute(
      `INSERT INTO messages (conversation_id, sender_id, content, status)
       VALUES (?, ?, ?, 'sent')`,
      [conversation_id, sender_id, content]
    );

    const messageId = result.insertId;

    // 2. Update conversation last snippet + updated_at
    await db.execute(
      `UPDATE conversations
       SET last_message_snippet = ?, updated_at = NOW()
       WHERE conversation_id = ?`,
      [content.substring(0, 50), conversation_id] // store short preview
    );

    // 3. Fetch the newly inserted message (to return full structured message)
    const [newMessage] = await db.execute(
      `SELECT m.message_id, m.conversation_id, m.sender_id, 
              p.full_name AS sender_name, p.avatar_url,
              m.content, m.timestamp, m.status
       FROM messages m
       JOIN profiles p ON p.id = m.sender_id
       WHERE m.message_id = ?`,
      [messageId]
    );

    res.json(newMessage[0]);

  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//conversations
app.get("/api/conversations/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [conversations] = await db.execute(
      `SELECT 
          c.conversation_id,
          c.type,
          c.group_name,
          c.updated_at,
          
          -- 🔥 Return OTHER USER for individual chats
          CASE 
            WHEN c.type = 'individual' THEN 
              (SELECT user_id 
               FROM participants 
               WHERE conversation_id = c.conversation_id 
               AND user_id != ? 
               LIMIT 1)
            ELSE NULL
          END AS other_user_id,

          p.last_seen_message_id,

          -- unread count
          (SELECT COUNT(*) 
           FROM messages m 
           WHERE m.conversation_id = c.conversation_id
             AND m.message_id > p.last_seen_message_id
             AND m.sender_id != ?) AS unread_count,

          -- last message snippet
          (SELECT content
           FROM messages
           WHERE conversation_id = c.conversation_id
           ORDER BY timestamp DESC
           LIMIT 1) AS last_message_snippet

       FROM conversations c
       JOIN participants p ON c.conversation_id = p.conversation_id

       WHERE p.user_id = ?
       ORDER BY c.updated_at DESC`,
      [userId, userId, userId]
    );

    res.json(conversations);
  } catch (error) {
    console.error("Fetch conversations error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//fetch username and avatar//
app.get("/api/profiles/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [conversations] = await db.execute(
      `SELECT full_name, avatar_url
      FROM profiles
      WHERE id = ?`,
      [userId]
    );

    res.json(conversations);
  } catch (error) {
    console.error("Fetch profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
