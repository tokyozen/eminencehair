import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  MessageCircle, 
  Clock,
  Heart,
  Crown,
  Sparkles,
  ExternalLink,
  Navigation
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hair Collection', path: '/collection' },
    { name: 'About Us', path: '/about' },
    { name: 'Services & Pricing', path: '/services' },
    { name: 'Contact & Booking', path: '/contact' }
  ];

  const services = [
    'Wig Installation',
    'Custom Styling',
    'Wig Customization',
    'Reinstalls',
    'Glueless Units'
  ];

  const businessHours = [
    'Mon-Fri: 9:00 AM - 6:00 PM',
    'Saturday: 10:00 AM - 4:00 PM',
    'Sunday: Closed'
  ];

  // Function to open Google Maps with directions to Lanham, MD
  const openDirections = () => {
    const address = "Lanham, MD 20706, USA";
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  // Function to open location in Google Maps
  const openLocation = () => {
    const address = "Lanham, MD 20706, USA";
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <footer className="bg-gray-900 bg-opacity-80 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          
          {/* About Us Section with Logo */}
          <div className="lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group mb-3 sm:mb-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full bg-white p-2 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://eminenceextensions.com/old/wp-content/uploads/2025/05/cropped-Untitled-design-3-e1747465790837.png"
                    alt="Eminence Hair Co. Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-lg sm:text-2xl font-bold text-warm-beige group-hover:text-muted-coral transition-colors duration-300">
                  Eminence Hair Co.
                </span>
              </Link>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              Premium quality wigs and professional customization services. We specialize in 100% human hair 
              that looks natural and feels incredibly soft, helping you feel confident and beautiful.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-0">
              <div className="flex items-center gap-1">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-golden-yellow" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-muted-coral" />
                <span>Expert Care</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-warm-beige mb-4 sm:mb-6 flex items-center">
              <div className="w-1 h-4 sm:h-6 bg-muted-coral rounded-full mr-3"></div>
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-muted-coral transition-colors duration-300 flex items-center group text-sm sm:text-base"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-golden-yellow rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 sm:mt-8">
              <h4 className="text-base sm:text-lg font-medium text-warm-beige mb-3 sm:mb-4">Our Services</h4>
              <ul className="space-y-1 sm:space-y-2">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-400 text-xs sm:text-sm flex items-center">
                    <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-coral mr-2" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-warm-beige mb-4 sm:mb-6 flex items-center">
              <div className="w-1 h-4 sm:h-6 bg-golden-yellow rounded-full mr-3"></div>
              Contact Info
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-muted-coral mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+12048258526" 
                    className="text-gray-300 hover:text-muted-coral font-medium text-sm sm:text-base transition-colors duration-300"
                  >
                    
                  </a>
                  <p className="text-gray-400 text-xs sm:text-sm">Call for appointments</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-golden-yellow mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="mailto:eihu335@gmail.com" 
                    className="text-gray-300 hover:text-golden-yellow font-medium text-sm sm:text-base transition-colors duration-300"
                  >
                    eihu335@gmail.com
                  </a>
                  <p className="text-gray-400 text-xs sm:text-sm">General inquiries</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-muted-coral mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="https://instagram.com/eminencehairco" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-muted-coral font-medium text-sm sm:text-base transition-colors duration-300 flex items-center"
                  >
                    @eminencehairco
                    <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                  </a>
                  <p className="text-gray-400 text-xs sm:text-sm">Follow for updates</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-golden-yellow mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium text-sm sm:text-base">DM for Consultations</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Custom orders & squeeze-ins</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-base sm:text-lg font-medium text-warm-beige mb-3 sm:mb-4 flex items-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-coral mr-2" />
                Business Hours
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {businessHours.map((hours, index) => (
                  <li key={index} className="text-gray-300 text-xs sm:text-sm">
                    {hours}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-warm-beige mb-4 sm:mb-6 flex items-center">
              <div className="w-1 h-4 sm:h-6 bg-muted-coral rounded-full mr-3"></div>
              Visit Our Studio
            </h3>
            
            {/* Location Info */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-700">
              <div className="text-center mb-4">
                <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-muted-coral mx-auto mb-2 sm:mb-3" />
                <p className="text-warm-beige font-medium mb-1 sm:mb-2 text-sm sm:text-base">Professional Studio</p>
                <p className="text-gray-300 text-xs sm:text-sm">Lanham, MD 20706</p>
              </div>
              
              <p className="text-gray-300 text-xs sm:text-sm mb-4 text-center">
                Located in a clean, comfortable environment designed for your hair transformation experience.
              </p>
              
              {/* Map Action Buttons */}
              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={openDirections}
                  className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-muted-coral hover:bg-burnt-orange text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
                
                <button
                  onClick={openLocation}
                  className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 text-warm-beige rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  <span>View on Google Maps</span>
                </button>
              </div>
            </div>

            {/* Studio Features */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center text-xs sm:text-sm text-gray-300">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-golden-yellow rounded-full mr-3"></div>
                Professional Environment
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-300">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-coral rounded-full mr-3"></div>
                Private & Comfortable
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-300">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-golden-yellow rounded-full mr-3"></div>
                Easy Parking Available
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-300">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-coral rounded-full mr-3"></div>
                Convenient DMV Location
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2025 Eminence Hair Co. All rights reserved. | Crafted with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-muted-coral inline mx-1" /> for beautiful hair transformations.
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link to="/services" className="text-gray-400 hover:text-muted-coral text-xs sm:text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/services" className="text-gray-400 hover:text-muted-coral text-xs sm:text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-muted-coral text-xs sm:text-sm transition-colors duration-300">
                Booking Policies
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-gray-500 text-xs">
              Professional wig installation and customization services. Book your transformation today!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;