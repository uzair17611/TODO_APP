import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">TodoApp</Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            {user && <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>}
          </div>

          {/* User Info & Logout Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden sm:inline font-medium">{user.name}</span>
                <button
                  onClick={() => { logout(); navigate('/'); }} // ✅ Logout via Context API
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 p-3 space-y-2">
          <Link to="/" className="block hover:text-gray-200">Home</Link>
          {user && <Link to="/dashboard" className="block hover:text-gray-200">Dashboard</Link>}
          {user ? (
            <button onClick={() => { logout(); navigate('/'); }} className="w-full text-left text-red-300 hover:text-white">
              Logout
            </button>
          ) : (
            <Link to="/" className="block hover:text-gray-200">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
