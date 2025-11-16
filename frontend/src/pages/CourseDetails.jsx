import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import AssignmentList from "../components/AssignmentList";
import ProjectList from "../components/ProjectList";
import QuizList from "../components/QuizList";
import GradeTable from "../components/GradeTable";
import ManageTools from "../components/ManageTools";
import { getCurrentUser } from "../lib/auth";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();
  const role = user?.role || "student";
  const [activeTab, setActiveTab] = useState("assignments");

  const tabs = [
    { id: "assignments", label: "Assignments" },
    { id: "projects", label: "Projects" },
    { id: "quizzes", label: "Quizzes" },
    { id: "grades", label: "Grades" },
  ];

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/courses/${id}`);
        const data = await res.json();
        setCourse(data[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course:", err);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <Layout><p className="p-8 text-gray-600">Loading course...</p></Layout>;
  if (!course) return <Layout><p className="p-8 text-gray-600">Course not found.</p></Layout>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 border-b pb-4">
          <h1 className="text-4xl font-bold text-gray-200">{course.title}</h1>
          <p className="text-gray-200 mt-2">{course.description}</p>
          <p className="text-sm text-gray-200 mt-1">
            Code: {course.course_code} | {course.credits} Credits
          </p>
        </div>

        {role === "professor" && (
          <ManageTools courseId={id} />
        )}
        {/* Tabs Navigation */}
        <div className="flex space-x-4 border-b border-gray-700 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 text-m font-bold rounded-t-lg transition-colors duration-200
                ${
                  activeTab === tab.id
                    ? "bg-gray-800 text-white border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300">
          {activeTab === "assignments" && <AssignmentList courseId={id} role={role} />}
          {activeTab === "projects" && <ProjectList courseId={id} role={role} />}
          {activeTab === "quizzes" && <QuizList courseId={id} role={role} />}
          {activeTab === "grades" && <GradeTable courseId={id} role={role} />}
        </div>
      </div>
    </Layout>
  );
}
