import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout  from "../../components/Layout";
import SubmitWork from "../../components/submissions/SubmitWork";

export default function AssignmentDetails() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`http://localhost:5000/api/assignments/${id}`).then((res) => {
      setAssignment(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <Layout>
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{assignment.title}</h1>
      <p className="mb-4 text-gray-300">{assignment.description}</p>

      <p className="text-gray-400 text-sm">
        Due Date: {new Date(assignment.due_date).toLocaleString()}
      </p>

      <div className="mt-8">
        <SubmitWork
          itemType="assignment"
          itemId={assignment.id}
          studentId={currentUser.id}
          courseId={assignment.course_id}
        />
      </div>
    </div>
    </Layout>
  );
}
