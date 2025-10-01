import React from "react";

export default function Alerts() {
  const alerts = [
    { type: "error", text: "Something wrong", color: "bg-red-100 text-red-700" },
    { type: "success", text: "Success!", color: "bg-green-100 text-green-700" },
    { type: "warning", text: "Warning", color: "bg-yellow-100 text-yellow-700" },
    { type: "info", text: "Info", color: "bg-blue-100 text-blue-700" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-2">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      {alerts.map((a, i) => (
        <div key={i} className={`p-2 rounded ${a.color}`}>
          {a.text}
        </div>
      ))}
    </div>
  );
}
