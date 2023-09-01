import React from 'react';

const Tasks = ({
  tasks,
  onEdit,
  onDelete,
  editIndex,
  setEditIndex,
  editedTask,
  setEditedTask,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <ul>
        {tasks && tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className="mb-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                {editIndex === index ? (
                  <div>
                    <input
                      type="text"
                      value={editedTask.title}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          title: e.target.value,
                        })
                      }
                      className="border rounded-md p-2 mb-2"
                    />
                    <textarea
                      value={editedTask.description}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          description: e.target.value,
                        })
                      }
                      className="border rounded-md p-2 mb-2"
                    />
                    <input
                      type="date"
                      value={editedTask.dueDate}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          dueDate: e.target.value,
                        })
                      }
                      className="border rounded-md p-2 mb-2"
                    />
                    <select
                      value={editedTask.priority}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          priority: e.target.value,
                        })
                      }
                      className="border rounded-md p-2 mb-2"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    <button
                      onClick={() => onEdit(index, editedTask)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-600 text-sm">{task.description}</p>
                    <div className="flex items-center mt-2">
                      <div className="mr-4">
                        <strong className="font-semibold">Due Date:</strong>{' '}
                        {task.dueDate}
                      </div>
                      <div>
                        <strong className="font-semibold">Priority:</strong>{' '}
                        {task.priority}
                      </div>
                    </div>
                    <button
                      onClick={() => setEditIndex(index)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md mt-2"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <div className="text-gray-500">No tasks available</div>
        )}
      </ul>
    </div>
  );
};

export default Tasks;
