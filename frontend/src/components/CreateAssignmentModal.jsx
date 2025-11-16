import React from "react";

export default function CreateAssignmentModal({ show, newAssignment, setNewAssignment, onClose, onSubmit }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Assignment</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Assignment Title"
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Course ID"
            value={newAssignment.courseID}
            onChange={(e) => setNewAssignment({ ...newAssignment, code: e.target.value })}
            className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <input
            type="Date"
            placeholder="Due Date"
            value={newAssignment.dueDate}
            onChange={(e) => setNewAssignment({ ...newAssignment, creditHours: e.target.value })}
            className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-3">
            <input
              type="date"
              value={newAssignment.createDate}
              onChange={(e) => setNewAssignment({ ...newAssignment, startDate: e.target.value })}
              className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={newAssignment.maxPoints}
              onChange={(e) => setNewAssignment({ ...newAssignment, endDate: e.target.value })}
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
