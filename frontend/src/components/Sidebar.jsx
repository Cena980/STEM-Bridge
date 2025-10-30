import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BookOpen, Plus, Home, User, Folder, FileText, Users, Settings, Bell, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
    const [activeNav, setActiveNav] = useState("My Courses");
    const navItems = [
        { name: "Profile", icon: User },
        { name: "Courses", icon: BookOpen },
        { name: "Projects", icon: Folder },
        { name: "Assignments", icon: FileText },
        { name: "Community", icon: Users },
    ];
    return (
        <div className="w-64 bg-blue-300 rounded-tr-3xl">
          <nav className="mt-6">
            <ul className="p-0">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <ul key={item.name} className="mb-1">
                    <Link to={`/${item.name.toLowerCase()}`}
                      onClick={() => setActiveNav(item.name)}
                      className={`flex items-center w-full px-6 py-3 text-left transition-colors ${
                        activeNav === item.name
                          ? "text-white text-l font-extrabold border-0 border-l-2 border-white bg-transparent"
                          : "text-white font-bold border-0 bg-transparent hover:scale-110"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  </ul>
                );
              })}
            </ul>
          </nav>
        </div>
    );
}