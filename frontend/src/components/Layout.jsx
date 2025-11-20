import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="grid bg-gray-900 min-h-screen">
      <Navbar />
      <div className="md:flex flex-1 min-h-[calc(100vh-<navbar-height>)]"> 
        <Sidebar />
        <main className="flex flex-col w-auto flex-1 p-8 bg-slate-800 m-4 rounded-lg overflow-y-auto h-[calc(100vh-9rem)]">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

