import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext.jsx';

const Upload = () => {
  const { removeBg } = useContext(AppContext);
  
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* Title with improved gradient */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            See the Magic
          </span>
          <span className="block text-gray-800 mt-2">Try Now - It's Free</span>
        </h1>

        {/* Upload section with visual enhancements */}
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="mb-6">
              <img 
                src={assets.upload_btn_icon} 
                alt="Upload icon" 
                className="w-12 h-12 mx-auto mb-4"
              />
              <p className="text-gray-600 mb-6">
                Upload an image to remove background instantly
              </p>
            </div>
            
            <input  
            onChange  ={e => removeBg(e.target.files[0])}
            accept ="image/*" 
              type="file" 
              id="upload2" 
  
              className="hidden" 
            />
            <label
              htmlFor="upload2"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <img width={20} src={assets.upload_btn_icon} alt="Upload icon" />
              <span className="text-white text-base">Upload Your Image</span>
            </label>
            
            <p className="mt-4 text-sm text-gray-500">
              Supports JPG, PNG, WEBP (Max 10MB)
            </p>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              Trusted by 10,000+ users worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upload;