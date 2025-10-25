import { useEffect, useState } from "react";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
      <ul>
        {courses.map(c => (
          <li key={c.id} className="border p-3 mb-2 rounded-lg">
            <h2 className="font-semibold">{c.title}</h2>
            <p>{c.instructor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
