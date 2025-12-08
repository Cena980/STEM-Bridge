import Layout from "../components/Layout";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../lib/auth";
import StudentWorkFeed from "../components/StudentWorkFeed";
import Reports from"../components/Reports";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const role = user.role;
  const handleExploreClick = () => {
    navigate("/explore");
  }
  return (
    <Layout>
      <div className="flex justify-between bg-sky-800 border-sky-500 border-[0.5pt] items-center mb-8 rounded-lg p-4">
        <h2 className="lg:text-3xl text-xl font-bold text-gray-200">My Dashboard</h2>
        <button
          onClick={handleExploreClick}
          className="flex items-center lg:gap-2 gap-1 bg-blue-600 text-white lg:px-6 px-3 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          <Search className="w-6 h-6" /> Explore Courses
        </button>
      </div>
      {role == "student" ? (
        <StudentWorkFeed studentId={user.id} />
      ):(
        <Reports />
      )}
    </Layout>
  );
}
