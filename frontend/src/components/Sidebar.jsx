import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BookOpen, User, Folder, FileText, Users, LayoutDashboard, MessageCircleDashed } from "lucide-react";
import { getCurrentUser } from "../lib/auth";

export default function Sidebar() {
    const user = getCurrentUser();
    const role = user?.role || "student";
    const [activeNav, setActiveNav] = useState("My Courses");
    const location = useLocation();
    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard},
        { name: "Profile", icon: User },
        { name: "Courses", icon: BookOpen },
        { name: "Projects", icon: Folder },
        { name: "Assignments", icon: FileText },
        { name: "Messages", icon: MessageCircleDashed },
        { name: "Community", icon: Users },
    ];

    useEffect(() => {
        const currentPath = location.pathname.split("/")[1];
        const match = navItems.find(
            (item) => item.name.toLowerCase() === currentPath
        );

        if (match) {
            setActiveNav(match.name);
        }
    }, [location.pathname]);
    return (
        <div className="md:w-64 bg-slate-800 m-4 p-4 rounded-lg max-h-78">
          <nav className="">
            <ul className="p-0 grid grid-cols-1 md:grid-cols-1 gap-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <ul key={item.name} className="mx-6 md:mx-auto border-b-2 border-gray-400 hover:scale-105 transition-transform w-auto md:w-48">
                    <Link to={`/${item.name.toLowerCase()}`}
                      onClick={() => setActiveNav(item.name)}
                      className={`flex no-underline items-center p-1 md:px-6 md:py-3 text-left transition-colors ${
                        activeNav === item.name
                          ? "text-white text-l font-extrabold pl-6 scale-[1.02] bg-gray-700"
                          : "text-gray-200 font-bold hover:scale-105 transition-all duration-300 hover:bg-gray-700"
                      }`}
                    >
                      <IconComponent className=" w-5 h-5 mr-3" />
                      <span className="md:inline">{item.name}</span>
                    </Link>
                  </ul>
                );
              })}
            </ul>
          </nav>
        </div>
    );
}