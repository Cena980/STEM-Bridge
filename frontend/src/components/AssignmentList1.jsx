import React from "react";
import { BookOpen } from "lucide-react";
import AssignmentCard from "./AssignmentCard";

export default function AssignmentList({ assignments }) {
  if (!assignments.length) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No assignments found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
}