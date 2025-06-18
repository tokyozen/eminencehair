import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, customer, signOut } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/collection', label: 'Collection' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-soft-black bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full bg-white p-1 group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://eminenceextensions.com/old/wp-content/uploads/2025/05/cropped-Untitled-design-3-e1747465790837.png"
                alt="Eminence Hair Co. Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-warm-beige group-hover:text-muted-coral transition-colors duration-300">
              Eminence Hair Co.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 lg:px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
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
              className="btn-primary text-sm px-4 py-2"
            >
              Book Now
            </Link>
            
            {/* User Menu */}
            {user && customer ? (
              <div className="relative group">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-warm-beige hover:text-muted-coral transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-muted-coral hover:bg-opacity-10"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{customer.first_name}</span>
                </Link>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-warm-beige hover:bg-muted-coral hover:bg-opacity-20 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-warm-beige hover:bg-muted-coral hover:bg-opacity-20 transition-colors flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 text-warm-beige hover:text-muted-coral transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-muted-coral hover:bg-opacity-10"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-warm-beige hover:text-muted-coral transition-colors duration-300 p-2"
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
              
              {/* Mobile User Menu */}
              {user && customer ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full text-center text-warm-beige hover:text-muted-coral transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-muted-coral hover:bg-opacity-10 mt-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard ({customer.first_name})</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center space-x-2 w-full text-center text-warm-beige hover:text-muted-coral transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-muted-coral hover:bg-opacity-10"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full text-center text-warm-beige hover:text-muted-coral transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-muted-coral hover:bg-opacity-10 mt-2"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;