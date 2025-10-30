import React, { useEffect, useState } from "react";

export default function AssignmentList({ courseId, role }) {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/courses/${courseId}/assignments`)
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error("Error fetching assignments:", err));
  }, [courseId]);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Assignments</h2>
      {assignments.length ? (
        <ul className="space-y-3">
          {assignments.map((a) => (
            <li key={a.id} className="bg-white p-4 rounded-md shadow">
              <h3 className="font-semibold text-blue-700">{a.title}</h3>
              <p className="text-gray-600">{a.description}</p>
              <p className="text-sm text-gray-500 mt-1">Due: {a.due_date}</p>
              <p className="text-sm text-gray-500 mt-1">Points: {a.max_points}</p>
              {role === "student" && (
                <button className="mt-2 text-blue-600 font-medium hover:underline">Submit</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No assignments yet.</p>
      )}
    </section>
  );
}
