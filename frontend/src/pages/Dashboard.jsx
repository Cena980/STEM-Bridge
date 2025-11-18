import Layout from "../components/Layout";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate("/explore");
  }
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 rounded-lg p-4">
        <h2 className="lg:text-3xl text-xl font-bold text-gray-200">My Dashboard</h2>
        <button
          onClick={handleExploreClick}
          className="flex items-center lg:gap-2 gap-1 bg-blue-600 text-white lg:px-6 px-3 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          <Search className="w-6 h-6" /> Explore Courses
        </button>
      </div>
    </Layout>
  );
}
