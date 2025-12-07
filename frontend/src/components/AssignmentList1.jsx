import React from "react";
import { NotebookText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../lib/auth";

export default function AssignmentList({ assignments }) {

  const Navigate = useNavigate();
  const user = getCurrentUser();
  const role = user.role;
  const getBG =(Project)=>{
    const firstLetter = Project.title.charAt(0).toUpperCase();
  
      const colorMap = {
        A: "bg-red-500/30",
        B: "bg-orange-500/30",
        C: "bg-amber-500/30",
        D: "bg-yellow-500/30",
        E: "bg-lime-500/30",
        F: "bg-green-500/30",
        G: "bg-emerald-500/30",
        H: "bg-teal-500/30",
        I: "bg-cyan-500/30",
        J: "bg-sky-500/30",
        K: "bg-blue-500/30",
        L: "bg-indigo-500/30",
        M: "bg-violet-500/30",
        N: "bg-purple-500/30",
        O: "bg-fuchsia-500/30",
        P: "bg-pink-500/30",
        Q: "bg-rose-500/30",
        R: "bg-red-600/30",
        S: "bg-orange-600/30",
        T: "bg-amber-600/30",
        U: "bg-yellow-600/30",
        V: "bg-lime-600/30",
        W: "bg-green-600/30",
        X: "bg-emerald-600/30",
        Y: "bg-teal-600/30",
        Z: "bg-cyan-600/30",
      };
  
  
      const bgColor = colorMap[firstLetter] || "bg-gray-500"; // default
      return bgColor;
  }
  const handleRowClick = (assignment) => {
    if (role === "professor") {
      Navigate(`/professor/assignments/${assignment.id}/submissions`);
    } else {
      Navigate(`/student/assignments/${assignment.id}`);
    }
  };
  if (!assignments.length) {
    return (
      <div className="text-center py-12">
        <NotebookText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No assignments found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-sky-800 p-2 rounded-lg border-[0.5pt] border-sky-600">
      <table className="min-w-full text-xs md:text-sm text-left">
        <thead>
          <tr className="border-b border-cyan-700 text-sky-200">
            <th className="py-2 pr-3">Title</th>
            <th className="py-2 pr-3">Description</th>
            <th className="py-2 pr-3">Due Date</th>
            <th className="py-2 pr-3">Max Points</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((p) => (
            <tr
              key={p._id}
              className="border-b border-sky-500 hover:bg-sky-700/60"
              onClick={()=>handleRowClick(p)}
            >
              <td className="py-2 pr-3 text-white">
                {p.title || "-"}
              </td>
              <td className="py-2 pr-3 text-white">
                {p.description || "-"}
              </td>
              <td className="py-2 pr-3 text-white">
                {p.due_date || "-"}
              </td>
              <td className="py-2 pr-3 text-white">
                {p.max_points || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}