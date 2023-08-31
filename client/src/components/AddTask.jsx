import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tasks from './Tasks';

const TaskManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
  });
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://api.example.com/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if (task.title.trim() !== '') {
      setTasks([...tasks, task]);
      setTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
      });
    }
  };

  const handleEditTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    setEditIndex(-1);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        {showForm ? 'Hide Form' : 'Add Task'}
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

      <Tasks
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        editedTask={editedTask}
        setEditedTask={setEditedTask}
      />
    </div>
  );
};

export default TaskManager;
