import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../context/TaskContext';
import TaskList from '../components/task/TaskList';
import AddTaskForm from '../components/task/AddTaskForm';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

const Dashboard = () => {
  const { tasks, loadTasks, createTask, removeTask, editTask } = useContext(TaskContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks().finally(() => setLoading(false)); // ✅ Load tasks when Dashboard mounts
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <Navbar />

      <main className="flex-grow p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📋 Task Dashboard</h1>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a New Task</h2>
          <AddTaskForm onAddTask={createTask} />
        </div>

      
        {loading ? (
          <div className="flex justify-center mt-6">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex justify-center ">Your Tasks</h2>
            <TaskList tasks={tasks} onDeleteTask={removeTask} onEditTask={editTask} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
