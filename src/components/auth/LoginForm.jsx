import React, { useState } from 'react';

const LoginForm = () => {
  return (
    <div>
         <form onSubmit="" className="flex flex-col items-center space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-72 rounded-md"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-72 rounded-md"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Login
      </button>
    </form>
      
    </div>
  )
}

export default LoginForm
