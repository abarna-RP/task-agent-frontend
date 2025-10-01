import React from "react";

export default function StatusCard() {
  const statuses = [
    { name: "Marketing Page Redesign", progress: 100, status: "On Track", color: "bg-green-500" },
    { name: "Pitch Deck", progress: 70, status: "At Risk", color: "bg-yellow-500" },
    { name: "New iOS Development", progress: 85, status: "Off Track", color: "bg-red-500" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Project Status</h2>
      <div className="space-y-4">
        {statuses.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <span>{s.name}</span>
              <span className="text-sm">{s.status}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${s.color} h-2 rounded-full`}
                style={{ width: `${s.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
