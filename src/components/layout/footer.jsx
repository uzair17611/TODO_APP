import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-6 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
    
        <h2 className="text-2xl font-bold text-blue-600">TodoApp</h2>
        <p className="text-sm mt-2">Manage your tasks efficiently with TodoApp.</p>

 
        <div className="flex justify-center space-x-6 mt-4">
          <a href="/" className="hover:text-blue-500 transition duration-300">Home</a>
          <a href="/dashboard" className="hover:text-blue-500 transition duration-300">Dashboard</a>
          <a href="/about" className="hover:text-blue-500 transition duration-300">About</a>
          <a href="/contact" className="hover:text-blue-500 transition duration-300">Contact</a>
        </div>

       
        <div className="mt-6 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} TodoApp. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
