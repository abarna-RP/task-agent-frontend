import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function MembersCard() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    API.get("/users")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Project Members</h2>
      <ul className="space-y-2">
        {members.map((m) => (
          <li key={m._id} className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-gray-500">{m.email}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
