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
        <div className="md:w-64 bg-white m-4 rounded-lg max-h-72">
          <nav className="mt-6">
            <ul className="p-0">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <ul key={item.name} className="mb-1 inline-flex w-min">
                    <Link to={`/${item.name.toLowerCase()}`}
                      onClick={() => setActiveNav(item.name)}
                      className={`flex no-underline items-center w-full px-6 py-3 text-left transition-colors ${
                        activeNav === item.name
                          ? "text-black text-l font-extrabold border-0 border-l-2 border-white bg-transparent"
                          : "text-black font-bold border-0 w-32 rounded-lg bg-gray-100 hover:scale-110 hover:bg-gray-200"
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