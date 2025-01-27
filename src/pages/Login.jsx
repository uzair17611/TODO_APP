

import React from 'react'
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
    const handleLogin = (formData) => {
       
        console.log('Login Form Submitted:', formData);
      };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-md shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  </div>
  )
}

export default Login
