import React, { useState } from 'react';
import { assets } from '../assets/assets';

const BgSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <section className="py-8 md:py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Title */}
                <h1 className="mb-8 text-center text-2xl md:text-3xl lg:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        See the Magic
                    </span>{' '}
                    <br className="md:hidden" />
                    of Our Background Removal
                </h1>

                {/* Slider Container */}
                <div className="relative w-full max-w-2xl mx-auto rounded-xl shadow-md overflow-hidden border border-gray-200">
                    {/* Background Image */}
                    <div className="relative aspect-video w-full">
                        <img 
                            src={assets.image_w_bg} 
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                            alt="Original image with background"
                        />
                        {/* Foreground Image */}
                        <img 
                            src={assets.image_wo_bg} 
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                            alt="Image with background removed"
                        />
                    </div>

                    {/* Slider Control */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={sliderPosition}
                            onChange={handleSliderChange}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onTouchStart={handleMouseDown}
                            onTouchEnd={handleMouseUp}
                            className={`absolute w-full h-full opacity-0 cursor-ew-resize z-20 ${isDragging ? 'cursor-grabbing' : ''}`}
                        />
                        <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md z-10"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute -left-2 -top-2 bg-white rounded-full p-1.5 shadow-sm border border-gray-200">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    className="text-gray-700"
                                >
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Labels */}
                    <div className="absolute bottom-3 left-3 bg-white/80 px-2 py-0.5 rounded text-xs font-medium text-gray-700 backdrop-blur-sm">
                        Original
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/80 px-2 py-0.5 rounded text-xs font-medium text-gray-700 backdrop-blur-sm">
                        Result
                    </div>
                </div>

                {/* Instructions */}
                <p className="mt-4 text-center text-sm text-gray-600 max-w-md mx-auto">
                    Drag the slider to compare before and after results. Our AI detects edges with 
                    <span className="font-semibold text-blue-600"> 99% accuracy</span>.
                </p>
            </div>
        </section>
    );
};

export default BgSlider;