import React, { useEffect, useState } from "react";

export default function ProjectList({ courseId, role }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/courses/${courseId}/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects:", err));
  }, [courseId]);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
      {projects.length ? (
        <ul className="space-y-3">
          {projects.map((p) => (
            <li key={p.id} className="bg-white p-4 rounded-md shadow">
              <h3 className="font-semibold text-blue-700">{p.title}</h3>
              <p className="text-gray-600">{p.description}</p>
              <p className="text-sm text-gray-500 mt-1">Deadline: {p.deadline}</p>

              {role === "student" && (
                <div className="mt-3">
                  <button className="text-blue-600 font-medium hover:underline">
                    Submit Project
                  </button>
                </div>
              )}

              {role === "professor" && (
                <div className="mt-3 flex gap-3">
                  <button className="text-green-600 font-medium hover:underline">Edit</button>
                  <button className="text-red-600 font-medium hover:underline">Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No projects yet.</p>
      )}
    </section>
  );
}
