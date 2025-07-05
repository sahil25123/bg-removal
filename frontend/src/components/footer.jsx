import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-white-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <img 
              src={assets.logo} 
              alt="Company Logo" 
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Sahil Gupta. All Rights Reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <img 
                src={assets.facebook_icon} 
                alt="Facebook" 
                className="h-8 w-8"
              />
            </a>
            <a 
              href="https://plus.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <img 
                src={assets.google_plus_icon} 
                alt="Google Plus" 
                className="h-8 w-8"
              />
            </a>
            {/* Add more social icons as needed */}
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</a>
          </div>
          
          <p className="text-gray-500 text-xs">
            Made with ❤️ by Sahil Gupta
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;