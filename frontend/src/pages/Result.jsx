import React from 'react'
import { assets } from '../assets/assets'

const Result = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 min-h-[75vh]'>
      <div className='bg-white rounded-xl shadow-md p-6 sm:p-8'>
        {/* Image Container */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10'>
          {/* Original Image */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <p className='font-semibold text-gray-700 text-lg'>Original Image</p>
              <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm'>Before</span>
            </div>
            <div className='border border-gray-200 rounded-lg overflow-hidden'>
              <img 
                className='w-full h-auto object-contain max-h-[500px]' 
                src={assets.image_w_bg} 
                alt="Original image with background"
              />
            </div>
          </div>

          {/* Processed Image */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <p className='font-semibold text-gray-700 text-lg'>Background Removed</p>
              <span className='bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm'>After</span>
            </div>
            <div className='border border-gray-200 rounded-lg overflow-hidden bg-checkerboard-pattern bg-[length:20px_20px]'>
              {/* Loading State */}
              <div className='flex items-center justify-center min-h-[300px] relative'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-12 w-12 border-4 border-violet-600 border-t-transparent'></div>
                </div>
                {/* Result would appear here when ready */}
                {/* <img className='w-full h-auto' src={assets.image_wo_bg} alt="Image with background removed"/> */}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row justify-center gap-4 mt-8'>
          <button className='flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Try Another Image
          </button>
          
          <a 
            href={assets.image_wo_bg} 
            download="background-removed.png"
            className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg text-white font-medium hover:from-violet-700 hover:to-fuchsia-600 transition-colors shadow-md hover:shadow-lg'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Image
          </a>
        </div>

        {/* Additional Options */}
        {/* <div className='mt-12 border-t border-gray-100 pt-8'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>More Options</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <button className='p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
              <div className='text-gray-700 font-medium'>Change Background</div>
            </button>
            <button className='p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
              <div className='text-gray-700 font-medium'>Edit Image</div>
            </button>
            <button className='p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
              <div className='text-gray-700 font-medium'>Share</div>
            </button>
            <button className='p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
              <div className='text-gray-700 font-medium'>Save to Cloud</div>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Result