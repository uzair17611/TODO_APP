import React, { useState, useContext } from 'react';
import { z } from 'zod';
import TaskContext from '../../context/TaskContext';

// Define validation schema with Zod
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
      createTask(form); // ✅ Calls createTask from Context API
      setForm({ name: '', description: '' }); // ✅ Clears form after submission
    } catch (err) {
      const validationErrors = {};
      err.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Task Name"
        className="border p-2 w-72 rounded-md"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Task Description"
        className="border p-2 w-72 rounded-md"
      ></textarea>
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md" disabled={isLoading}>
        {isLoading ? 'Adding Task...' : 'Add Task'}
      </button>
    </form>
  );
};

export default AddTaskForm;
