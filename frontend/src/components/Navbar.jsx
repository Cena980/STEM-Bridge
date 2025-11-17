
import { LayoutDashboard, Bell, Settings, LogOut, User } from "lucide-react";
import { getCurrentUser } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import React, { useState, useEffect } from "react";




export default function Navbar() {
      const navigate = useNavigate();
      const { signOut } = useAuth();
      const [user, setUser] = useState(null);
      const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        role: "",
        bio: "",
        avatar_url: "",
      });
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        full_name: currentUser.full_name,
        email: currentUser.email,
        role: currentUser.role || "Student",
        bio: currentUser.bio || "",
        avatar_url: currentUser.avatar_url || "",
      });
    }
  }, []);
  const role = user?.role || "student";
  const topNavItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Notifications", icon: Bell },
    { name: "Settings", icon: Settings },
    { name: "Sign Out", icon: LogOut },
  ];
    const handleButtonClick = (name) => {
      if (name === "Sign Out") {
        handleSignOut();
        return;
      } else {
        navigate(`/${name}`);
      }
  };
    const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
      <div className="bg-slate-800 max-h-20 m-4 rounded-lg">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="justify-start">
            <h1 className="text-xl font-bold text-white">STEM Bridge</h1>
          </div>
          <div className="md:flex inline-flex items-center space-x-6">
            {topNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleButtonClick(item.name)}
                  className="flex items-center bg-transparent text-gray-400 hover:text-blue-600 transition-colors"
                  title={item.name}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                {formData.avatar_url ? (
                <img
                  src={`http://localhost:5000${formData.avatar_url}`}
                  alt="Avatar"
                  className="rounded-full object-cover"
                />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}