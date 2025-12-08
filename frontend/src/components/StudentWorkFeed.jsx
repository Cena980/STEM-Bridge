import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function StudentWorkFeed({ studentId }) {
  const [items, setItems] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(`http://localhost:5000/api/student/work/${studentId}`);
      setItems(res.data);
    };
    loadData();
  }, [studentId]);

  const typeColors = {
    assignment: "bg-blue-500/20 border-blue-400",
    project: "bg-green-500/20 border-green-400",
    quiz: "bg-purple-500/20 border-purple-400",
  };
  const handleOnclick = (item) => {
    Navigate(`/student/${item.type}s/${item.id}`)
  }

  return (
    <div className="p-4 bg-sky-800 border-[0.5pt] border-sky-500 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-white mb-3">
        Tasks
      </h2>

      <div className=" space-y-3 pr-2">
        {items.length === 0 && (
          <p className="text-gray-300 text-sm text-center py-4">
            No upcoming work 🎉
          </p>
        )}

        {items.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className={`p-4 rounded-lg border ${typeColors[item.type]} hover:bg-white/10 transition`}
            onClick={()=>handleOnclick(item)}
          >
            <div className="flex justify-between">
              <h3 className="text-white font-semibold">{item.title}</h3>
              <span className="text-xs uppercase text-gray-300">
                {item.type}
              </span>
            </div>

            <p className="text-gray-300 text-sm mt-1">
              {item.description || "No description"}
            </p>

            <p className="text-gray-400 text-xs mt-2">
              Due: {new Date(item.due_date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
