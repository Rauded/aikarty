import React, { useState } from 'react';
import Button from './Button';
import heroImage from '../assets/hero_image.png';
import alternateImage from '../assets/hero_image_back.png'; // You'll need this second image

const Hero = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <section className="bg-gray-100 text-black py-8 my-12">
      <div className="container mx-auto px-4 flex items-center justify-center ml-10px">
        {/* Left side content */}
        <div className="w-1/3 ml-10px">
          <h1 style={{ fontSize: 60 }} className="text-5xl font-bold mb-4 text-indigo-600 pl-20">
            Master Any Subject with AI-Powered Flashcards
          </h1>
          <p style={{ fontSize: 30 }} className="text-lg mb-6 pl-10px">
            Upload your study materials and let our AI break them down into perfect atomic flashcards for more effective learning.
          </p>
          <div className="flex justify-center gap-4">
            <button style={{ fontSize: 20 }} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-base font-medium flex items-center justify-center">
              <span className="mr-2">⚡</span> Začni se učit
            </button>
            <button style={{ fontSize: 20 }} className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-base font-medium">
              Ako to funguje
            </button>
          </div>
        </div>
        
        {/* Right side content */}
        <div className="w-1/2 ml-6px">
          <div className="bg-indigo-500 rounded-xl p-12 relative flex flex-col items-center justify-center">
            <div 
              className="relative cursor-pointer transition-all duration-300"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img 
                src={isHovering ? alternateImage : heroImage} 
                alt="Hero" 
                className="mb-6 max-w-full h-auto rounded-lg shadow-lg transition-opacity duration-300" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;