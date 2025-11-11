import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="grid bg-gray-900 min-h-screen m-[-8px]">
      <Navbar />
      <div className="md:flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 bg-slate-800 m-4 rounded-lg">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
