import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout  from "../../components/Layout";
import SubmitWork from "../../components/submissions/SubmitWork";

export default function QuizDetails() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quizzes/${id}`).then((res) => {
      setQuiz(res.data);
    });
  }, []);

  if (!quiz) return <p className="text-white">Loading...</p>;

  return (
    <Layout>
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <p className="mb-4 text-gray-300">{quiz.description}</p>

      <p className="text-gray-400 text-sm">
        Due Date: {new Date(quiz.due_date).toLocaleString()}
      </p>

      <div className="mt-8">
        <SubmitWork
          itemType="quiz"
          itemId={quiz.id}
          studentId={currentUser.id}
          course_id={quiz.course_id}
        />
      </div>
    </div>
    </Layout>
  );
}
