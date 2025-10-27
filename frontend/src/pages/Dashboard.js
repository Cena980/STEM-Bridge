import React, { useState, useEffect } from "react";
import { BookOpen, Plus, Home, User, Folder, FileText, Users, Settings, Bell, LayoutDashboard } from "lucide-react";
import { getCurrentUser } from "../lib/auth";

export default function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeNav, setActiveNav] = useState("My Courses");
  const [courses, setCourses] = useState([]);


  // user and role
  const user = getCurrentUser();
  const role = user?.role || "student"; // "professor" or "student"
  const [newCourse, setNewCourse] = useState({
    title: "",
    code: "",
    description: "",
    creditHours: "",
    professor_id: user?.id || "",
    startDate: "",
    endDate: ""
  });

const fetchCourses = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/courses");
    const data = await res.json();
    setCourses(data);
  } catch (err) {
    console.error("Error fetching courses:", err);
  }
};


  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/create-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      if (res.ok) {
        setShowCreateModal(false);
        setNewCourse({ title: "", code: "", description: "", creditHours: "", startDate: "", endDate: "" });
        fetchCourses();
      }
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

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
          <div className="justify-start">
            <h1 className="text-xl font-bold text-gray-800">STEM Bridge</h1>
          </div>
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
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {role === "professor" ? "P" : "S"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-screen">
        <div className="w-64 bg-blue-300 rounded-tr-3xl">
          <nav className="mt-6">
            <ul>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <ui key={item.name} className="mb-1">
                    <button
                      onClick={() => setActiveNav(item.name)}
                      className={`flex items-center w-full px-6 py-3 text-left transition-colors ${
                        activeNav === item.name
                          ? "text-white font-extrabold border-0 border-l-2 border-white bg-transparent"
                          : "text-white font-bold border-0 bg-transparent hover:scale-110"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      {item.name}
                    </button>
                  </ui>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">My Courses</h2>
                {role === "professor" && activeNav === "My Courses" && (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                  >
                    <Plus className="w-5 h-5" /> Create Course
                  </button>
                )}
              </div>

              {/* Course List */}
              {courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                      <h3 className="text-xl font-semibold text-blue-700">{course.title}</h3>
                      <p className="text-gray-600 mt-1">{course.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Code: {course.course_code} | {course.credits} Credits
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No courses found.</p>
                </div>
              )}

              {/* Create Course Modal */}
              {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg max-w-md w-full p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Course</h2>
                    <form onSubmit={handleCreateCourse} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Course Title"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Course Code"
                        value={newCourse.code}
                        onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                        className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                      <input
                        type="number"
                        min="1"
                        max="6"
                        placeholder="Credit Hours"
                        value={newCourse.creditHours}
                        onChange={(e) => setNewCourse({ ...newCourse, creditHours: e.target.value })}
                        className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-3">
                        <input
                          type="date"
                          value={newCourse.startDate}
                          onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
                          className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="date"
                          value={newCourse.endDate}
                          onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })}
                          className="w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
