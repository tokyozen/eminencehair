import React, { useState, useEffect } from 'react';
import { Crown, Sparkles } from 'lucide-react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Add a small delay before hiding the preloader
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Ensure preloader shows for at least 2 seconds
    const minLoadTime = setTimeout(() => {
      if (progress >= 100) {
        setTimeout(() => setIsLoading(false), 500);
      }
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minLoadTime);
    };
  }, [progress]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-soft-black flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-muted-coral rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-golden-yellow rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-muted-coral rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-golden-yellow rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-muted-coral rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 right-1/6 w-2 h-2 bg-golden-yellow rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      </div>

      <div className="text-center relative z-10">
        {/* Logo Section */}
        <div className="mb-8 relative">
          {/* Main Logo Container */}
          <div className="relative inline-block">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-white rounded-full p-4 shadow-2xl animate-pulse-slow">
              <img
                src="https://eminenceextensions.com/old/wp-content/uploads/2025/05/cropped-Untitled-design-3-e1747465790837.png"
                alt="Eminence Hair Co. Logo"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-muted-coral to-burnt-orange rounded-full flex items-center justify-center animate-bounce">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-golden-yellow to-muted-coral rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Sparkles className="w-3 h-3 text-soft-black" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-warm-beige mb-2 animate-fade-in">
            Eminence Hair Co.
          </h1>
          <p className="text-sm sm:text-base text-gray-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Premium Hair Transformations
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-muted-coral rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-golden-yellow rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-muted-coral rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 sm:w-80 mx-auto">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Loading</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-muted-coral via-golden-yellow to-muted-coral rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-gray-400 text-sm animate-pulse">
          Preparing your beautiful experience...
        </div>
      </div>

      {/* Fade Out Animation */}
      <style jsx>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .fade-out {
          animation: fadeOut 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Preloader;