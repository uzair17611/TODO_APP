import React, { useState } from 'react';

const SignUpForm = () => {
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
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

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className="border p-2 w-72 rounded-md"
      />
      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
        Sign Up
      </button>
    </form>
    </div>
  )
}

export default SignUpForm
