import express from "express";
import { db } from "../db.js";
import multer from "multer";

const router = express.Router();

// -------------------------
// Multer config for file uploads
// -------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// -------------------------
// 1. Text-only submission
// POST /api/submissions/submit
// -------------------------
router.post("/submit", async (req, res) => {
  try {
    const { studentId, courseId, itemType, itemId, submissionText } = req.body;
    if (!studentId || !courseId || !itemType || !itemId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await db.execute(
      `INSERT INTO submissions 
       (student_id, course_id, item_type, item_id, submission_text) 
       VALUES (?, ?, ?, ?, ?)`,
      [studentId, courseId, itemType, itemId, submissionText]
    );

    res.json({ message: "Submission successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------
// 2. File + text submission
// POST /api/submissions/submit-file
// -------------------------
router.post("/submit-file", upload.single("file"), async (req, res) => {
  try {
    const { studentId, courseId, itemType, itemId, submissionText } = req.body;
    console.log(req.body);

    if (!studentId || !courseId || !itemType || !itemId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const filePath = req.file ? req.file.path : null;

    await db.execute(
      `INSERT INTO submissions 
       (student_id, course_id, item_type, item_id, submission_text, submission_file) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [studentId, courseId, itemType, itemId, submissionText, filePath]
    );

    res.json({ message: "Submission successful", filePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------
// 3. Get a student's submission for a specific item
// GET /api/submissions/:itemType/:itemId/student/:studentId
// -------------------------
router.get("/:itemType/:itemId/student/:studentId", async (req, res) => {
  try {
    const { itemType, itemId, studentId } = req.params;

    const [rows] = await db.execute(
      `SELECT * FROM submissions 
       WHERE item_type = ? AND item_id = ? AND student_id = ?`,
      [itemType, itemId, studentId]
    );

    res.json(rows[0] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------
// 4. Get all submissions for a professor for a specific item
// GET /api/submissions/:itemType/:itemId
// -------------------------
router.get("/:itemType/:itemId", async (req, res) => {
  try {
    const { itemType, itemId } = req.params;

    const [rows] = await db.execute(
      `SELECT s.*, u.full_name AS student_name 
       FROM submissions s
       JOIN profiles u ON s.student_id = u.id
       WHERE s.item_type = ? AND s.item_id = ?
       ORDER BY submitted_at DESC`,
      [itemType, itemId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------
// 5. Grade a submission
// POST /api/submissions/grade
// -------------------------
router.post("/grade", async (req, res) => {
  try {
    const { submissionId, grade, feedback } = req.body;

    if (!submissionId || grade === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await db.execute(
      `UPDATE submissions 
       SET grade = ?, feedback = ?, status = 'graded', graded_at = NOW()
       WHERE id = ?`,
      [grade, feedback, submissionId]
    );

    res.json({ message: "Grade saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------
// 6. Get one submission by ID
// GET /api/submissions/getOne/:id
// -------------------------
router.get("/getOne/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      "SELECT * FROM submissions WHERE id = ?",
      [id]
    );

    res.json(rows[0] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
