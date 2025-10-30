import React, { useEffect, useState } from "react";

export default function QuizList({ courseId, role }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/courses/${courseId}/quizzes`)
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error("Error fetching quizzes:", err));
  }, [courseId]);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quizzes</h2>
      {quizzes.length ? (
        <ul className="space-y-3">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="bg-white p-4 rounded-md shadow">
              <h3 className="font-semibold text-blue-700">{quiz.title}</h3>
              <p className="text-gray-600">{quiz.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Total Marks: {quiz.totalMarks} | Duration: {quiz.duration} mins
              </p>

              {role === "student" && (
                <div className="mt-3">
                  <button className="text-blue-600 font-medium hover:underline">
                    Take Quiz
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
        <p className="text-gray-500">No quizzes yet.</p>
      )}
    </section>
  );
}
