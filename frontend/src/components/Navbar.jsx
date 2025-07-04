import React from 'react';
import { assets } from '../assets/assets.js';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with hover effect */}
          <Link to="/" className="flex items-center">
            <img 
              src={assets.logo} 
              alt="Logo" 
              className="h-8 sm:h-10 w-auto hover:opacity-80 transition-opacity"
            />
            <span className="ml-2 text-xl font-semibold text-gray-800 hidden sm:inline"></span>
          </Link>

          {/* Get Started Button with animation */}
          <Link to="/result">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white 
              flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg 
              transition-all duration-300 hover:scale-105 transform">
              Remove Background Now
              <img 
                className="w-3 h-3 sm:w-3 sm:h-3 animate-pulse" 
                src={assets.arrow_icon} 
                alt="Arrow"
              />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;