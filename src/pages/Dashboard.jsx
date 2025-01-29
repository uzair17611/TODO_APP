import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../context/TaskContext';
import TaskList from '../components/task/TaskList';
import AddTaskForm from '../components/task/AddTaskForm';
import Footer from '../components/layout/footer';
import Navbar from '../components/layout/Navbar';

const Dashboard = () => {
  const { loadTasks } = useContext(TaskContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks().finally(() => setLoading(false)); // ✅ Load tasks when Dashboard mounts
  }, []);


  
  
  
  
  
  
  const [tasks, setTasks] = useState([]);
  const handleAddTask = (task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...task, id: Date.now(), isCompleted: false },
    ]);
  };


  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };


  const handleEditTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
   
      <Navbar />


      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Task Dashboard</h1>

 
        <AddTaskForm onAddTask={handleAddTask} />


        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </div>

   
      <Footer />
    </div>
  );
};

export default Dashboard;
