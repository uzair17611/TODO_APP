import React, { useContext, useState } from 'react';
import TaskContext from '../../context/TaskContext';

const TaskItem = ({ task }) => {
  const { removeTask, editTask, loadTasks, isLoading } = useContext(TaskContext); // ✅ Add loadTasks to re-fetch tasks
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ name: task.name, description: task.description });

  const handleEditChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    await editTask(task.id, editedTask); // ✅ Ensure API updates backend
    loadTasks(); // ✅ Re-fetch tasks after editing
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-md w-80">
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleEditChange}
            className="border p-2 w-full rounded-md"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
            className="border p-2 w-full rounded-md mt-2"
          ></textarea>
          <div className="mt-4 flex space-x-4">
            <button onClick={handleSaveEdit} className="text-green-500 hover:underline">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:underline">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-bold">{task.name}</h3>
          <p className="text-gray-600 mt-2">{task.description}</p>
          <div className="mt-4 flex space-x-4">
            <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:underline">
              Edit
            </button>
            <button onClick={() => removeTask(task.id)} className="text-red-500 hover:underline" disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
