import express from "express";
import {
    getCourseWithCount,
    getTotalStudents,
    getTotalProfessors,
    dailySubmissions,
    weeklySubmissions,
    monthlySubmissions,
    getTotalCourses
} from "./reportController.js";

const router = express.Router();

router.get("/courses-with-count", getCourseWithCount);
router.get("/stats/total-students", getTotalStudents);
router.get("/stats/total-professors", getTotalProfessors);
router.get("/stats/total-courses", getTotalCourses);
router.get("/submissions/daily", dailySubmissions);
router.get("/submissions/weekly", weeklySubmissions);
router.get("/submissions/monthly", monthlySubmissions);

export default router;
