import React from "react";
import { AuthStore } from "../../../stores/useAuthStore.js";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-4 min-h-[90vh] p-6 bg-gradient-to-r from-blue-50 via-purple-100 to-pink-200 mt-16">
      {/* Left Column - 30% */}
      <div className="col-span-1 md:col-span-3 bg-white p-6 rounded-3xl shadow-xl">
        <RiskPredictor />
        <TaskBox />
      </div>

      {/* Right Column - 70% */}
      <div className="col-span-1 md:col-span-7 bg-gradient-to-r from-blue-900 to-blue-600 p-6 rounded-3xl shadow-xl text-white">
        <UserSmartWatchInfo />
        <UserStats />
        <Graphs />
      </div>
    </div>
  );
};

export default Dashboard;

const UserStats = () => {
  const { user } = AuthStore();
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl mb-6 text-black">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-200 p-2 rounded-full">
            <span className="text-purple-600 text-3xl">🧬</span>
          </div>
          <h2 className="text-xl font-semibold">My Stats</h2>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <Card title="Height" value={user?.manualInput?.height} unit="cm" />
        <Card title="Weight" value={user?.manualInput?.weight} unit="Kgs" />
        <Card title="Age" value={user?.manualInput?.age} />
        <Card
  title="BMI"
  value={
    user?.manualInput
      ? (user.manualInput.weight / user.manualInput.height).toFixed(3)
      : "-"
  }
/>
      </div>
    </div>
  );
};

const UserSmartWatchInfo = () => {
  const { user } = AuthStore();
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl mb-6 text-black">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-200 p-2 rounded-full">
            <span className="text-purple-600 text-3xl">🧬</span>
          </div>
          <h2 className="text-xl font-semibold">My Activity</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 text-sm bg-gray-200 p-2 rounded-full">
          <button>Update Health Info</button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Today’s Steps"
          value={user?.smartWatchInput?.steps}
          unit="steps"
        />
        <Card
          title="Heart Rate"
          value={user?.smartWatchInput?.heartrate}
          unit="Beats Per Minute"
        />
        <Card
          title="Sleep & Recovery"
          value={user?.smartWatchInput?.sleephour}
          unit="sleep hours"
        />
      </div>
    </div>
  );
};

const Card = ({ title, value, unit, extra, route }) => {
  return (
    <div className="w-48 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg text-gray-900">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{title}</p>
        <span className="text-blue-500 text-xs">{extra}</span>
      </div>
      <p className="text-xs text-gray-400">{route}</p>
      <p className="text-3xl font-semibold mt-3">
        {value}{" "}
        <span className="text-base font-medium text-gray-500">{unit}</span>
      </p>
    </div>
  );
};

import { RadialBarChart, RadialBar, Legend } from "recharts";

const GaugeChart = ({ score }) => {
  const data = [
    {
      name: "Score",
      value: score,
      fill: "#4ADE80", // green
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg bg-white">
      <div className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <span>🧠</span> Mental Health Score
      </div>
      <RadialBarChart
        width={180}
        height={180}
        innerRadius="70%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar minAngle={15} background clockWise dataKey="value" />
      </RadialBarChart>
      <div className="text-4xl font-bold text-green-500 mt-2">{score}/100</div>
      <div className="text-sm text-gray-500">Based on your daily vitals</div>
    </div>
  );
};

const Graphs = () => {
  const { predict_mental_score, mental_score } = usePredictStore();

  useEffect(() => {
    predict_mental_score();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <GaugeChart score={mental_score || 0} />
      <BodyComposition />
      <GoalBanner />
    </div>
  );
};

const GraphCard = ({ title, value, unit, icon, indicator }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-black">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-200 p-2 rounded-full text-green-600">
            {icon}
          </div>
          <h2 className="font-semibold text-sm">{title}</h2>
        </div>
        <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
          ↗
        </button>
      </div>

      <div className="flex flex-col items-center mt-4">
        {/* Placeholder for gauge */}
        <div className="w-32 h-32 rounded-full border-t-8  border-l-8 border-blue-300 border-b-transparent border-r-transparent transform rotate-45 mb-4"></div>
        <p className="text-3xl font-semibold">
          {value} <span className="text-sm text-gray-500">{unit}</span>
        </p>
        <p className="text-gray-600 text-sm">{indicator} Score</p>
      </div>

      <div className="flex justify-around mt-4 text-center text-xs">
        <div>
          <p className="text-gray-400">Mindfulness</p>
          <p className="font-semibold">82%</p>
        </div>
        <div>
          <p className="text-gray-400">Stress Management</p>
          <p className="font-semibold">68%</p>
        </div>
      </div>
    </div>
  );
};

const BodyComposition = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-black">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-orange-200 p-2 rounded-full text-orange-600">
            🏋️
          </div>
          <h2 className="font-semibold text-sm">Body Composition</h2>
        </div>
        <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
          ↗
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-pink-500 font-semibold">
            68 <span className="text-xs">Kg</span>
          </p>
          <p className="text-gray-500 text-xs">
            Your weight is within a healthy range
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-red-500 font-semibold">22%</p>
          <p className="text-gray-500 text-xs">
            Your body fat percentage is at an ideal level
          </p>
        </div>
      </div>
    </div>
  );
};

const GoalBanner = () => {
  return (
    <div className="rounded-xl bg-gradient-to-br from-[#121829] to-[#1C2A40] text-white p-6 flex flex-col justify-between shadow-xl">
      <div>
        <h3 className="text-xl font-semibold leading-tight">
          Set and Achieve
          <br />
          Your Health Goals!
        </h3>
        <p className="text-sm mt-2">
          Your Goal:
          <br />
          <span className="font-semibold text-white">Lose 3kg in 1 month</span>
        </p>
      </div>
      <div className="mt-4">
        <button className="bg-white text-blue-600 text-sm font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-gray-100">
          Adjust My Goal <span>➡️</span>
        </button>
      </div>
    </div>
  );
};

import { usePredictStore } from "../../../stores/predictStore.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const RiskPredictor = () => {
  const { predict, risk_level } = usePredictStore();

  const getRiskLabel = (level) => {
    switch (level) {
      case 0:
        return {
          label: "Low",
          color: "text-green-600",
          bg: "bg-green-100",
          percentage: 33,
        };
      case 1:
        return {
          label: "Moderate",
          color: "text-yellow-600",
          bg: "bg-yellow-100",
          percentage: 66,
        };
      case 2:
        return {
          label: "High",
          color: "text-red-600",
          bg: "bg-red-100",
          percentage: 100,
        };
      default:
        return null;
    }
  };

  const risk = getRiskLabel(risk_level);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl w-full mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-red-200 p-2 rounded-full">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold">Risk Predictor</h2>
        </div>
      </div>

      {/* Risk Prediction Box */}
      <div className="flex flex-col items-center justify-center mt-4 p-6 border-2 border-gray-300 rounded-xl">
        <p className="text-gray-600 text-sm text-center mb-4">
          Click the button below to predict your health risk based on your data.
        </p>
        <button
          onClick={predict}
          className="bg-red-500 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg w-full hover:bg-red-600"
        >
          Predict Risk
        </button>

        {/* Show risk level if available */}
        {risk_level !== null && (
          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="w-36 h-36 mb-4">
              <CircularProgressbar
                value={risk.percentage}
                text={`${risk.label}`}
                strokeWidth={10}
                styles={{
                  path: {
                    stroke:
                      risk_level === 0
                        ? "#4CAF50"
                        : risk_level === 1
                        ? "#FFEB3B"
                        : "#F44336",
                    strokeLinecap: "round",
                  },
                  text: {
                    fill:
                      risk_level === 0
                        ? "#4CAF50"
                        : risk_level === 1
                        ? "#FFEB3B"
                        : "#F44336",
                    fontSize: "20px",
                    fontWeight: "bold",
                  },
                  trail: {
                    stroke: "#e0e0e0",
                  },
                }}
              />
            </div>

            <div className={`mt-4 px-6 py-3 rounded-xl text-center ${risk.bg}`}>
              <p className={`text-lg font-bold ${risk.color}`}>
                Risk Level: {risk.label}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { useEffect } from "react";

const TaskBox = () => {
  const { generate_task, tasks } = usePredictStore();

  // Assuming 'tasks' contains 'daily_tasks' and 'weekly_tasks' from the API response
  const dailyTasks = tasks?.daily_tasks || [];
  const weeklyTasks = tasks?.weekly_tasks || [];

  useEffect(() => {
    generate_task(); // Generate tasks when the component mounts
  }, []);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl w-full mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-200 p-2 rounded-full">
            <span className="text-blue-600 text-2xl">📋</span>
          </div>
          <h2 className="text-xl font-semibold">Daily Routine Tasks</h2>
        </div>
      </div>

      {/* Daily Tasks List */}
      {dailyTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Daily Tasks</h3>
          <div className="space-y-4">
            {dailyTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between">
                <label className="text-lg text-gray-700">{task}</label>
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Tasks List */}
      {weeklyTasks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Tasks</h3>
          <div className="space-y-4">
            {weeklyTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between">
                <label className="text-lg text-gray-700">{task}</label>
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional: Add a "Mark All as Completed" Button */}
      <div className="mt-6 text-center">
        <button className="bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg w-full hover:bg-green-600">
          Mark All as Completed
        </button>
      </div>
    </div>
  );
};
