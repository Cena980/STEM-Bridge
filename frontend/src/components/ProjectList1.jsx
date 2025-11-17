import React from "react";
import { FolderOpen } from "lucide-react";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects }) {
  if (!projects.length) {
    return (
      <div className="text-center py-12">
        <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No Projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {projects.map((Project) => (
        <ProjectCard key={Project.id} Project={Project} />
      ))}
    </div>
  );
}