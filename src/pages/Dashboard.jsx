import React, { useEffect, useState } from "react";
import API, { setAuth } from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import StatusCard from "../components/StatusCard";
import MembersCard from "../components/MembersCard";
import Alerts from "../components/Alerts";
import FileAttachment from "../components/FileAttachment";
import AIAnalyzer from "../components/AIAnalyzer";

export default function Dashboard() {
  const [tasks, setTasks] = useState({ owned: [], shared: [] });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    console.log("🔍 Dashboard - Token:", token);
    console.log("🔍 Dashboard - User:", userData);

    if (token) {
      setAuth(token);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error("User data parse error:", e);
        }
      }
      fetchTasks();
    }
  }, []);

  async function fetchTasks() {
    try {
      console.log("🔄 Fetching tasks...");
      const res = await API.get("/tasks");
      console.log("✅ Tasks fetched:", res.data);
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Fetch Tasks Error:", err);
    }
  }

  return (
    <div className="bg-sky-100 min-h-screen p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-gray-800">
        Project Dashboard
      </h1>

      {user && (
        <p className="text-center text-gray-700 mb-6 text-lg">
          👋 Welcome, <span className="font-semibold text-indigo-600">{user.name}</span>!
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <AIAnalyzer />
          <TaskForm refresh={fetchTasks} />
          <MembersCard />
        </div>

        <div className="space-y-6">
          <StatusCard />
          <TaskList title="Your Tasks" tasks={tasks.owned} refresh={fetchTasks} />
        </div>

        <div className="space-y-6">
          <Alerts />
          <FileAttachment />
        </div>
      </div>
    </div>
  );
}