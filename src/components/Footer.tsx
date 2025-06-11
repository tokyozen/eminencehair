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
  Sparkles
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

  return (
    <footer className="bg-gray-900 bg-opacity-80 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* About Us Section with Logo */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link to="/" className="flex items-center space-x-3 group mb-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-white p-2 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://eminenceextensions.com/wp-content/uploads/2025/05/cropped-Untitled-design-3-e1747465790837.png"
                    alt="Eminence Hair Co. Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-2xl font-bold text-warm-beige group-hover:text-muted-coral transition-colors duration-300">
                  Eminence Hair Co.
                </span>
              </Link>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Premium quality wigs and professional customization services. We specialize in 100% human hair 
              that looks natural and feels incredibly soft, helping you feel confident and beautiful.
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Crown className="w-4 h-4 text-golden-yellow" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-muted-coral" />
                <span>Expert Care</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-warm-beige mb-6 flex items-center">
              <div className="w-1 h-6 bg-muted-coral rounded-full mr-3"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-muted-coral transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-2 h-2 bg-golden-yellow rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium text-warm-beige mb-4">Our Services</h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-400 text-sm flex items-center">
                    <Heart className="w-3 h-3 text-muted-coral mr-2" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-warm-beige mb-6 flex items-center">
              <div className="w-1 h-6 bg-golden-yellow rounded-full mr-3"></div>
              Contact Info
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-muted-coral mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">(555) 123-4567</p>
                  <p className="text-gray-400 text-sm">Call for appointments</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-golden-yellow mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">hello@eminencehair.com</p>
                  <p className="text-gray-400 text-sm">General inquiries</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Instagram className="w-5 h-5 text-muted-coral mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">@eminencehairco</p>
                  <p className="text-gray-400 text-sm">Follow for updates</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-golden-yellow mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">DM for Consultations</p>
                  <p className="text-gray-400 text-sm">Custom orders & squeeze-ins</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8">
              <h4 className="text-lg font-medium text-warm-beige mb-4 flex items-center">
                <Clock className="w-5 h-5 text-muted-coral mr-2" />
                Business Hours
              </h4>
              <ul className="space-y-2">
                {businessHours.map((hours, index) => (
                  <li key={index} className="text-gray-300 text-sm">
                    {hours}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-warm-beige mb-6 flex items-center">
              <div className="w-1 h-6 bg-muted-coral rounded-full mr-3"></div>
              Visit Our Studio
            </h3>
            
            {/* Map Container */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 mb-6 border border-gray-700">
              <div className="aspect-square bg-gradient-to-br from-muted-coral/20 to-golden-yellow/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-coral mx-auto mb-3" />
                  <p className="text-warm-beige font-medium mb-2">Professional Studio</p>
                  <p className="text-gray-300 text-sm">Convenient Location</p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-3">
                  Located in a clean, comfortable environment designed for your hair transformation experience.
                </p>
                <button className="text-muted-coral hover:text-burnt-orange font-medium text-sm transition-colors duration-300">
                  Get Directions →
                </button>
              </div>
            </div>

            {/* Studio Features */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <div className="w-2 h-2 bg-golden-yellow rounded-full mr-3"></div>
                Professional Environment
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <div className="w-2 h-2 bg-muted-coral rounded-full mr-3"></div>
                Private & Comfortable
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <div className="w-2 h-2 bg-golden-yellow rounded-full mr-3"></div>
                Easy Parking Available
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Eminence Hair Co. All rights reserved. | Crafted with <Heart className="w-4 h-4 text-muted-coral inline mx-1" /> for beautiful hair transformations.
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="/services" className="text-gray-400 hover:text-muted-coral text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/services" className="text-gray-400 hover:text-muted-coral text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-muted-coral text-sm transition-colors duration-300">
                Booking Policies
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-6">
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