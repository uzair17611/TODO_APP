import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
     
          <Link to="/" className="text-2xl font-bold text-blue-600">TodoApp</Link>

     
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
            {user && <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition duration-300">Dashboard</Link>}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden sm:inline font-medium text-gray-800">{user.name}</span>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300">
                Login
              </Link>
            )}
          </div>

    
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
          {user && <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600 transition duration-300">Dashboard</Link>}
          {user ? (
            <button 
              onClick={() => { logout(); navigate('/'); }} 
              className="w-full text-left text-red-500 hover:text-red-700 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block text-gray-700 hover:text-blue-600 transition duration-300">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
