import React from "react";
import Navbar from "./Navbar";
import AddTask from "./AddTask";
import Tasks from "./Tasks";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center">
        <AddTask />
      </div>
      <div className="flex justify-center items-center">
        <Tasks />
      </div>
    </div>
  );
};

export default Dashboard;
