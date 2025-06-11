import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-24 left-4 sm:left-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-golden-yellow to-muted-coral rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 text-soft-black group-hover:scale-110 transition-transform duration-300" />
          
          {/* Pulse animation ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-golden-yellow to-muted-coral opacity-30 animate-ping"></div>
          
          {/* Hover tooltip */}
          <div className="absolute right-full mr-3 px-3 py-1 bg-soft-black bg-opacity-90 text-warm-beige text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Back to top
            <div className="absolute top-1/2 left-full w-0 h-0 border-l-4 border-l-soft-black border-t-2 border-b-2 border-t-transparent border-b-transparent transform -translate-y-1/2"></div>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;