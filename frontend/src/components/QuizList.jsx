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
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Quizzes</h2>
      {quizzes.length ? (
        <ul className="space-y-3">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="bg-gray-700 p-4 rounded-md shadow">
              <h3 className="font-semibold text-gray-200">{quiz.title}</h3>
              <p className="text-gray-300">{quiz.description}</p>
              <p className="text-sm text-gray-300 mt-1">
                Total Marks: {quiz.max_points} | Duration: {quiz.time_limit} mins
              </p>

              {role === "student" && (
                <div className="mt-3">
                  <button className="text-blue-500 font-medium hover:underline"
                  onClick={() => window.location.href = `/student/quizzes/${quiz.id}`}>
                    Take Quiz
                  </button>
                </div>
              )}

              {role === "professor" && (
                    <button
                      onClick={() => window.location.href = `/professor/quizes/${quiz.id}/submissions`}
                      className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View Submissions
                    </button>
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
