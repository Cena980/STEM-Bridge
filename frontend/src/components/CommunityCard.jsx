import React from "react";
import { Mail as mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CommunityCard({ Community }) {
    const firstLetter = Community.full_name.charAt(0).toUpperCase();

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

    const navigate = useNavigate();
    const bgColor = colorMap[firstLetter] || "bg-gray-500";
    const actions = [
      { name: "Mail", icon: mail },
    ];
    const handleButtonClick = (name) => {
        navigate(`/${name}`);
    };

    return (
      <div
        className={`flex p-4 min-w-[104px] justify-around no-underline text-white rounded-lg shadow transform transition-transform duration-300 hover:scale-[1.02]  ${bgColor}`}
      >
        <div className="w-8 m-2 mr-4 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          {Community.avatar_url ? (
            <img
              src={`http://localhost:5000${Community.avatar_url}`}
              alt="Avatar"
              className="rounded-full object-cover w-full h-full"
            />
          ) : (
            <User className="w-6 h-6 text-gray-200" />
          )}
          
        </div>
        <div>
          <p className="text-gray-300 font-bold font-sans">Name: <span className="text-gray-200 font-semibold">{Community.full_name} </span></p>
          <p className="text-gray-300 font-bold font-sans mb-1">Email: <span className="text-gray-200 font-semibold">{Community.email}</span></p>
        </div>
        {actions.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => handleButtonClick(item.name)}
              className="flex ml-4 items-center bg-transparent text-gray-200 hover:text-blue-600 transition-colors"
              title={`${item.name} ${Community.full_name}`}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          );
        })}
        
      </div>
    );
  };
