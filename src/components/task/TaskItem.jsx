import React, { useContext, useState } from 'react';
import TaskContext from '../../context/TaskContext';

const TaskItem = ({ task }) => {
  const { removeTask, editTask, toggleTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    await editTask(task.id, editedTask);
    setIsEditing(false);
  };

  const handleToggle = async () => {
    await toggleTask(task.id, !editedTask.is_completed);
    setEditedTask((prevTask) => ({ ...prevTask, is_completed: !prevTask.is_completed })); // ✅ Update locally
  };

  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 w-80 transition-transform hover:scale-105 
      ${editedTask.is_completed ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
      
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleEditChange}
            className="border p-2 w-full rounded-md focus:ring focus:ring-blue-400"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
            className="border p-2 w-full rounded-md mt-2 focus:ring focus:ring-blue-400"
          ></textarea>
          <div className="mt-4 flex justify-between">
            <button onClick={handleSaveEdit} className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:underline">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold text-gray-800">{editedTask.name}</h3>
          <p className="text-gray-600 mt-2">{editedTask.description}</p>

          {/* ✅ Status Label */}
          <p className={`mt-2 text-sm font-semibold ${editedTask.is_completed ? 'text-green-500' : 'text-red-500'}`}>
            {editedTask.is_completed ? 'Completed' : 'Pending'}
          </p>

          <div className="mt-4 flex justify-between">
            <button 
              onClick={handleToggle}
              className={`px-4 py-2 rounded-md transition duration-200 
                ${editedTask.is_completed ? 'bg-gray-400 text-white' : 'bg-green-500 text-white'}`}>
              {editedTask.is_completed ? 'Mark as Pending' : 'Mark as Completed'}
            </button>

            <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:underline">
              Edit
            </button>

            <button onClick={() => removeTask(task.id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
