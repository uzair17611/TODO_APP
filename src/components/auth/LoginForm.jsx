import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// Define validation schema with Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, user, isLoading, error } = useAuth(); // ✅ Use Auth Context API

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginSchema.parse(form); // Validate fields
      setErrors({});
  
      console.log("Submitting payload:", { email: form.email, password: form.password }); // ✅ Debugging
  
      await login({ email: form.email, password: form.password }); // ✅ Ensure object is sent
  
    } catch (err) {
      const validationErrors = {};
      err.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  // ✅ Navigate only when `user` is set in Context API
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-3 w-full rounded-lg" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-3 w-full rounded-lg" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button type="submit" className="bg-blue-500 text-white font-semibold py-3 w-full rounded-lg" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {/* ✅ Loader Spinner */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-white border-dotted rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
