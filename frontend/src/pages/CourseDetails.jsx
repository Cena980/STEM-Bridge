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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/courses/${id}`);
        const data = await res.json();
        setCourse(data);
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
          <h1 className="text-4xl font-bold text-blue-700">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Code: {course.course_code} | {course.credits} Credits
          </p>
        </div>

        {role === "professor" && (
          <ManageTools courseId={id} />
        )}

        <div className="grid gap-10">
          <AssignmentList courseId={id} role={role} />
          <ProjectList courseId={id} role={role} />
          <QuizList courseId={id} role={role} />
          <GradeTable courseId={id} role={role} />
        </div>
      </div>
    </Layout>
  );
}
