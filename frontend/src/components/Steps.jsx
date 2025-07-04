import React from 'react';
import { assets } from '../assets/assets';

const Steps = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12">
          Remove image backgrounds in <span className="text-blue-600">3 simple steps</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Step 1 - Upload */}
          <div className="bg-blue-50/50 p-8 rounded-xl border border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg group">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
              <img 
                src={assets.upload_icon} 
                alt="Upload icon" 
                className="w-8 h-8"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Upload Image</h3>
            <p className="text-gray-600">
              Drag & drop your image or click to browse files. We support JPG, PNG, and WEBP formats.
            </p>
            <div className="mt-4 text-blue-600 font-medium">Try it now →</div>
          </div>

          {/* Step 2 - Process */}
          <div className="bg-purple-50/50 p-8 rounded-xl border border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg group">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
              <img 
                src={assets.remove_bg_icon} 
                alt="Process icon" 
                className="w-8 h-8"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Remove Background</h3>
            <p className="text-gray-600">
              Our AI automatically removes the background in seconds with perfect edge detection.
            </p>
            <div className="mt-4 text-purple-600 font-medium">Watch it work →</div>
          </div>

          {/* Step 3 - Download */}
          <div className="bg-green-50/50 p-8 rounded-xl border border-green-100 hover:border-green-300 transition-all hover:shadow-lg group">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
              <img 
                src={assets.download_icon} 
                alt="Download icon" 
                className="w-8 h-8"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Download Image</h3>
            <p className="text-gray-600">
              Get your transparent PNG or edited image instantly. No watermarks, no limits.
            </p>
            <div className="mt-4 text-green-600 font-medium">Get results →</div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105">
            Start Removing Backgrounds Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Steps;