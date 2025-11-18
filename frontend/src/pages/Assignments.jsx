import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import AssignmentList from "../components/AssignmentList1";
import CreateAssignmentModal from "../components/CreateAssignmentModal";
import { getCurrentUser } from "../lib/auth";
import { Plus } from "lucide-react";

export default function Assignment() {
  const [assignment, setAssignment] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const user = getCurrentUser();
  const role = user?.role || "student";
  const p_Id = user?.id || "";
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    courseID: "",
    dueDate: "",
    maxPoints: "",
    createDate: "",
  });

  const fetchAssignments = async () => {
  try {
    let url = "";

    if (role === "professor") {
      url = `http://localhost:5000/api/auth/assignment/fetch/professor/${p_Id}`;
    } else if (role === "student") {
      url = `http://localhost:5000/api/auth/assignment/fetch/student/${p_Id}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setAssignment(data);
  } catch (err) {
    console.error("Error fetching assignments:", err);
  }
};

  useEffect(() => {
  fetchAssignments();
}, [role, p_Id]);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/create-assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAssignment),
      });
      if (res.ok) {
        setShowCreateModal(false);
        setNewAssignment({ title: "", description: "", courseID: "", dueDate: "", maxPoints: "", createDate: "" });
        fetchAssignments();
      }
    } catch (err) {
      console.error("Error creating Assignment:", err);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 rounded-lg lg:p-4 p-3">
        <h2 className="lg:text-3xl text-l font-bold text-gray-200">My Assignments</h2>
        {role === "professor" && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center lg:gap-2 gap-1 bg-blue-600 text-white lg:px-6 px-3 py-3 rounded-md lg:font-semibold font-medium hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" /> Create Assignment
          </button>
        )}
      </div>

      <AssignmentList assignments={assignment} />

      <CreateAssignmentModal
        show={showCreateModal}
        newAssignment={newAssignment}
        setNewAssignment={setNewAssignment}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateAssignment}
      />
    </Layout>
  );
}
