import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
    const firstLetter = course.title.charAt(0).toUpperCase();

    const colorMap = {
      A: "bg-red-500",
      B: "bg-orange-500",
      C: "bg-amber-500",
      D: "bg-yellow-500",
      E: "bg-lime-500",
      F: "bg-green-500",
      G: "bg-emerald-500",
      H: "bg-teal-500",
      I: "bg-cyan-500",
      J: "bg-sky-500",
      K: "bg-blue-500",
      L: "bg-indigo-500",
      M: "bg-violet-500",
      N: "bg-purple-500",
      O: "bg-fuchsia-500",
      P: "bg-pink-500",
      Q: "bg-rose-500",
      R: "bg-red-600",
      S: "bg-orange-600",
      T: "bg-amber-600",
      U: "bg-yellow-600",
      V: "bg-lime-600",
      W: "bg-green-600",
      X: "bg-emerald-600",
      Y: "bg-teal-600",
      Z: "bg-cyan-600",
    };


    const bgColor = colorMap[firstLetter] || "bg-gray-500"; // default

    return (
      <Link
        to={`/courses/${course.id}`}
        className={`block ${bgColor} p-4 no-underline text-white rounded-lg shadow hover:scale-105 transition-transform`}
      >
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <p className="text-white-500 mb-1">{course.description}</p>
        <p className="text-sm text-white-500 mt-0">
          Code: {course.course_code} | {course.credits} Credits
        </p>
      </Link>
    );
  };
