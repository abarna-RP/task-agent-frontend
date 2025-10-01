import React, { useState } from "react";
import API from "../api/api";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/tasks", { title, description });
      console.log("✅ Task Created:", res.data);

      // Clear form
      setTitle("");
      setDescription("");

      // Refresh task list
      if (refresh) refresh();
    } catch (err) {
      console.error("❌ Task Create Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Task creation failed");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white shadow p-4 rounded mb-6 space-y-3"
    >
      <h3 className="text-lg font-semibold">Create Task</h3>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Add Task
      </button>
    </form>
  );
}
