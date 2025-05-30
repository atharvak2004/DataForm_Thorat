import React, { useEffect, useState } from "react";

export default function History() {
  const [reports, setReports] = useState([]);
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

useEffect(() => {
  fetch(`${API_URL}/history/latest`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then((data) => {
      console.log("📄 Data from history API:", data);
      setReports(data);
    })
    .catch((err) => console.error("Failed to load history:", err));
}, []);

  return (
    <div className="w-full h-full min-h-screen px-4 sm:px-8 py-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Recent Reports </h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Sheet</th>
            <th className="border px-2 py-1">Vehicle No</th>
            <th className="border px-2 py-1">Created / Updated</th>
            <th className="border px-2 py-1">View</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, idx) => (
            <tr key={idx} className="border">
              <td className="border px-2 py-1">{r.sheet}</td>
              <td className="border px-2 py-1">{r.vehicleNo}</td>
              <td className="border px-2 py-1">
                {new Date(r.lastUpdated).toLocaleString()}
              </td>
              <td className="border px-2 py-1">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() =>
                    alert(`Navigate to /${r.sheet}/view/${r.vehicleNo}`)
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
