import React, { useContext } from 'react';
import TaskItem from './TaskItem';
import TaskContext from '../../context/TaskContext';

const TaskList = () => {
  const { tasks, isLoading, error } = useContext(TaskContext);

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
