import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const weeklyScoreData = [
  { day: "Mon", score: 7 },
  { day: "Tue", score: 5 },
  { day: "Wed", score: 8 },
  { day: "Thu", score: 6 },
  { day: "Fri", score: 9 },
  { day: "Sat", score: 4 },
  { day: "Sun", score: 7 },
];

const WeeklyScoreChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-black w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-200 p-2 rounded-full text-yellow-600 text-xl">
            📊
          </div>
          <h2 className="font-semibold text-sm">Weekly Score Overview</h2>
        </div>
        <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
          ↗
        </button>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={weeklyScoreData}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyScoreChart;
