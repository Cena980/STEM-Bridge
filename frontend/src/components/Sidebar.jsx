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
        <div className="text-[10pt] left-0 w-40 bg-gradient-to-r from-sky-950 to-cyan-900 p-2">
          <nav className="">
            <ul className="p-0 grid grid-cols-1 md:grid-cols-1 gap-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <ul key={item.name} className="border-b-[1pt] border-sky-500 hover:scale-103 transition-transform">
                    <Link to={`/${item.name.toLowerCase()}`}
                      onClick={() => setActiveNav(item.name)}
                      className={`flex p-1 no-underline items-center md:py-3 text-left transition-all ${
                        activeNav === item.name
                          ? "text-white text-[11pt] font-extrabold scale-[1.02] bg-sky-900"
                          : "text-gray-200 font-bold hover:scale-105 transition-all duration-300 hover:bg-sky-700"
                      }`}
                    >
                      <IconComponent className=" w-4 h-4 mr-2" />
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