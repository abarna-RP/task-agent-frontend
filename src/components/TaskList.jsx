import React, { useState } from "react";
import API from "../api/api";

export default function TaskList({ title, tasks = [], refresh }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });

  // 👉 Start editing
  function startEdit(task) {
    setEditing(task._id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      completed: task.completed,
    });
  }

  // 👉 Cancel editing
  function cancelEdit() {
    setEditing(null);
    setForm({ title: "", description: "" });
  }

  // 👉 Save (Update)
  async function saveTask(id) {
    try {
      const res = await API.put(`/tasks/${id}`, form);
      console.log("✅ Update Response:", res.data);
      setEditing(null);
      if (refresh) refresh();
    } catch (err) {
      console.error("❌ Update Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Update failed");
    }
  }

  // 👉 Delete
  async function deleteTask(id) {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await API.delete(`/tasks/${id}`);
      console.log("✅ Delete Response:", res.data);
      if (refresh) refresh();
    } catch (err) {
      console.error("❌ Delete Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Delete failed");
    }
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="space-y-3">
        {tasks.map((t) => (
          <li
            key={t._id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            {editing === t._id ? (
              <div className="flex-1 space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Task Title"
                />
                <textarea
                  className="w-full border p-2 rounded"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Task Description"
                />
                <div className="space-x-2">
                  <button
                    onClick={() => saveTask(t._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <div className="font-semibold">{t.title}</div>
                  <div className="text-sm text-gray-500">{t.description}</div>
                  <div className="text-xs text-gray-400">
                    Status: {t.status} | Completed: {t.completed ? "✅" : "❌"}
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(t)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(t._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
