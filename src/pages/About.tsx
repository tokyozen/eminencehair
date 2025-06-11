import React from 'react';
import { Heart, Award, Users, Sparkles } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="w-8 h-8 text-muted-coral" />, number: "500+", label: "Happy Clients" },
    { icon: <Award className="w-8 h-8 text-golden-yellow" />, number: "3+", label: "Years Experience" },
    { icon: <Sparkles className="w-8 h-8 text-muted-coral" />, number: "100%", label: "Human Hair" },
    { icon: <Heart className="w-8 h-8 text-golden-yellow" />, number: "100%", label: "Satisfaction" }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We use only the finest 100% human hair that looks natural and feels incredibly soft. Every strand is carefully selected for its quality and durability.",
      icon: <Award className="w-12 h-12 text-golden-yellow" />
    },
    {
      title: "Expert Craftsmanship",
      description: "Our skilled customization process includes professional bleaching, precise plucking, and expert styling to ensure your wig is ready to wear and perfectly fits your style.",
      icon: <Sparkles className="w-12 h-12 text-muted-coral" />
    },
    {
      title: "Customer Care",
      description: "Your satisfaction is our priority. We provide detailed consultations, clear policies, and ongoing support to ensure you love your new look.",
      icon: <Heart className="w-12 h-12 text-golden-yellow" />
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Parallax Background */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/wp-content/uploads/2025/05/h1-parallax-1.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-75"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="section-title">About Eminence Hair Co.</h1>
          <p className="text-xl text-warm-beige max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            We're passionate about helping you feel confident and beautiful with premium quality 
            wigs and professional customization services.
          </p>
        </div>
      </section>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Story Section with Background Image */}
          <div className="relative mb-20 overflow-hidden rounded-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://eminenceextensions.com/wp-content/uploads/2025/05/h1-slider2-background-img.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-soft-black bg-opacity-85"></div>
            </div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-warm-beige mb-6">
                  Our Story
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Eminence Hair Co. was born from a simple belief: everyone deserves to feel confident 
                  and beautiful in their own skin. We specialize in high-quality wigs and bundles that 
                  look natural and feel incredibly soft.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  What sets us apart is our commitment to customization. We don't just sell wigs – we 
                  create personalized hair solutions. Every piece goes through our meticulous customization 
                  process, including bleaching, plucking, and styling, so your wig is ready to wear the 
                  moment you put it on.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Whether you're looking for an everyday natural look or something extra special, 
                  Eminence Hair Co. is here to help you transform your look and boost your confidence.
                </p>
              </div>
              <div className="relative group">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-muted-coral/20 to-golden-yellow/20 p-8 flex items-center justify-center">
                  <img
                    src="https://eminenceextensions.com/wp-content/uploads/2025/05/780c71b2-7749-454f-95b6-66ada0d324e7.jpg"
                    alt="Premium Hair Collection"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section with Background */}
          <div className="relative mb-20 overflow-hidden rounded-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30"
              style={{
                backgroundImage: 'url(https://eminenceextensions.com/wp-content/uploads/2025/05/h1-slider3-background-img.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-soft-black bg-opacity-70"></div>
            </div>
            
            <div className="relative z-10 p-12">
              <div className="grid md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="card text-center hover:scale-105 transition-transform duration-300 bg-gray-800 bg-opacity-80 backdrop-blur-sm">
                    <div className="mb-4 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-warm-beige mb-2">{stat.number}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="section-title">Our Values</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="card text-center hover:scale-105 transition-transform duration-300">
                  <div className="mb-6 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-warm-beige">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Makes Us Different with Background */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: 'url(https://eminenceextensions.com/wp-content/uploads/2025/05/h1-parallax-1.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-soft-black bg-opacity-80"></div>
            </div>
            
            <div className="relative z-10 card bg-gradient-to-r from-muted-coral/10 to-golden-yellow/10 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-center mb-8 text-warm-beige">What Makes Us Different?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-muted-coral">100% Human Hair Quality</h3>
                  <p className="text-gray-300 mb-6">
                    We use only premium 100% human hair in textures like Body Wave, Straight, and Exotic Curly. 
                    Our hair is carefully sourced to ensure it looks natural, feels soft, and lasts long.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4 text-muted-coral">Expert Customization</h3>
                  <p className="text-gray-300">
                    Every wig goes through our professional customization process. We handle the bleaching, 
                    plucking, and styling so your wig is perfectly prepared and ready to install.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-golden-yellow">Professional Service</h3>
                  <p className="text-gray-300 mb-6">
                    We maintain high standards with clear policies, proper scheduling, and professional 
                    installation services. Your satisfaction and hair health are our top priorities.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4 text-golden-yellow">Ready-to-Wear Solution</h3>
                  <p className="text-gray-300">
                    Unlike other providers, our wigs come fully customized and styled. You get a 
                    complete hair transformation that's ready to make you look and feel amazing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;