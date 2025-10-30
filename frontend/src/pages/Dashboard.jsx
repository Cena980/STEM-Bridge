import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CourseList from "../components/CourseList";
import CreateCourseModal from "../components/CreateCourseModal";
import { getCurrentUser } from "../lib/auth";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const user = getCurrentUser();
  const role = user?.role || "student";
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

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Courses</h2>
        {role === "professor" && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" /> Create Course
          </button>
        )}
      </div>

      <CourseList courses={courses} />

      <CreateCourseModal
        show={showCreateModal}
        newCourse={newCourse}
        setNewCourse={setNewCourse}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCourse}
      />
    </Layout>
  );
}
