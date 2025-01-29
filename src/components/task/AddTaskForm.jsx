import React, { useState, useContext } from 'react';
import { z } from 'zod';
import TaskContext from '../../context/TaskContext';

const taskSchema = z.object({
  name: z.string().min(1, 'Task name is required').max(50, 'Task name must be under 50 characters'),
  description: z.string().min(1, 'Description is required').max(200, 'Description must be under 200 characters'),
});

const AddTaskForm = () => {
  const { createTask, isLoading } = useContext(TaskContext);
  const [form, setForm] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      taskSchema.parse(form);
      setErrors({});
      createTask(form);
      setForm({ name: '', description: '' });
    } catch (err) {
      const validationErrors = {};
      err.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Task</h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Task Name"
        className="border p-2 w-full rounded-md focus:ring focus:ring-blue-400"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Task Description"
        className="border p-2 w-full rounded-md mt-2 focus:ring focus:ring-blue-400"
      ></textarea>
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

      <button
        type="submit"
        className="bg-green-500 text-white font-semibold py-2 w-full rounded-md mt-3 transition-transform hover:scale-105"
        disabled={isLoading}
      >
        {isLoading ? 'Adding Task...' : 'Add Task'}
      </button>
    </form>
  );
};

export default AddTaskForm;
