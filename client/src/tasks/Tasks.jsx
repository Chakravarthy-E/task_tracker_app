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
  const handleUpdate = () => {};
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      <ul className=" gap-2 flex-wrap">
        {data.map((task) => (
          <li key={task._id} className="bg-gray-100 border rounded-md p-4 mb-4">
            <h3 className="text-xl font-bold">
              Title: <span className="font-normal">{task.title}</span>
            </h3>
            <p className="text-lg">
              Description:{" "}
              <span className="font-normal">{task.description}</span>
            </p>
            <p className="text-lg">
              Due Date: <span className="font-normal">{task.dueDate}</span>
            </p>
            <p className="text-lg">
              Priority: <span className="font-normal">{task.priority}</span>
            </p>
            <div className="flex justify-between mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleUpdate(task._id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
