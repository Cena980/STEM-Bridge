import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="grid bg-blue-950 min-h-screen">
      <Navbar />
      <div className="md:flex flex-1 min-h-[calc(100vh-<navbar-height>)]"> 
        <Sidebar />
        <main className="flex flex-col sm:max-w-[calc(screen-2rem)] md:w-auto flex-1 py-4 px-3 md:p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

