import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import SubmitWork from "../../components/submissions/SubmitWork";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`).then((res) => {
      setProject(res.data);
    });
  }, []);

  if (!project) return <p className="text-white">Loading...</p>;

  return (
    <Layout>
    <div className="p-6 bg-sky-800 rounded-lg border-[0.5pt] text-white">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-4 text-gray-300">{project.description}</p>

      <p className="text-gray-400 text-sm">
        Due Date: {new Date(project.due_date).toLocaleString()}
      </p>

      <div className="mt-8">
        <SubmitWork
          itemType="project"
          itemId={project.id}
          studentId={currentUser.id}
          courseId={project.course_id}
        />
      </div>
    </div>
    </Layout>
  );
}
