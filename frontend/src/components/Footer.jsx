import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="max-w-screen m-4 bg-slate-800 rounded-lg text-gray-300 py-4 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-gray-300 mb-3">STEM Bridge</h2>
          <p className="text-sm text-gray-400">
            Empowering learners and educators through interactive STEM courses, projects, and collaboration tools.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm list-none">
            <li><a href="/Dashboard" className="hover:text-white transition no-underline text-gray-400">Dashboard</a></li>
            <li><a href="/courses" className="hover:text-white transition no-underline text-gray-400">Courses</a></li>
            <li><a href="/about" className="hover:text-white transition no-underline text-gray-400">About</a></li>
            <li><a href="/contact" className="hover:text-white transition no-underline text-gray-400">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><Facebook size={20} color="gray" /></a>
            <a href="#" className="hover:text-white"><Twitter size={20} color="gray" /></a>
            <a href="#" className="hover:text-white"><Instagram size={20} color="gray" /></a>
            <a href="#" className="hover:text-white"><Linkedin size={20} color="gray" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} STEM Bridge. All rights reserved.
      </div>
    </footer>
  );
}
