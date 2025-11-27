import express from "express";
const router = express.Router();
import { db } from "../db.js";

router.get("/assignments/:id", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM assignments WHERE id = ?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ message: "Assignment not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM projects WHERE id = ?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ message: "Project not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/quizzes/:id", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM quizzes WHERE id = ?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ message: "Quiz not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;