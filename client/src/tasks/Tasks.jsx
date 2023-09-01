import React, { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      // Refresh the task list after deletion
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Function to format the ISO date to a human-readable format
  const formatDueDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(); // Format according to user's locale
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" font-serif">
      <h1 className="text-3xl font-semibold mb-4">Tasks</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((task) => (
          <li key={task._id} className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Title: <span className="font-normal">{task.title}</span></h3>
            <p className="text-sm mb-2">Description: <span className="font-normal">{task.description}</span></p>
            <p className="text-sm mb-2">Due Date: <span className="font-normal">{formatDueDate(task.dueDate)}</span></p>
            <p className="text-sm mb-2">Priority: <span className="font-normal">{task.priority}</span></p>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600">Update</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600" onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
