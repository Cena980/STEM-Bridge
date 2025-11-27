import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Assignments</h2>
      {assignments.length ? (
        <ul className="space-y-3">
          {assignments.map((a) => (
            <li key={a.id} className="bg-gray-700 p-4 rounded-md shadow">
              <h3 className="font-semibold text-gray-200">{a.title}</h3>
              <p className="text-gray-300">{a.description}</p>
              <p className="text-sm text-gray-300 mt-1">Due: {a.due_date}</p>
              <p className="text-sm text-gray-300 mt-1">Points: {a.max_points}</p>
              {role === "student" && (
                <button className="mt-2 text-blue-400 font-medium hover:underline" 
                onClick={() => window.location.href = `/student/assignments/${a.id}`}>
                  Submit</button>
              )}
              {role === "professor" && (
                <Link
                  to={`/professor/assignments/${a.id}/submissions`}
                  className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View Submissions
                </Link>
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
