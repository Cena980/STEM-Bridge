import React, { useState } from "react";
import {Plus} from 'lucide-react';

export default function ManageTools({ courseId }) {
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    max_points:"",
    instructions: "",
    time_limit: "",
    available_from: "",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createItem = async (type) => {
    let url = "";

    if (type === "assignment") url = "/api/auth/assignments/create";
    if (type === "project") url = "/api/auth/projects/create";
    if (type === "quiz") url = "/api/auth/quizzes/create";

    const res = await fetch(`http://localhost:5000${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, ...formData }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="bg-gray-700 p-6 mb-8 rounded-xl">

      <div className="flex gap-4">
        <button className="btn flex bg-green-800 p-2 rounded-lg text-gray-200 hover:scale-105 transition-transform duration-300" onClick={() => setShowAssignmentForm(!showAssignmentForm)}><Plus className="w-5 h-5" />New Assignment</button>
        <button className="btn flex bg-green-800 p-2 rounded-lg text-gray-200 hover:scale-105 transition-transform duration-300" onClick={() => setShowProjectForm(!showProjectForm)}><Plus className="w-5 h-5" />New Project</button>
        <button className="btn flex bg-green-800 p-2 rounded-lg text-gray-200 hover:scale-105 transition-transform duration-300" onClick={() => setShowQuizForm(!showQuizForm)}><Plus className="w-5 h-5" />New Quiz</button>
      </div>

      {/* Assignment Form */}
      {showAssignmentForm && (
        <div className="mt-4 grid bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p className="font-semibold mb-2 text-xl">New Assignment</p>
          <input name="title" className="mb-2 rounded-md p-1 text-black" placeholder="Title" onChange={handleInput} />
          <textarea name="description" className="mb-2 rounded-md p-1 text-black" placeholder="Description" onChange={handleInput} />
          <label className="mb-1">Due Date:</label>
          <input type="date" name="due_date" className="mb-2 rounded-md p-1 text-black" onChange={handleInput} />
          <label className="mb-1">Max Points:</label>
          <input type="number" name="max_points" className="mb-2 rounded-md p-1 text-black" onChange={handleInput} />
          <button className="btn mt-3 p-2 bg-green-700 rounded-lg transition-transform duration-300 hover:scale-105" onClick={() => createItem("assignment")}>Create Assignment</button>
        </div>
      )}

      {/* Project Form */}
      {showProjectForm && (
        <div className="mt-4 grid bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p className="font-semibold mb-2 text-xl">New Project</p>
          <input name="title" className="mb-2 rounded-md p-1 text-black" placeholder="Title" onChange={handleInput} />
          <textarea name="description" className="mb-2 rounded-md p-1 text-black" placeholder="Description" onChange={handleInput} />
          <label className="mb-1">Due Date:</label>
          <input type="date" name="due_date" className="mb-2 rounded-md p-1 text-black" onChange={handleInput} />
          <label className="mb-1">Max Points:</label>
          <input type="number" name="max_points" className="mb-2 rounded-md p-1 text-black" onChange={handleInput} />
          <button className="btn mt-3 p-2 bg-green-700 rounded-lg transition-transform duration-300 hover:scale-105" onClick={() => createItem("project")}>Create Project</button>
        </div>
      )}

      {/* Quiz Form */}
      {showQuizForm && (
        <div className="mt-4 grid bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p className="font-semibold mb-2 text-xl">New Quiz</p>
          <input name="title" className="mb-2 rounded-md p-1 text-black" placeholder="Title" onChange={handleInput} />
          <textarea name="description" className="mb-2 rounded-md p-1 text-black" placeholder="Description" onChange={handleInput} />
          <label className="mb-1">Available From:</label>
          <input type="datetime-local" name="available_from" className="mb-2 rounded-md p-1 text-black" onChange={handleInput} />
          <label className="mb-1">Due Date:</label>
          <input type="datetime-local" name="due_date" className="mb-2 rounded-md p-1 text-black" onChange={handleInput} />
          <label className="mb-1">Time Limit:</label>
          <input type="number" name="time_limit" className="mb-2 rounded-md p-1 text-black" onChange={handleInput} />
          <label className="mb-1">Max Points:</label>
          <input type="number" name="max_points" className="mb-2 rounded-md p-1 text-black" onChange={handleInput} />
          <button className="btn mt-3 p-2 bg-green-700 rounded-lg transition-transform duration-300 hover:scale-105" onClick={() => createItem("quiz")}>Create Quiz</button>
        </div>
      )}
    </div>
  );
}
