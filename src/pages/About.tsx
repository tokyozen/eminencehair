import React from 'react';
import { Heart, Award, Users, Sparkles, Quote, Crown, Star } from 'lucide-react';

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

  const achievements = [
    {
      icon: <Crown className="w-6 h-6 text-golden-yellow" />,
      title: "Premium Quality Standards",
      description: "Only the finest 100% human hair makes it into our collection"
    },
    {
      icon: <Star className="w-6 h-6 text-muted-coral" />,
      title: "Expert Customization",
      description: "Every wig is professionally customized for the perfect fit"
    },
    {
      icon: <Heart className="w-6 h-6 text-golden-yellow" />,
      title: "Customer Satisfaction",
      description: "Hundreds of happy clients trust us with their hair transformations"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-muted-coral" />,
      title: "Ready-to-Wear Results",
      description: "Fully styled and prepared wigs that are installation-ready"
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Parallax Background */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-parallax-1.jpg)'
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
          {/* CEO Story Section with Dual Photos */}
          <div className="relative mb-20 overflow-hidden rounded-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-slider2-background-img.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-soft-black bg-opacity-85"></div>
            </div>
            
            <div className="relative z-10 p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <Quote className="w-8 h-8 text-muted-coral" />
                    <h2 className="text-3xl md:text-4xl font-bold text-warm-beige">
                      Meet Our Founder
                    </h2>
                  </div>
                  
                  <blockquote className="text-xl text-gray-300 leading-relaxed italic border-l-4 border-muted-coral pl-6 mb-6">
                    "I started Eminence Hair Co. because I believe every woman deserves to feel beautiful and confident. 
                    Hair is more than just an accessory – it's an expression of who you are."
                  </blockquote>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">
                    What began as a passion for helping women feel their best has grown into a business built on 
                    quality, craftsmanship, and genuine care. I personally oversee every customization to ensure 
                    each wig meets our high standards.
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">
                    When you choose Eminence Hair Co., you're not just getting a wig – you're getting a piece 
                    that's been crafted with love, attention to detail, and the goal of making you feel absolutely amazing.
                  </p>

                  {/* Achievement Highlights */}
                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                        <div className="flex-shrink-0 p-2 bg-golden-yellow bg-opacity-20 rounded-lg">
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-warm-beige text-sm mb-1">{achievement.title}</h4>
                          <p className="text-gray-300 text-xs">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* CEO Photos - Creative Collage Style */}
                <div className="relative">
                  <div className="relative group">
                    {/* Main Photo */}
                    <div className="relative z-10 w-80 h-96 mx-auto rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                      <img
                        src="https://eminenceextensions.com/old/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-11-at-18.51.58.jpeg"
                        alt="CEO of Eminence Hair Co."
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-soft-black/20 via-transparent to-transparent"></div>
                    </div>
                    
                    {/* Secondary Photo - Overlapping */}
                    <div className="absolute top-8 -right-8 w-48 h-64 rounded-xl overflow-hidden shadow-xl transform rotate-6 group-hover:rotate-3 transition-transform duration-500 border-4 border-white border-opacity-20">
                      <img
                        src="https://eminenceextensions.com/old/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-11-at-18.51.57.jpeg"
                        alt="CEO working on hair customization"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-muted-coral/20 via-transparent to-transparent"></div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-golden-yellow to-muted-coral rounded-full opacity-80 animate-pulse-slow"></div>
                    <div className="absolute -bottom-4 left-8 w-8 h-8 bg-muted-coral rounded-full opacity-60"></div>
                    <div className="absolute top-1/3 -left-4 w-6 h-6 bg-golden-yellow rounded-full opacity-40"></div>
                    <div className="absolute bottom-1/4 -right-12 w-10 h-10 bg-gradient-to-br from-muted-coral to-burnt-orange rounded-full opacity-70"></div>
                    
                    {/* Floating Text Badge */}
                    <div className="absolute bottom-4 left-4 bg-soft-black bg-opacity-80 backdrop-blur-sm rounded-lg p-3 border border-muted-coral border-opacity-30">
                      <p className="text-muted-coral font-semibold text-sm">Founder & CEO</p>
                      <p className="text-gray-300 text-xs">Eminence Hair Co.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section with Background */}
          <div className="relative mb-20 overflow-hidden rounded-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30"
              style={{
                backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-slider3-background-img.jpg)'
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
                backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-parallax-1.jpg)'
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