import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, Package, Heart, Star } from 'lucide-react';
import { signIn, signUp } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, customer, loading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user && customer) {
      console.log('User already authenticated, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [user, customer, authLoading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (!isLogin) {
      if (!formData.firstName || !formData.lastName) {
        setError('First name and last name are required');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (isLogin) {
        // Sign in existing user
        console.log('Attempting to sign in user:', formData.email);
        await signIn(formData.email, formData.password);
        
        setSuccess('Successfully signed in! Redirecting...');
        
        // Redirect will happen via useEffect when auth state changes
        
      } else {
        // Create new account
        console.log('Attempting to create new user:', formData.email);
        await signUp(formData.email, formData.password, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        });
        console.log('User created successfully');
        
        setSuccess('Account created successfully! Please check your email to verify your account, then sign in.');
        
        // Switch to login mode
        setIsLogin(true);
        setFormData({
          ...formData,
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          phone: ''
        });
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: <Calendar className="w-5 h-5 text-muted-coral" />,
      title: "Track Appointments",
      description: "View upcoming and past appointments with detailed service information"
    },
    {
      icon: <Package className="w-5 h-5 text-golden-yellow" />,
      title: "Order History",
      description: "Access your complete purchase history and reorder favorite items"
    },
    {
      icon: <Heart className="w-5 h-5 text-muted-coral" />,
      title: "Wishlist & Favorites",
      description: "Save products you love and get notified when they're back in stock"
    },
    {
      icon: <Star className="w-5 h-5 text-golden-yellow" />,
      title: "Exclusive Offers",
      description: "Get early access to sales and member-only discounts"
    }
  ];

  // Show loading only while auth is initially loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-soft-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted-coral border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-warm-beige">Loading...</p>
        </div>
      </div>
    );
  }

  // If already authenticated, show redirect message
  if (user && customer) {
    return (
      <div className="min-h-screen bg-soft-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted-coral border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-warm-beige">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://kindredhairandskin.com/wp-content/uploads/2021/07/AdobeStock_269144933.jpeg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-80"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-warm-beige drop-shadow-lg">
              {isLogin ? 'Welcome Back' : 'Join Our Family'}
            </h1>
            <p className="text-lg sm:text-xl text-warm-beige max-w-2xl mx-auto drop-shadow-lg">
              {isLogin 
                ? 'Access your account to manage appointments, track orders, and more'
                : 'Create your account to unlock exclusive benefits and personalized service'
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Login/Register Form */}
            <div className="card bg-gray-800 bg-opacity-90 backdrop-blur-sm border-2 border-white border-opacity-10">
              <div className="mb-6">
                <div className="flex bg-gray-700 bg-opacity-50 rounded-lg p-1 mb-6">
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setError(null);
                      setSuccess(null);
                    }}
                    className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                      isLogin 
                        ? 'bg-muted-coral text-white shadow-lg' 
                        : 'text-gray-300 hover:text-warm-beige'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setError(null);
                      setSuccess(null);
                    }}
                    className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                      !isLogin 
                        ? 'bg-muted-coral text-white shadow-lg' 
                        : 'text-gray-300 hover:text-warm-beige'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-600 bg-opacity-20 border border-green-500 border-opacity-50 rounded-lg">
                  <p className="text-green-400 text-sm">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-warm-beige">
                        <User className="inline w-4 h-4 mr-2" />
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className="input-field"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-warm-beige">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className="input-field"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2 text-warm-beige">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-warm-beige">
                      <Phone className="inline w-4 h-4 mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="(204) 825-8526"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2 text-warm-beige">
                    <Lock className="inline w-4 h-4 mr-2" />
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="input-field pr-12"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-warm-beige transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-warm-beige">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="input-field"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-600 text-muted-coral focus:ring-muted-coral focus:ring-opacity-25" />
                      <span className="ml-2 text-sm text-gray-300">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-muted-coral hover:text-burnt-orange transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>

                {!isLogin && (
                  <div className="text-xs text-gray-400 text-center">
                    By creating an account, you agree to our{' '}
                    <Link to="/terms" className="text-muted-coral hover:text-burnt-orange">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-muted-coral hover:text-burnt-orange">Privacy Policy</Link>
                  </div>
                )}
              </form>
            </div>

            {/* Benefits Section */}
            <div className="space-y-6">
              <div className="card bg-gradient-to-br from-muted-coral/10 to-golden-yellow/10 border-2 border-muted-coral border-opacity-30">
                <h3 className="text-2xl font-bold text-warm-beige mb-6 text-center">
                  Member Benefits
                </h3>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-warm-beige mb-2">{benefit.title}</h4>
                        <p className="text-gray-300 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card text-center bg-gray-800 bg-opacity-70">
                  <div className="text-2xl font-bold text-muted-coral mb-1">500+</div>
                  <div className="text-gray-300 text-sm">Happy Members</div>
                </div>
                <div className="card text-center bg-gray-800 bg-opacity-70">
                  <div className="text-2xl font-bold text-golden-yellow mb-1">24/7</div>
                  <div className="text-gray-300 text-sm">Account Access</div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="card bg-gray-800 bg-opacity-70">
                <h4 className="font-semibold text-warm-beige mb-3">Need Help?</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Our customer support team is here to help you with any questions about your account or services.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+12048258526" className="btn-secondary text-sm py-2 px-4 text-center">
                    Call Support
                  </a>
                  <a href="mailto:eihu335@gmail.com" className="btn-primary text-sm py-2 px-4 text-center">
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;