

import React from 'react'

const TaskItem = ({ task }) => {
    return (
        <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-md w-80">
          <h3 className="text-lg font-bold">{task.name}</h3>
          <p className="text-gray-600 mt-2">{task.description}</p>
          <div className="mt-4 flex space-x-4">
            <button className="text-blue-500 hover:underline">Edit</button>
            <button className="text-red-500 hover:underline">Delete</button>
          </div>
        </div>
      );
}

export default TaskItem
