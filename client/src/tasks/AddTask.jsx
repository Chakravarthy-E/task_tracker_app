import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });

  const handleAddTask = async () => {
    const { title, description, dueDate, priority } = task;
    const data = await axios.post("http://localhost:5000/tasks", {
      title,
      description,
      dueDate,
      priority,
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        {showForm ? "Hide Form" : "Add Task"}
      </button>

      {showForm && (
        <div className="mt-4 flex flex-col">
          <input
            type="text"
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="border rounded-md p-2 mb-2"
          />
          <textarea
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="border rounded-md p-2 mb-2"
          />
          <input
            type="date"
            placeholder="Due Date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className="border rounded-md p-2 mb-2"
          />
          <select
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className="border rounded-md p-2 mb-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            onClick={handleAddTask}
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
          >
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
