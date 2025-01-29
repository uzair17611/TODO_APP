import React, { useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// Define validation schema with Zod
const signupSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long').max(50, 'Name too long'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuth(); // ✅ Use signup from Auth Context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signupSchema.parse(form); // Validate form with Zod
      setErrors({});

      console.log("Submitting payload:", { name: form.name, email: form.email, password: form.password }); // ✅ Debugging

      // ✅ Call signup function from AuthContext
      const success = await signup({ name: form.name, email: form.email, password: form.password });

      if (success) {
        navigate('/dashboard'); // ✅ Redirect user to Dashboard
      }

    } catch (err) {
      const validationErrors = {};
      err.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="border p-3 w-full rounded-lg" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-3 w-full rounded-lg" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-3 w-full rounded-lg" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="border p-3 w-full rounded-lg" />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <button type="submit" className="bg-blue-500 text-white font-semibold py-3 w-full rounded-lg" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-blue-500 cursor-pointer hover:underline">Log in here</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
