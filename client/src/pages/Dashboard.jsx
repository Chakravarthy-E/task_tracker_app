import React from "react";
import Navbar from "../components/Navbar";
import AddTask from "../tasks/AddTask"
import Tasks from "../tasks/Tasks";


const Dashboard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen p-3">
      <Navbar />
      <div className="flex justify-center items-center">
        <AddTask />
      </div>
      <div>
      <Tasks />
      </div>
    </div>
  );
};

export default Dashboard;
