import React, { useState } from "react";
import { BookOpen, Plus, Home, User, Folder, FileText, Users, Settings, Bell, LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeNav, setActiveNav] = useState("My Courses");

  const navItems = [
    { name: "Profile", icon: User },
    { name: "My Courses", icon: BookOpen },
    { name: "My Projects", icon: Folder },
    { name: "Assignments", icon: FileText },
    { name: "Community", icon: Users },
  ];

  const topNavItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Home", icon: Home },
    { name: "Notifications", icon: Bell },
    { name: "Settings", icon: Settings },
  ];

  return (
    
    <div className="grid bg-blue-100">
      {/* Top Navigation Bar */}
      <div className="bg-blue-50">
        <div className="flex justify-between items-center px-8 py-4">
          {/* Title on the left */}
          <div className="justify-start">
            <h1 className="text-xl font-bold text-gray-800">STEM Bridge</h1>
          </div>
          
          {/* Navigation items on the right */}
          <div className="flex items-center space-x-6">
            {topNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  title={item.name}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
            
            {/* User Profile/Account */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen">
        <div className="w-64 bg-blue-300 rounded-tr-3xl">
        {/*left nav */}
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.name} className="mb-1">
                  <button
                    onClick={() => setActiveNav(item.name)}
                    className={`flex items-center w-full px-6 py-3 text-left transition-colors ${
                      activeNav === item.name 
                        ? "text-white font-extrabold bg-transparent border-0 border-b-2" 
                        : "text-white font-bold bg-transparent border-0"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">My Courses</h2>
              {activeNav === "My Courses" && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  <Plus className="w-5 h-5" /> Create Course
                </button>
              )}
            </div>

            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Course info not found.</p>
            </div>

            {/* Create course modal */}
            {showCreateModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-md w-full p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Course</h2>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Course Title"
                      className="w-full  py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Course Code"
                      className="w-full  py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Description"
                      className="w-full  py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                    <input
                      type="number"
                      min="1"
                      max="6"
                      placeholder="Credit Hours"
                      className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-3">
                      <input
                        type="date"
                        placeholder="Start Date"
                        className="w-full  py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="date"
                        placeholder="End Date"
                        className="w-full  py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 py-2 border rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}