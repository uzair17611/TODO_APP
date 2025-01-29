import React, { useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 
import useAuth from '../../hooks/useAuth';


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
  const { signup, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signupSchema.parse(form); 
      setErrors({});

      console.log("Submitting payload:", { name: form.name, email: form.email, password: form.password });

      const success = await signup({ name: form.name, email: form.email, password: form.password });

      if (success) {
        navigate('/dashboard');
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        
    
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Your Account 🚀
        </h1>

   
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

    
        <form onSubmit={handleSubmit} className="space-y-4">

        
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

 
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

      
          <div className="relative">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring focus:ring-blue-300 pr-10"
            />
            <span
              className="absolute right-3 top-10 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

       
          <div className="relative">
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring focus:ring-blue-300 pr-10"
            />
            <span
              className="absolute right-3 top-10 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

 
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 w-full rounded-lg transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

     
        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <span onClick={() => navigate('/')} className="text-blue-500 cursor-pointer hover:underline">
            Log in here
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

export default SignUpForm;
