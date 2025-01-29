import api from './api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';


 
export const fetchTasks = async () => {
  const response = await api.get(`${API_BASE_URL}/tasks`);
  return response.data;
};


export const addTask = async (taskData) => {
  const response = await api.post(`${API_BASE_URL}/tasks`, taskData);
  return response.data;
};


export const deleteTask = async (taskId) => {
  await api.delete(`${API_BASE_URL}/tasks/${taskId}`);
};


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