import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BookOpen, User, Folder, FileText, Users, LayoutDashboard, MessageCircleDashed } from "lucide-react";

export default function Sidebar() {
    const [activeNav, setActiveNav] = useState("My Courses");
    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard},
        { name: "Profile", icon: User },
        { name: "Courses", icon: BookOpen },
        { name: "Projects", icon: Folder },
        { name: "Assignments", icon: FileText },
        { name: "Messages", icon: MessageCircleDashed },
        { name: "Community", icon: Users },
    ];
    return (
        <div className="md:w-64 bg-slate-800 m-4 p-4 rounded-lg max-h-78">
          <nav className="">
            <ul className="p-0 grid grid-cols-5 md:grid-cols-1 gap-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <ul key={item.name} className="mx-auto w-10 md:w-48">
                    <Link to={`/${item.name.toLowerCase()}`}
                      onClick={() => setActiveNav(item.name)}
                      className={`flex no-underline items-center p-1 md:px-6 md:py-3 text-left transition-colors ${
                        activeNav === item.name
                          ? "text-white text-l font-extrabold rounded-lg ml-3 bg-transparent"
                          : "text-gray-200 font-bold rounded-lg hover:scale-105 transition-all duration-300 hover:bg-gray-700"
                      }`}
                    >
                      <IconComponent className=" w-5 h-5 mr-3" />
                      <span className="hidden md:inline">{item.name}</span>
                    </Link>
                  </ul>
                );
              })}
            </ul>
          </nav>
        </div>
    );
}