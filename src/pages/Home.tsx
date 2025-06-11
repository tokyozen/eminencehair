import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Crown, Heart, Star, Mail, Gift } from 'lucide-react';
import BookingForm from '../components/BookingForm';

const Home = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const features = [
    {
      icon: <Crown className="w-8 h-8 text-golden-yellow" />,
      title: "Premium Quality",
      description: "100% real human hair that looks natural and feels incredibly soft"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-muted-coral" />,
      title: "Expert Customization",
      description: "Professional bleaching, plucking, and styling for the perfect fit"
    },
    {
      icon: <Heart className="w-8 h-8 text-golden-yellow" />,
      title: "Confidence Boost",
      description: "Transform your look and feel your absolute best every day"
    },
    {
      icon: <Star className="w-8 h-8 text-muted-coral" />,
      title: "Ready to Wear",
      description: "Fully customized wigs that are styled and ready for installation"
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
      <section className="relative py-32 px-4 overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/wp-content/uploads/2025/05/h1-slider3-background-img.jpg)'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-soft-black bg-opacity-70"></div>
        </div>
        
        {/* Gradient overlay for additional depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted-coral/10 via-transparent to-golden-yellow/10"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="floating-animation">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-muted-coral via-golden-yellow to-muted-coral bg-clip-text text-transparent animate-slide-up">
              Eminence Hair Co.
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-warm-beige mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up drop-shadow-lg">
            High-quality wigs and bundles that look natural and feel soft. 
            Transform your look with our premium human hair and expert customization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/collection" className="btn-primary text-lg px-8 py-4 shadow-2xl">
              Shop Collection
            </Link>
            <a href="#booking" className="btn-secondary text-lg px-8 py-4 shadow-2xl">
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://eminenceextensions.com/wp-content/uploads/2025/05/780c71b2-7749-454f-95b6-66ada0d324e7.jpg",
                title: "Body Wave Collection",
                description: "Luxurious body wave texture for effortless elegance"
              },
              {
                image: "https://eminenceextensions.com/wp-content/uploads/2025/05/4928a5b9-be1f-4d6e-9bdb-927a8f2afa9b.jpg",
                title: "Straight Hair Bundles",
                description: "Sleek and smooth straight hair for a classic look"
              },
              {
                image: "https://eminenceextensions.com/wp-content/uploads/2025/05/ca7ef7cb-f5f7-4f21-be43-bd3b9c7725e9.jpg",
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
                <h3 className="text-xl font-semibold mb-2 text-warm-beige group-hover:text-muted-coral transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-300 mb-4">{product.description}</p>
                <Link 
                  to="/collection" 
                  className="text-muted-coral hover:text-burnt-orange font-medium transition-colors"
                >
                  View Collection →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Background Image */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/wp-content/uploads/2025/05/h1-parallax-1.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-85"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="section-title">Why Choose Eminence Hair?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform duration-300 bg-gray-800 bg-opacity-70 backdrop-blur-sm">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-warm-beige">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
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
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/wp-content/uploads/2025/05/h1-slider2-background-img.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-80"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-warm-beige drop-shadow-lg">
            Ready to Feel Confident and Cute?
          </h2>
          <p className="text-xl text-gray-300 mb-8 drop-shadow-lg">
            Join hundreds of satisfied customers who trust Eminence Hair Co. for their hair transformation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-primary text-lg px-8 py-4 shadow-2xl">
              View Services & Pricing
            </Link>
            <Link to="/about" className="btn-secondary text-lg px-8 py-4 shadow-2xl">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 px-4 bg-gray-900 bg-opacity-50">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-muted-coral/20 to-golden-yellow/20 border-2 border-muted-coral border-opacity-30">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-muted-coral bg-opacity-20 p-4 rounded-full">
                  <Mail className="w-12 h-12 text-muted-coral" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-warm-beige">
                Stay in the Loop
              </h2>
              <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                Be the first to know about new arrivals, exclusive offers, hair care tips, 
                and special promotions. Join our VIP list today!
              </p>
            </div>

            <div className="max-w-md mx-auto mb-8">
              {!isSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-warm-beige placeholder-gray-400 focus:border-muted-coral focus:ring-2 focus:ring-muted-coral focus:ring-opacity-20 outline-none transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary whitespace-nowrap px-8 py-3 flex items-center justify-center gap-2"
                  >
                    <Gift className="w-5 h-5" />
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="bg-green-600 bg-opacity-20 border border-green-500 border-opacity-50 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">Thank you for subscribing!</span>
                  </div>
                  <p className="text-green-300 text-sm mt-2">
                    Welcome to the Eminence Hair family! Check your inbox for a special welcome offer.
                  </p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Sparkles className="w-4 h-4 text-golden-yellow" />
                <span>Exclusive Offers</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Crown className="w-4 h-4 text-muted-coral" />
                <span>New Product Alerts</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Heart className="w-4 h-4 text-golden-yellow" />
                <span>Hair Care Tips</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-6">
              We respect your privacy. Unsubscribe at any time. No spam, just beautiful hair inspiration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;