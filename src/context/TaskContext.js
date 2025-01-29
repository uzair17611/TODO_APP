import React, { createContext, useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask, updateTask, toggleTaskCompletion } from '../api/taskService';
import { getStoredToken } from '../api/authService';


const TaskContext = createContext();


export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getStoredToken();

  useEffect(() => {
    if (token) {
      loadTasks();
    }
  }, [token]);

  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

 
  const createTask = async (taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTask = await addTask(taskData);
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (err) {
      setError('Failed to add task');
    } finally {
      setIsLoading(false);
    }
  };

 
  const removeTask = async (taskId) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); 
    } catch (err) {
      setError('Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Edit Task and Update UI
  const editTask = async (taskId, updatedTask) => {
    setIsLoading(true);
    setError(null);
    loadTasks()
    try {
      const updatedTaskData = await updateTask(taskId, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTaskData : task))
      ); // ✅ Update task in the list
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };


  const toggleTask = async (taskId, isCompleted) => {
    setIsLoading(true);
    setError(null);
    loadTasks()
    try {
      const updatedTask = await toggleTaskCompletion(taskId, isCompleted);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, is_completed: updatedTask.is_completed } : task
        )
      ); 
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loadTasks, createTask, removeTask, editTask, toggleTask, isLoading, error }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
