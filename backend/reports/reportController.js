import {db} from "../db.js"
export const getCourseWithCount = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        c.id,
        c.title,
        c.description,
        COUNT(e.student_id) AS total_students
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      GROUP BY c.id
      ORDER BY c.title ASC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching courses with counts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getTotalStudents = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total_students
      FROM profiles
      WHERE role = 'student'
    `);

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching total students:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTotalProfessors = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total_professors
      FROM profiles
      WHERE role = 'professor'
    `);

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching total professors:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTotalCourses = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total_courses
      FROM courses
    `);

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching total professors:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const dailySubmissions = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        DATE(submitted_at) AS day,
        COUNT(*) AS count
      FROM submissions
      WHERE submitted_at >= DATE(NOW()) - INTERVAL 7 DAY
      GROUP BY DATE(submitted_at)
      ORDER BY day ASC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching daily submissions:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const weeklySubmissions = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        YEARWEEK(submitted_at, 1) AS week,
        COUNT(*) AS count
      FROM submissions
      WHERE submitted_at >= DATE(NOW()) - INTERVAL 8 WEEK
      GROUP BY YEARWEEK(submitted_at, 1)
      ORDER BY week ASC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching weekly submissions:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const monthlySubmissions = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        DATE_FORMAT(submitted_at, "%Y-%m") AS month,
        COUNT(*) AS count
      FROM submissions
      WHERE submitted_at >= DATE(NOW()) - INTERVAL 12 MONTH
      GROUP BY DATE_FORMAT(submitted_at, "%Y-%m")
      ORDER BY month ASC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching monthly submissions:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
