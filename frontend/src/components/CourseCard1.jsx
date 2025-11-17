import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../lib/auth";

export default function CourseCard({ course }) {
    const firstLetter = course.title.charAt(0).toUpperCase();

    const colorMap = {
      A: "bg-red-500/30",
      B: "bg-orange-500/30",
      C: "bg-amber-500/30",
      D: "bg-yellow-500/30",
      E: "bg-lime-500/30",
      F: "bg-green-500/30",
      G: "bg-emerald-500/30",
      H: "bg-teal-500/30",
      I: "bg-cyan-500/30",
      J: "bg-sky-500/30",
      K: "bg-blue-500/30",
      L: "bg-indigo-500/30",
      M: "bg-violet-500/30",
      N: "bg-purple-500/30",
      O: "bg-fuchsia-500/30",
      P: "bg-pink-500/30",
      Q: "bg-rose-500/30",
      R: "bg-red-600/30",
      S: "bg-orange-600/30",
      T: "bg-amber-600/30",
      U: "bg-yellow-600/30",
      V: "bg-lime-600/30",
      W: "bg-green-600/30",
      X: "bg-emerald-600/30",
      Y: "bg-teal-600/30",
      Z: "bg-cyan-600/30",
    };


    const bgColor = colorMap[firstLetter] || "bg-gray-500"; // default
    const user = getCurrentUser();
    const role = user?.role || "student";
    const userId = user.id;
    const courseId = course.id;
    const handleEnroll = async (e) => {
  e.preventDefault();

  if (role !== "student") {
    alert("Only students can enroll in courses.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, courseId }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Enrollment failed");

    alert(`Enrolled in ${course.title}!`);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


    return (
      <Link
        to={`/courses/${course.id}`}
        className={`block p-4 no-underline text-white rounded-lg shadow transform transition-transform duration-300 hover:scale-[1.02]  ${bgColor}`}
      >
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <p className="text-white-500 mb-1">{course.description}</p>
        <p className="text-sm text-white-500 mt-0">
          Code: {course.course_code} | {course.credits} Credits
        </p>
      </Link>
    );
  };
