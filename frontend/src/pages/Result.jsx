import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const Result = () => {
  const { resultImage, image, setImage, setResultImage } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's an image to process
    if (!image) {
      setError('No image found. Please upload an image first.');
      setIsLoading(false);
      return;
    }

    // If we already have a result, we're not loading
    if (resultImage) {
      setIsLoading(false);
    }
  }, [image, resultImage]);

  const handleTryAnother = () => {
    setImage(null);
    setResultImage(null);
    navigate('/');
  };

  const handleDownload = () => {
    try {
      if (!resultImage) {
        toast.error('No processed image available to download');
        return;
      }

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `background-removed-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading image:', err);
      toast.error('Failed to download image');
    }
  };

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 min-h-[75vh]'>
      <div className='bg-white rounded-xl shadow-md p-6 sm:p-8'>
        {/* Error Message */}
        {error && (
          <div className='bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg className='h-5 w-5 text-red-400' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-sm text-red-700'>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Image Container */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10'>
          {/* Original Image */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <p className='font-semibold text-gray-700 text-lg'>Original Image</p>
              <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm'>Before</span>
            </div>
            <div className='border border-gray-200 rounded-lg overflow-hidden bg-gray-50 min-h-[300px] flex items-center justify-center'>
              {image ? (
                <img 
                  className='w-full h-auto max-h-[500px] object-contain p-2' 
                  src={URL.createObjectURL(image)} 
                  alt='Original image with background'
                />
              ) : (
                <p className='text-gray-500'>No image selected</p>
              )}
            </div>
          </div>

          {/* Processed Image */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <p className='font-semibold text-gray-700 text-lg'>Background Removed</p>
              <span className='bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm'>After</span>
            </div>
            <div className='border border-gray-200 rounded-lg overflow-hidden bg-checkerboard-pattern bg-[length:20px_20px] min-h-[300px] relative'>
              {isLoading ? (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-4 border-violet-600 border-t-transparent mx-auto'></div>
                    <p className='mt-3 text-sm text-gray-600'>Removing background...</p>
                  </div>
                </div>
              ) : resultImage ? (
                <img 
                  className='w-full h-auto max-h-[500px] object-contain p-2' 
                  src={resultImage} 
                  alt='Image with background removed'
                />
              ) : (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <p className='text-gray-500'>Processed image will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row justify-center gap-4 mt-8'>
          <button 
            onClick={handleTryAnother}
            className='flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' clipRule='evenodd' />
            </svg>
            Try Another Image
          </button>
          
          <button
            onClick={handleDownload}
            disabled={!resultImage || isLoading}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg ${
              !resultImage || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:from-violet-700 hover:to-fuchsia-600'
            }`}
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
            {isLoading ? 'Processing...' : 'Download Image'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;