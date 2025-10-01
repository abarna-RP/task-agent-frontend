import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-60 px-4">
      {/* Card Container */}
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center w-full max-w-lg animate-fadeIn">
        {/* Logo / Icon */}
        <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full mx-auto mb-6 text-2xl font-bold shadow-md">
          TM
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-indigo-600">Task Management</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8 text-lg">
          Plan smart, work fast, and manage your tasks like a pro.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold shadow-md hover:bg-emerald-600 transition transform hover:scale-105"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} Task Management App. All rights reserved.
      </p>
    </div>
  );
}
