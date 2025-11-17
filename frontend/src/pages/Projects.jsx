import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProjectList from "../components/ProjectList1";
import CreateProjectModal from "../components/CreateProjectModal";
import { getCurrentUser } from "../lib/auth";
import { Plus } from "lucide-react";

export default function Project() {
  const [Project, setProject] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const user = getCurrentUser();
  const role = user?.role || "student";
  const p_Id = user?.id || "";
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    courseID: "",
    dueDate: "",
    maxPoints: "",
    createDate: "",
  });

  const fetchProjects = async () => {
  try {
    let url = "";

    if (role === "professor") {
      url = `http://localhost:5000/api/auth/Project/fetch/professor/${p_Id}`;
    } else if (role === "student") {
      url = `http://localhost:5000/api/auth/Project/fetch/student/${p_Id}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setProject(data);
  } catch (err) {
    console.error("Error fetching Projects:", err);
  }
};

  useEffect(() => {
  fetchProjects();
}, [role, p_Id]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/create-Project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        setShowCreateModal(false);
        setNewProject({ title: "", description: "", courseID: "", dueDate: "", maxPoints: "", createDate: "" });
        fetchProjects();
      }
    } catch (err) {
      console.error("Error creating Project:", err);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 rounded-lg p-4">
        <h2 className="text-3xl font-bold text-gray-200">My Projects</h2>
        {role === "professor" && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" /> Create Project
          </button>
        )}
      </div>

      <ProjectList projects={Project} />

      <CreateProjectModal
        show={showCreateModal}
        newProject={newProject}
        setNewProject={setNewProject}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
      />
    </Layout>
  );
}
