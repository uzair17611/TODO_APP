import React from 'react'
import TaskList from '../components/task/TaskList'
import AddTaskForm from '../components/task/AddTaskForm'

const Dashboard = () => {
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
    <div className="p-6">
    <h1 className="text-2xl font-bold text-center mb-6">Task Dashboard</h1>
  
    <AddTaskForm onAddTask={handleAddTask} />

   
    <TaskList
      tasks={tasks}
      onDeleteTask={handleDeleteTask}
      onEditTask={handleEditTask}
    />
  </div>
  )
}

export default Dashboard
