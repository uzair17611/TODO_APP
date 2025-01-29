import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FiEye, FiEyeOff } from "react-icons/fi"; 


const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const { login, user, isLoading, error } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginSchema.parse(form); 
      setErrors({});
  
      console.log("Submitting payload:", { email: form.email, password: form.password }); 
  
      await login({ email: form.email, password: form.password }); 
  
    } catch (err) {
      const validationErrors = {};
      err.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
    }
  };


  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        
    
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome Back 👋
        </h1>

   
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

  
        <form onSubmit={handleSubmit} className="space-y-4">
          
  
          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="you@example.com" 
              value={form.email} 
              onChange={handleChange} 
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                placeholder="Enter your password" 
                value={form.password} 
                onChange={handleChange} 
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring focus:ring-blue-300 pr-10"
              />
        
              <button 
                type="button" 
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

   
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 w-full rounded-lg transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>


        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} className="text-blue-500 cursor-pointer hover:underline">
            Sign up here
          </span>
        </p>
      </div>

  
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-white border-dotted rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
