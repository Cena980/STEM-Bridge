import React from "react";
import { Mail as mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function MessageCard({ Message }) {
    const firstLetter = Message.full_name.charAt(0).toUpperCase();

    const colorMap = {
      A: "bg-red-500/10",
      B: "bg-orange-500/10",
      C: "bg-amber-500/10",
      D: "bg-yellow-500/10",
      E: "bg-lime-500/10",
      F: "bg-green-500/10",
      G: "bg-emerald-500/10",
      H: "bg-teal-500/10",
      I: "bg-cyan-500/10",
      J: "bg-sky-500/10",
      K: "bg-blue-500/10",
      L: "bg-indigo-500/10",
      M: "bg-violet-500/10",
      N: "bg-purple-500/10",
      O: "bg-fuchsia-500/10",
      P: "bg-pink-500/10",
      Q: "bg-rose-500/10",
      R: "bg-red-600/10",
      S: "bg-orange-600/10",
      T: "bg-amber-600/10",
      U: "bg-yellow-600/10",
      V: "bg-lime-600/10",
      W: "bg-green-600/10",
      X: "bg-emerald-600/10",
      Y: "bg-teal-600/10",
      Z: "bg-cyan-600/10",
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
      <Link
        to={`/messages/${Message.id}`}
        className={`block p-4 no-underline text-white rounded-lg shadow transform transition-transform duration-300 hover:scale-[1.02]  ${bgColor}`}
      >
        <h3 className="text-xl font-semibold">{Message.title}</h3>
        <p className="text-white-500 mb-1">{Message.description}</p>
        <p className="text-sm text-white-500 mt-0">
        Time: {Message.date}
        </p>
      </Link>
    );
  };
