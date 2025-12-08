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
  const [range, setRange] = useState("daily"); // daily | weekly | monthly
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
    <div className="w-full p-4 bg-sky-800 shadow rounded-xl">
      {/* Filter Buttons */}
      <div className="flex gap-2 p-1 px-3 mb-4 w-[265px] rounded-full bg-sky-950 border-[0.5pt] border-sky-300">
        <button
          onClick={() => setRange("daily")}
          className={`px-4 w-[80px] rounded-3xl ${range === "daily" ? "bg-blue-600 text-white" : "bg-blue-900"}`}
        >
          Daily
        </button>
        <button
          onClick={() => setRange("weekly")}
          className={`px-4 w-[80px] py-2 rounded-3xl ${range === "weekly" ? "bg-blue-700 text-white" : "bg-blue-900"}`}
        >
          Weekly
        </button>
        <button
          onClick={() => setRange("monthly")}
          className={`px-4 w-[80px] py-2 rounded-3xl ${range === "monthly" ? "bg-blue-600 text-white" : "bg-blue-900"}`}
        >
          Monthly
        </button>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%" className="bg-sky-700 rounded-lg border-[0.5pt] border-sky-300">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label"/>
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#2563eb"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
