import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ===== SIGNUP =====
app.post("/api/auth/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user exists
    const [rows] = await db.execute("SELECT * FROM profiles WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const id = uuidv4();
    const now = new Date();
    await db.execute(
      `INSERT INTO profiles 
      (id, email, full_name, role, password, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, email, fullName, role, hashedPassword, now, now]
    );
    console.log(`Created user: ${email} (${role})`);
    return res.json({
      message: "User created successfully",
      user: {
        id,
        email,
        full_name: fullName,
        role:role,
      },
      token: id,
    });

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

    // Login success → return a simple token (for now)
    return res.json({
      message: "Login successful",
      user: rows[0], // includes role, full_name, etc.
      token: user.id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
