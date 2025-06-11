import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/collection', label: 'Collection' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-soft-black bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-white p-1 group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://eminenceextensions.com/wp-content/uploads/2025/05/cropped-Untitled-design-3-e1747465790837.png"
                alt="Eminence Hair Co. Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-warm-beige group-hover:text-muted-coral transition-colors duration-300">
              Eminence Hair Co.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-muted-coral bg-muted-coral bg-opacity-10'
                    : 'text-warm-beige hover:text-muted-coral hover:bg-muted-coral hover:bg-opacity-10'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/book"
              className="btn-primary"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-warm-beige hover:text-muted-coral transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-soft-black bg-opacity-80 backdrop-blur-md rounded-lg mt-2 border border-white border-opacity-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-muted-coral bg-muted-coral bg-opacity-10'
                      : 'text-warm-beige hover:text-muted-coral hover:bg-muted-coral hover:bg-opacity-10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/book"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center btn-primary mt-4"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;