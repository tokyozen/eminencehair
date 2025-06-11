import React from 'react';
import { Clock, DollarSign, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const mainServices = [
    {
      name: "Wig Install (No Styling)",
      price: "$75",
      description: "Professional wig installation without additional styling",
      duration: "2-3 hours",
      includes: ["Wig preparation", "Professional installation", "Basic blending"]
    },
    {
      name: "Wig Install + Styling",
      price: "$80",
      description: "Complete wig installation with custom styling (curls, crimps, etc.)",
      duration: "3-4 hours",
      includes: ["Wig preparation", "Professional installation", "Custom styling", "Final touch-ups"]
    },
    {
      name: "Reinstalls",
      price: "$60",
      description: "Reinstallation service for wigs originally installed by us",
      duration: "2-3 hours",
      includes: ["Takedown", "Re-braid", "Reapplication", "Light styling"]
    },
    {
      name: "Basic Wig Customization",
      price: "$55",
      description: "Complete wig preparation service",
      duration: "4-6 hours",
      includes: ["Bleaching the knots", "Plucking the hairline", "Parting (middle or side)", "Glueless preparation"]
    },
    {
      name: "Glueless Wig Units",
      price: "Contact for pricing",
      description: "Custom-made glueless wig units crafted by our expert",
      duration: "1-2 weeks",
      includes: ["Custom consultation", "Professional construction", "Full customization", "Perfect fit guarantee"]
    }
  ];

  const additionalFees = [
    { service: "Same-day appointment", fee: "$50", note: "Fees do not go toward service total" },
    { service: "Squeeze-in appointment", fee: "$25", note: "DM to check availability before booking" },
    { service: "Same-day drop-off", fee: "$20", note: "Wig must be dropped off 3-5 days in advance normally" },
    { service: "Hair blow drying", fee: "$10", note: "If hair is not washed and blow-dried upon arrival" },
    { service: "Late arrival (10+ minutes)", fee: "$10", note: "10-minute grace period, after 15 mins appointment may be canceled" }
  ];

  const wigPricing = [
    {
      category: "13x6 HD Lace Wigs - 180% Density",
      description: "Body Wave & Straight",
      prices: [
        { length: "18\"", price: 271 },
        { length: "20\"", price: 290 },
        { length: "22\"", price: 328 },
        { length: "24\"", price: 341 },
        { length: "26\"", price: 373 },
        { length: "28\"", price: 393 },
        { length: "30\"", price: 438 }
      ]
    },
    {
      category: "13x6 HD Lace Deep Wave - 180% Density",
      description: "Deep Wave Texture",
      prices: [
        { length: "18\"", price: 281 },
        { length: "20\"", price: 300 },
        { length: "22\"", price: 338 },
        { length: "24\"", price: 351 },
        { length: "26\"", price: 383 },
        { length: "28\"", price: 403 },
        { length: "30\"", price: 448 }
      ]
    },
    {
      category: "13x4 HD Lace Wigs - 180% Density",
      description: "Classic Lace Frontal",
      prices: [
        { length: "20\"", price: 268 },
        { length: "24\"", price: 315 },
        { length: "26\"", price: 351 },
        { length: "28\"", price: 393 },
        { length: "30\"", price: 423 }
      ]
    }
  ];

  const requirements = [
    {
      title: "Wig Requirements",
      icon: <CheckCircle className="w-6 h-6 text-muted-coral" />,
      items: [
        "Wig must be new",
        "HD or transparent lace only",
        "Drop off 3-5 days before appointment",
        "No thick lace, reused lace, or pre-cut lace",
        "No synthetic wigs accepted"
      ]
    },
    {
      title: "Arrival Requirements",
      icon: <Info className="w-6 h-6 text-golden-yellow" />,
      items: [
        "Come with real hair washed and blow-dried",
        "No oils or heavy products in hair",
        "Braided hair okay if flat and fresh",
        "No extra guests unless pre-discussed",
        "Be ready for braid-down for faster service"
      ]
    },
    {
      title: "Important Policies",
      icon: <AlertTriangle className="w-6 h-6 text-muted-coral" />,
      items: [
        "24-hour advance notice required for rescheduling",
        "No-calls/no-shows may be blocked from future bookings",
        "Only install wigs customized by us",
        "Reinstalls only for wigs originally installed by us",
        "All policies must be read before booking"
      ]
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Background Image */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/wp-content/uploads/2025/05/h1-slider2-background-img.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="section-title">Services & Pricing</h1>
          <p className="text-xl text-warm-beige max-w-3xl mx-auto drop-shadow-lg">
            Professional wig installation and customization services with transparent pricing. 
            All prices reflect our current soft launch rates.
          </p>
        </div>
      </section>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Services */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-warm-beige">Installation Services</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {mainServices.map((service, index) => (
                <div key={index} className="card hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-warm-beige">{service.name}</h3>
                    <span className="text-2xl font-bold text-muted-coral">{service.price}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{service.duration}</span>
                  </div>
                  <div>
                    <h4 className="text-golden-yellow font-medium mb-2">Includes:</h4>
                    <ul className="space-y-1">
                      {service.includes.map((item, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-center">
                          <CheckCircle className="w-3 h-3 text-muted-coral mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Fees with Background */}
          <div className="relative mb-20 overflow-hidden rounded-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: 'url(https://eminenceextensions.com/wp-content/uploads/2025/05/h1-parallax-1.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-soft-black bg-opacity-90"></div>
            </div>
            
            <div className="relative z-10 p-8">
              <h2 className="text-3xl font-bold text-center mb-12 text-warm-beige">Additional Fees</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalFees.map((fee, index) => (
                  <div key={index} className="card bg-gray-800 bg-opacity-80 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-warm-beige">{fee.service}</h3>
                      <span className="text-lg font-bold text-muted-coral">{fee.fee}</span>
                    </div>
                    <p className="text-sm text-gray-300">{fee.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wig Pricing */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-warm-beige">Wig Pricing</h2>
            <div className="space-y-8">
              {wigPricing.map((category, index) => (
                <div key={index} className="card">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-warm-beige mb-2">{category.category}</h3>
                    <p className="text-gray-300">{category.description}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {category.prices.map((item, idx) => (
                      <div key={idx} className="bg-gray-800 bg-opacity-50 rounded-lg p-3 text-center">
                        <div className="text-sm text-gray-400 mb-1">{item.length}</div>
                        <div className="text-lg font-bold text-muted-coral">${item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements & Policies */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-warm-beige">Requirements & Policies</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {requirements.map((req, index) => (
                <div key={index} className="card">
                  <div className="flex items-center mb-4">
                    {req.icon}
                    <h3 className="text-lg font-semibold ml-3 text-warm-beige">{req.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {req.items.map((item, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex items-start">
                        <div className="w-1.5 h-1.5 bg-muted-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section with New Background */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(https://kindredhairandskin.com/wp-content/uploads/2021/07/AdobeStock_269144933.jpeg)'
              }}
            >
              <div className="absolute inset-0 bg-soft-black bg-opacity-75"></div>
            </div>
            
            <div className="relative z-10 card text-center bg-gradient-to-r from-muted-coral/10 to-golden-yellow/10 backdrop-blur-sm border-2 border-white border-opacity-10">
              <h2 className="text-3xl font-bold mb-6 text-warm-beige drop-shadow-lg">Ready to Book Your Service?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto drop-shadow-lg">
                Have questions about our services or want to schedule an appointment? 
                Contact us today to discuss your hair transformation needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book" className="btn-primary text-lg px-8 py-4 shadow-2xl">
                  Book Appointment
                </Link>
                <Link to="/contact" className="btn-secondary text-lg px-8 py-4 shadow-2xl">
                  Ask Questions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;