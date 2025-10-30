import React, { useEffect, useState } from "react";

export default function GradeTable({ courseId, role }) {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/courses/${courseId}/grades`)
      .then(res => res.json())
      .then(data => setGrades(data))
      .catch(err => console.error("Error fetching grades:", err));
  }, [courseId]);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Grades</h2>

      {grades.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                {role === "professor" && <th className="py-3 px-4 text-left">Student</th>}
                <th className="py-3 px-4 text-left">Assignment</th>
                <th className="py-3 px-4 text-left">Project</th>
                <th className="py-3 px-4 text-left">Quiz</th>
                <th className="py-3 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} className="border-t">
                  {role === "professor" && (
                    <td className="py-2 px-4 text-gray-800">{g.studentName}</td>
                  )}
                  <td className="py-2 px-4 text-gray-600">{g.assignmentGrade ?? "-"}</td>
                  <td className="py-2 px-4 text-gray-600">{g.projectGrade ?? "-"}</td>
                  <td className="py-2 px-4 text-gray-600">{g.quizGrade ?? "-"}</td>
                  <td className="py-2 px-4 font-semibold text-blue-700">{g.total ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No grades available yet.</p>
      )}
    </section>
  );
}
