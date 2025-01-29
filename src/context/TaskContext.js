import React, { createContext, useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask, updateTask } from '../api/taskService';
import { getStoredToken } from '../api/authService';

// Create Task Context
const TaskContext = createContext();

// Provide Task Context
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getStoredToken(); // Get stored token for API requests

  // Fetch tasks when component mounts
  useEffect(() => {
    if (token) {
      loadTasks();
    }
  }, [token]);

  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(token);
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };


  console.log("task",tasks)

  const createTask = async (taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTask = await addTask(taskData, token);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      setError('Failed to add task');
    } finally {
      setIsLoading(false);
    }
  };

  const removeTask = async (taskId) => {

    console.log("taskId",taskId)
    setIsLoading(true);
    setError(null);
    try {
      await deleteTask(taskId, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  };

  const editTask = async (taskId, updatedTask) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTaskData = await updateTask(taskId, updatedTask, token);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTaskData : task))
      );
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loadTasks, createTask, removeTask, editTask, isLoading, error }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
