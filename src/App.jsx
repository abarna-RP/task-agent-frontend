import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function App() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    nav("/"); // redirect to Welcome page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="p-4 bg-white shadow">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side: Brand name */}
          <Link
            to="/"
            className="font-extrabold text-2xl text-indigo-600 tracking-wide"
          >
            TaskAgent
          </Link>

          {/* Right side: Links */}
          <div className="space-x-4 flex items-center">
            {/* Home Button */}
            <Link
              to="/"
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              🏠 Home
            </Link>

            {token ? (
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
