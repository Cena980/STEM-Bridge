
import { LayoutDashboard, Bell, Settings } from "lucide-react";
import { getCurrentUser, signOut } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";




export default function Navbar() {

      const user = getCurrentUser();
      const role = user?.role || "student";
      const navigate = useNavigate();
      const { signOut } = useAuth();

  const topNavItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Notifications", icon: Bell },
    { name: "Settings", icon: Settings },
  ];
    const handleButtonClick = (name) => {
    navigate(`/${name}`);
  };
    const handleSignOut = () => {
    signOut();          // clears user + token
    navigate("/"); // redirect to login page
  };

  return (
      <div className="bg-white max-h-20 m-4 rounded-lg">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="justify-start">
            <h1 className="text-xl font-bold text-gray-800">STEM Bridge</h1>
          </div>
          <div className="md:flex inline-flex items-center space-x-6">
            {topNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleButtonClick(item.name)}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  title={item.name}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
            <button
              onClick={handleSignOut}
              className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
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
  );
}