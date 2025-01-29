import api from './api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

/**
 * Fetches all tasks for the authenticated user.
 * @returns {Array} - List of tasks.
 */
export const fetchTasks = async () => {
  const response = await api.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

/**
 * Adds a new task to the user's task list.
 * @param {Object} taskData - { name, description }
 * @returns {Object} - The newly created task.
 */
export const addTask = async (taskData) => {
  const response = await api.post(`${API_BASE_URL}/tasks`, taskData);
  return response.data;
};

/**
 * Deletes a task by its ID.
 * @param {string} taskId - The ID of the task to delete.
 */
export const deleteTask = async (taskId) => {
  await api.delete(`${API_BASE_URL}/tasks/${taskId}`);
};

/**
 * Updates an existing task.
 * @param {string} taskId - The ID of the task to update.
 * @param {Object} taskData - Updated task data.
 * @returns {Object} - Updated task.
 */
export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`${API_BASE_URL}/tasks/${taskId}`, taskData);
  return response.data;
};




export const toggleTaskCompletion = async (taskId, isCompleted) => {
  console.log("taskId",taskId)
  console.log("isCompleted",isCompleted)
 const response = await api.put(`${API_BASE_URL}/tasks/${taskId}/toggle`, { is_completed: isCompleted });
 return response.data;
};