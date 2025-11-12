import React from "react";
import { Plus } from "lucide-react";

export default function ManageTools({ courseId }) {
  return (
    <div className="flex justify-end gap-4 mb-8">
      <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        <Plus className="w-4 h-4" /> New Assignment
      </button>
      <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
        <Plus className="w-4 h-4" /> New Project
      </button>
      <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
        <Plus className="w-4 h-4" /> New Quiz
      </button>
    </div>
  );
}
