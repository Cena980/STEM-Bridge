import React from "react";

export default function CreateProjectModal({ show, newProject, setNewProject, onClose, onSubmit }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Project</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Course ID"
            value={newProject.courseID}
            onChange={(e) => setNewProject({ ...newProject, code: e.target.value })}
            className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <input
            type="Date"
            placeholder="Due Date"
            value={newProject.dueDate}
            onChange={(e) => setNewProject({ ...newProject, creditHours: e.target.value })}
            className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-3">
            <input
              type="date"
              value={newProject.createDate}
              onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
              className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={newProject.maxPoints}
              onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
              className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
