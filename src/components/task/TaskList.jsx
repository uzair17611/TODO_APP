import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
