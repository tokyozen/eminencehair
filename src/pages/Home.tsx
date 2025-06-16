import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Crown, Heart, Star, Mail, Gift, Scissors, Clock, DollarSign, Quote } from 'lucide-react';
import BookingForm from '../components/BookingForm';

const Home = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const features = [
    {
      icon: <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-golden-yellow" />,
      title: "Premium Quality",
      description: "100% real human hair that looks natural and feels incredibly soft"
    },
    {
      icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-muted-coral" />,
      title: "Expert Customization",
      description: "Professional bleaching, plucking, and styling for the perfect fit"
    },
    {
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-golden-yellow" />,
      title: "Confidence Boost",
      description: "Transform your look and feel your absolute best every day"
    },
    {
      icon: <Star className="w-6 h-6 sm:w-8 sm:h-8 text-muted-coral" />,
      title: "Ready to Wear",
      description: "Fully customized wigs that are styled and ready for installation"
    }
  ];

  const popularServices = [
    {
      icon: <Scissors className="w-6 h-6 sm:w-8 sm:h-8 text-muted-coral" />,
      name: "Wig Install + Styling",
      price: "$80",
      duration: "3-4 hours",
      description: "Complete installation with custom styling",
      popular: true
    },
    {
      icon: <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-golden-yellow" />,
      name: "Basic Wig Customization",
      price: "$55",
      duration: "4-6 hours",
      description: "Bleaching, plucking, and glueless prep",
      popular: false
    },
    {
      icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-muted-coral" />,
      name: "Reinstalls",
      price: "$60",
      duration: "2-3 hours",
      description: "For wigs originally installed by us",
      popular: false
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your newsletter service
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://kindredhairandskin.com/wp-content/uploads/2021/07/AdobeStock_269144933.jpeg)'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-soft-black bg-opacity-70"></div>
        </div>
        
        {/* Gradient overlay for additional depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted-coral/10 via-transparent to-golden-yellow/10"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="floating-animation">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-warm-beige animate-slide-up">
              Eminence Hair Co.
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-warm-beige mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up drop-shadow-lg">
            High-quality wigs and bundles that look natural and feel soft. 
            Transform your look with our premium human hair and expert customization.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up">
            <Link to="/collection" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-2xl">
              Shop Collection
            </Link>
            <Link to="/book" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-2xl">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* CEO Introduction Section - Creative Floating Design */}
      <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Floating CEO Photo with Elegant Frame - Hidden on mobile */}
            <div className="absolute top-0 right-0 lg:right-20 z-10 hidden xl:block">
              <div className="relative group">
                <div className="w-64 h-80 lg:w-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://eminenceextensions.com/old/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-11-at-18.51.58.jpeg"
                    alt="CEO of Eminence Hair Co."
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-soft-black/30 via-transparent to-transparent"></div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-6 h-6 lg:w-8 lg:h-8 bg-golden-yellow rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -right-4 w-4 h-4 lg:w-6 lg:h-6 bg-muted-coral rounded-full opacity-60"></div>
                <div className="absolute top-1/2 -left-8 w-3 h-3 lg:w-4 lg:h-4 bg-golden-yellow rounded-full opacity-40"></div>
              </div>
            </div>

            {/* Content */}
            <div className="xl:pr-96">
              <div className="card bg-gradient-to-br from-muted-coral/10 to-golden-yellow/10 backdrop-blur-sm border-2 border-white border-opacity-10">
                <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-muted-coral flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <blockquote className="text-lg sm:text-xl md:text-2xl text-warm-beige font-medium leading-relaxed mb-4">
                      "Every woman deserves to feel beautiful and confident. That's why I pour my heart into every wig I customize, ensuring each piece is perfect for the woman who will wear it."
                    </blockquote>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-muted-coral xl:hidden">
                        <img
                          src="https://eminenceextensions.com/old/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-11-at-18.51.58.jpeg"
                          alt="CEO of Eminence Hair Co."
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-muted-coral font-semibold text-base sm:text-lg">Founder & CEO</p>
                        <p className="text-gray-300 text-sm sm:text-base">Eminence Hair Co.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-muted-coral mb-1">500+</div>
                    <div className="text-gray-300 text-xs sm:text-sm">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-golden-yellow mb-1">3+</div>
                    <div className="text-gray-300 text-xs sm:text-sm">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-muted-coral mb-1">100%</div>
                    <div className="text-gray-300 text-xs sm:text-sm">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">Featured Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                image: "https://eminenceextensions.com/old/wp-content/uploads/2025/05/780c71b2-7749-454f-95b6-66ada0d324e7.jpg",
                title: "Body Wave Collection",
                description: "Luxurious body wave texture for effortless elegance"
              },
              {
                image: "https://eminenceextensions.com/old/wp-content/uploads/2025/05/4928a5b9-be1f-4d6e-9bdb-927a8f2afa9b.jpg",
                title: "Straight Hair Bundles",
                description: "Sleek and smooth straight hair for a classic look"
              },
              {
                image: "https://eminenceextensions.com/old/wp-content/uploads/2025/05/ca7ef7cb-f5f7-4f21-be43-bd3b9c7725e9.jpg",
                title: "Exotic Curly Wigs",
                description: "Beautiful curls that add volume and personality"
              }
            ].map((product, index) => (
              <div key={index} className="card hover:scale-105 transition-transform duration-300 group">
                <div className="aspect-square overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-warm-beige group-hover:text-muted-coral transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">{product.description}</p>
                <Link 
                  to="/collection" 
                  className="text-muted-coral hover:text-burnt-orange font-medium transition-colors text-sm sm:text-base"
                >
                  View Collection →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-slider3-background-img.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-85"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="section-title">Our Services</h2>
            <p className="text-lg sm:text-xl text-warm-beige max-w-3xl mx-auto">
              Professional wig installation and customization services designed to make you look and feel amazing
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {popularServices.map((service, index) => (
              <div key={index} className="relative group">
                {service.popular && (
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10">
                    <div className="bg-gradient-to-r from-muted-coral to-burnt-orange text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`card h-full hover:scale-105 transition-all duration-300 ${
                  service.popular 
                    ? 'bg-gradient-to-br from-muted-coral/10 to-golden-yellow/10 border-2 border-muted-coral border-opacity-30' 
                    : 'bg-gray-800 bg-opacity-70 backdrop-blur-sm'
                }`}>
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="mb-3 sm:mb-4 flex justify-center">
                      <div className={`p-3 sm:p-4 rounded-full ${
                        service.popular 
                          ? 'bg-muted-coral bg-opacity-20' 
                          : 'bg-golden-yellow bg-opacity-20'
                      }`}>
                        {service.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-warm-beige group-hover:text-muted-coral transition-colors">
                      {service.name}
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-4 mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                      <div className="flex items-center justify-center text-xl sm:text-2xl font-bold text-muted-coral">
                        <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 mr-1" />
                        {service.price.replace('$', '')}
                      </div>
                      <div className="flex items-center justify-center text-xs sm:text-sm text-gray-400">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {service.duration}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Features */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="card bg-gray-800 bg-opacity-70 backdrop-blur-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-warm-beige flex items-center">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-golden-yellow mr-3" />
                What's Included
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Professional consultation",
                  "Expert wig preparation",
                  "Precise installation technique",
                  "Custom styling (where applicable)",
                  "Aftercare instructions"
                ].map((item, index) => (
                  <li key={index} className="text-gray-300 flex items-center text-sm sm:text-base">
                    <div className="w-2 h-2 bg-muted-coral rounded-full mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card bg-gray-800 bg-opacity-70 backdrop-blur-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-warm-beige flex items-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-muted-coral mr-3" />
                Why Choose Us
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "100% human hair quality",
                  "Expert customization process",
                  "Professional installation",
                  "Ready-to-wear results",
                  "Satisfaction guaranteed"
                ].map((item, index) => (
                  <li key={index} className="text-gray-300 flex items-center text-sm sm:text-base">
                    <div className="w-2 h-2 bg-golden-yellow rounded-full mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <div className="inline-block">
              <Link 
                to="/services" 
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-warm-beige bg-gradient-to-r from-muted-coral to-burnt-orange rounded-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  View All Services & Pricing
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange to-muted-coral rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mt-4">
              All prices reflect our current soft launch rates
            </p>
          </div>
        </div>
      </section>

      {/* Features Section with Background Image */}
      <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-parallax-1.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-85"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="section-title">Why Choose Eminence Hair?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform duration-300 bg-gray-800 bg-opacity-70 backdrop-blur-sm">
                <div className="mb-3 sm:mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-warm-beige">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <div id="booking">
        <BookingForm 
          title="Book Your Transformation"
          subtitle="Ready to look and feel amazing? Let's create your perfect look together!"
        />
      </div>

      {/* CTA Section with Background Image */}
      <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-slider2-background-img.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-80"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-warm-beige drop-shadow-lg">
            Ready to Feel Confident and Cute?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 drop-shadow-lg">
            Join hundreds of satisfied customers who trust Eminence Hair Co. for their hair transformation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/services" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-2xl">
              View Services & Pricing
            </Link>
            <Link to="/about" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-2xl">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-16 sm:py-20 px-4 bg-gray-900 bg-opacity-50">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-muted-coral/20 to-golden-yellow/20 border-2 border-muted-coral border-opacity-30">
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="bg-muted-coral bg-opacity-20 p-3 sm:p-4 rounded-full">
                  <Mail className="w-8 h-8 sm:w-12 sm:h-12 text-muted-coral" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-warm-beige">
                Stay in the Loop
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto">
                Be the first to know about new arrivals, exclusive offers, hair care tips, 
                and special promotions. Join our VIP list today!
              </p>
            </div>

            <div className="max-w-md mx-auto mb-6 sm:mb-8">
              {!isSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-600 rounded-lg text-warm-beige placeholder-gray-400 focus:border-muted-coral focus:ring-2 focus:ring-muted-coral focus:ring-opacity-20 outline-none transition-all duration-300 text-sm sm:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary whitespace-nowrap px-6 sm:px-8 py-2 sm:py-3 flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="bg-green-600 bg-opacity-20 border border-green-500 border-opacity-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">Thank you for subscribing!</span>
                  </div>
                  <p className="text-green-300 text-xs sm:text-sm mt-2">
                    Welcome to the Eminence Hair family! Check your inbox for a special welcome offer.
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-golden-yellow" />
                <span>Exclusive Offers</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-muted-coral" />
                <span>New Product Alerts</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-golden-yellow" />
                <span>Hair Care Tips</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4 sm:mt-6">
              We respect your privacy. Unsubscribe at any time. No spam, just beautiful hair inspiration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;