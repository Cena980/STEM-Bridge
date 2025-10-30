import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition hover:scale-[1.02]"
    >
      <h3 className="text-xl font-semibold text-blue-700">{course.title}</h3>
      <p className="text-gray-600 mt-1">{course.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Code: {course.course_code} | {course.credits} Credits
      </p>
    </Link>
  );
}
