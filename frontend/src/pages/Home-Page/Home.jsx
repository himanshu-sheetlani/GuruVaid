import React from "react";
import Navbar from "../../customs/Navbar";
import Dashboard from "./components/Dashboard";
import WeeklyScoreChart from "./components/JourneyGraph";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Dashboard/>
      <WeeklyScoreChart/>
    </div>
  );
};

export default Home;
