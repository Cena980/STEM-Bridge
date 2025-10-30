
import { LayoutDashboard, Home, Bell, Settings } from "lucide-react";
import { getCurrentUser } from "../lib/auth";


export default function Navbar() {

      const user = getCurrentUser();
      const role = user?.role || "student"; // "professor" or "student"

  const topNavItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Home", icon: Home },
    { name: "Notifications", icon: Bell },
    { name: "Settings", icon: Settings },
  ];

  return (
      <div className="bg-blue-50 max-h-20">
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
  );
}