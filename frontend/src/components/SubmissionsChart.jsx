import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function SubmissionsChart() {
  const [range, setRange] = useState("daily");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/reports/submissions/${range}`)
      .then(res => res.json())
      .then(apiData => {
        const formatted = apiData.map(item => ({
          label: item.day || item.week || item.month,
          count: item.count
        }));
        setData(formatted);
      })
      .catch(err => console.error("Error loading chart data:", err));
  }, [range]);

  return (
    <div className="w-full p-4 bg-blue-100 shadow rounded-xl border border-blue-200">
      
      {/* Filter Buttons */}
      <div className="flex gap-2 p-1 px-3 mb-4 w-[265px] rounded-full bg-blue-200 border border-blue-300">
        <button
          onClick={() => setRange("daily")}
          className={`px-4 w-[80px] rounded-3xl transition ${
            range === "daily"
              ? "bg-blue-500 text-white shadow"
              : "bg-white text-blue-700 border border-blue-300"
          }`}
        >
          Daily
        </button>

        <button
          onClick={() => setRange("weekly")}
          className={`px-4 w-[80px] rounded-3xl transition ${
            range === "weekly"
              ? "bg-blue-500 text-white shadow"
              : "bg-white text-blue-700 border border-blue-300"
          }`}
        >
          Weekly
        </button>

        <button
          onClick={() => setRange("monthly")}
          className={`px-4 w-[80px] rounded-3xl transition ${
            range === "monthly"
              ? "bg-blue-500 text-white shadow"
              : "bg-white text-blue-700 border border-blue-300"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="bg-white rounded-lg border border-blue-300"
        >
          <LineChart data={data}>
            <CartesianGrid stroke="#cbd5e1" strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fill: "#1e3a8a" }} />
            <YAxis tick={{ fill: "#1e3a8a" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#1d4ed8"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
