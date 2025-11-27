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
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Projects</h2>
      {projects.length ? (
        <ul className="space-y-3">
          {projects.map((p) => (
            <li key={p.id} className="bg-gray-700 p-4 rounded-md shadow">
              <h3 className="font-semibold text-gray-200">{p.title}</h3>
              <p className="text-gray-300">{p.description}</p>
              <p className="text-sm text-gray-300 mt-1">Full Points: {p.max_points} | Deadline: {p.due_date}</p>

              {role === "student" && (
                <div className="mt-3">
                  <button className="text-blue-500 font-medium hover:underline"
                  onClick={() => window.location.href = `/student/projects/${p.id}`}>
                    Submit Project
                  </button>
                  
                </div>
              )}

              {role === "professor" && (
                <button
                  onClick={() => window.location.href = `/professor/projects/${p.id}/submissions`}
                  className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View Submissions
                </button>
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
