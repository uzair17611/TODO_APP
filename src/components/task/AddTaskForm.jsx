


import React, { useState } from 'react';
import { z } from 'zod';


const taskSchema = z.object({
    name: z.string().min(1, 'Task name is required').max(50, 'Task name must be under 50 characters'),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(200, 'Description must be under 200 characters'),
  });

const AddTaskForm = ({ onAddTask }) => {
    const [form, setForm] = useState({ name: '', description: '' });
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        // Validate form with Zod
        taskSchema.parse(form);
        setErrors({}); 
        onAddTask(form); 
        setForm({ name: '', description: '' }); 
      } catch (err) {
        if (err.errors) {
         
          const validationErrors = {};
          err.errors.forEach((error) => {
            validationErrors[error.path[0]] = error.message;
          });
          setErrors(validationErrors);
        }
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
  
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Add Task
        </button>
      </form>
    );
}

export default AddTaskForm
