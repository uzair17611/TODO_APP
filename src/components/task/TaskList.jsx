import React, { useContext } from 'react';
import TaskItem from './TaskItem';
import TaskContext from '../../context/TaskContext';

const TaskList = () => {
  const { tasks, isLoading, error } = useContext(TaskContext);

  if (isLoading)
    return <p className="text-center text-blue-500 font-semibold">Loading tasks...</p>;

  if (error)
    return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="flex flex-wrap justify-start gap-4 mt-6">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p className="text-gray-500 text-center w-full">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
