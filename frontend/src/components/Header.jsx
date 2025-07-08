import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../../context/AppContext';

const Header = () => {

  const {removeBg} = useContext(AppContext)
  return (
    <header className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
          {/* Left side - Content */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Remove the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                background
              </span>{' '}
              <br />
              from images for free.
            </h1>
            
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
              Instantly remove backgrounds from your images with our AI-powered tool. 
              No signup required, completely free, and works in seconds.
            </p>
            
            <div className="pt-4">
              <input  onChange={e=> removeBg(e.target.files[0])}  accept="image/*" type="file" name="" id="upload1" className="hidden" />
              <label 
                htmlFor="upload1"
                className="inline-flex items-center gap-3 bg-white border-2 border-dashed border-blue-400 rounded-xl px-6 py-4 cursor-pointer hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg"
              >
                <img 
                  src={assets.upload_btn_icon} 
                  alt="Upload icon" 
                  className="w-8 h-8"
                />
                <span className="text-lg font-medium text-gray-800">
                  Upload Your Image
                </span>
              </label>
              <p className="mt-2 text-sm text-gray-500">
                Supports JPG, PNG, WEBP up to 5MB
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src={assets.header_img} 
                alt="Before and after background removal example" 
                className="w-full h-auto rounded-xl shadow-xl transform hover:scale-[1.02] transition-transform"
              />
              <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-md">
                <span className="text-sm font-medium text-gray-700">AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;