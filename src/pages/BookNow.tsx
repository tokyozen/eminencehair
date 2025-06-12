import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, DollarSign, CheckCircle, Star, Heart, Crown } from 'lucide-react';

const BookNow = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const serviceCategories = [
    {
      id: 'installation',
      name: 'Installation Services',
      icon: <Crown className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: 'Professional wig installation',
      color: 'from-golden-yellow to-burnt-orange'
    },
    {
      id: 'customization',
      name: 'Customization',
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: 'Wig preparation and customization',
      color: 'from-muted-coral to-golden-yellow'
    },
    {
      id: 'reinstall',
      name: 'Reinstall Services',
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: 'Reinstallation for existing clients',
      color: 'from-golden-yellow to-muted-coral'
    }
  ];

  const services = {
    'installation': [
      {
        id: 'install-no-styling',
        name: 'Wig Install (No Styling)',
        duration: '2-3 hours',
        price: 75,
        description: 'Professional wig installation without additional styling',
        includes: ['Wig preparation', 'Professional installation', 'Basic blending']
      },
      {
        id: 'install-with-styling',
        name: 'Wig Install + Styling',
        duration: '3-4 hours',
        price: 80,
        description: 'Complete installation with custom styling',
        includes: ['Wig preparation', 'Professional installation', 'Custom styling', 'Final touch-ups']
      }
    ],
    'customization': [
      {
        id: 'frontal-customization',
        name: 'Frontal Wig Customization',
        duration: '4-6 hours',
        price: 55,
        description: 'Bleaching and plucking of the lace only',
        includes: ['Bleaching knots', 'Plucking hairline', 'Parting creation', 'Glueless prep']
      },
      {
        id: 'closure-customization',
        name: 'Closure Wig Customization',
        duration: '3-4 hours',
        price: 55,
        description: 'Complete closure wig preparation',
        includes: ['Bleaching knots', 'Plucking hairline', 'Basic styling', 'Glueless prep']
      }
    ],
    'reinstall': [
      {
        id: 'reinstall-service',
        name: 'Reinstall Service',
        duration: '2-3 hours',
        price: 60,
        description: 'For wigs originally installed by us',
        includes: ['Takedown', 'Re-braid', 'Reapplication', 'Light styling']
      }
    ]
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedService(null);
    setCurrentStep(2);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedCategory(null);
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setSelectedService(null);
    }
  };

  const getCurrentService = () => {
    if (!selectedCategory || !selectedService) return null;
    return services[selectedCategory as keyof typeof services]?.find(s => s.id === selectedService);
  };

  return (
    <div className="min-h-screen bg-soft-black">
      {/* Header with Background */}
      <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://kindredhairandskin.com/wp-content/uploads/2021/07/AdobeStock_269144933.jpeg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-80"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-warm-beige drop-shadow-lg">
            Book Your Appointment
          </h1>
          <p className="text-lg sm:text-xl text-warm-beige max-w-2xl mx-auto drop-shadow-lg">
            Select your service below and let's create your perfect look together
          </p>
        </div>
      </section>

      <div className="py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8 sm:mb-12">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                currentStep >= 1 ? 'bg-muted-coral text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                1
              </div>
              <div className={`w-8 sm:w-16 h-1 ${currentStep >= 2 ? 'bg-muted-coral' : 'bg-gray-700'}`}></div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                currentStep >= 2 ? 'bg-muted-coral text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                2
              </div>
              <div className={`w-8 sm:w-16 h-1 ${currentStep >= 3 ? 'bg-muted-coral' : 'bg-gray-700'}`}></div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                currentStep >= 3 ? 'bg-muted-coral text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                3
              </div>
            </div>
          </div>

          {/* Step 1: Category Selection */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-warm-beige mb-4 flex items-center justify-center">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-muted-coral mr-3" />
                  Select Category
                </h2>
                <p className="text-gray-300 text-sm sm:text-base">Choose the type of service you're looking for</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="group relative overflow-hidden rounded-xl p-4 sm:p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 hover:border-muted-coral transition-all duration-300 hover:scale-105 text-left"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20`}>
                          {category.icon}
                        </div>
                        <div className="bg-golden-yellow text-soft-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          SELECT
                        </div>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-semibold text-warm-beige mb-2 group-hover:text-muted-coral transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Service Selection */}
          {currentStep === 2 && selectedCategory && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6 sm:mb-8">
                <button
                  onClick={handleBack}
                  className="mr-3 sm:mr-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-warm-beige" />
                </button>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-warm-beige mb-1 sm:mb-2 flex items-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-muted-coral mr-3" />
                    Select Appointment
                  </h2>
                  <p className="text-muted-coral font-medium text-sm sm:text-base">
                    {serviceCategories.find(c => c.id === selectedCategory)?.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {services[selectedCategory as keyof typeof services]?.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className="group w-full text-left p-4 sm:p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 hover:border-muted-coral rounded-xl transition-all duration-300 hover:scale-102"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-warm-beige mb-2 group-hover:text-muted-coral transition-colors">
                          {service.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-400 mb-3 space-y-1 sm:space-y-0">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.duration}
                          </div>
                          <div className="flex items-center text-muted-coral font-semibold">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {service.price}.00
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{service.description}</p>
                      </div>
                      <div className="bg-golden-yellow text-soft-black px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm font-semibold self-start sm:ml-4">
                        SELECT
                      </div>
                    </div>

                    <div>
                      <h4 className="text-golden-yellow font-medium mb-2 text-sm">This Service Includes:</h4>
                      <div className="grid sm:grid-cols-2 gap-1 sm:gap-2">
                        {service.includes.map((item, index) => (
                          <div key={index} className="flex items-center text-gray-300 text-xs sm:text-sm">
                            <CheckCircle className="w-3 h-3 text-muted-coral mr-2 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Booking Form */}
          {currentStep === 3 && selectedService && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6 sm:mb-8">
                <button
                  onClick={handleBack}
                  className="mr-3 sm:mr-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-warm-beige" />
                </button>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-warm-beige mb-1 sm:mb-2">Complete Your Booking</h2>
                  <p className="text-muted-coral font-medium text-sm sm:text-base">
                    {getCurrentService()?.name} - ${getCurrentService()?.price}
                  </p>
                </div>
              </div>

              {/* Service Summary */}
              <div className="card mb-6 sm:mb-8 bg-gradient-to-br from-muted-coral/10 to-golden-yellow/10 border-2 border-muted-coral border-opacity-30">
                <h3 className="text-lg font-semibold text-warm-beige mb-4">Service Summary</h3>
                <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Service</p>
                    <p className="text-warm-beige font-medium text-sm sm:text-base">{getCurrentService()?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Duration</p>
                    <p className="text-warm-beige font-medium text-sm sm:text-base">{getCurrentService()?.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Price</p>
                    <p className="text-muted-coral font-bold text-lg">${getCurrentService()?.price}.00</p>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="card">
                <form className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-warm-beige">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="input-field"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-warm-beige">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        className="input-field"
                        placeholder="(204) 825-8526"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-warm-beige">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="input-field"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-warm-beige">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        className="input-field"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-warm-beige">
                        Preferred Time *
                      </label>
                      <select required className="input-field">
                        <option value="">Select a time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-warm-beige">
                      Additional Notes
                    </label>
                    <textarea
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Any special requests or questions?"
                    />
                  </div>

                  <div className="bg-golden-yellow bg-opacity-10 rounded-lg p-3 sm:p-4 border border-golden-yellow border-opacity-30">
                    <p className="text-xs sm:text-sm text-golden-yellow font-medium">
                      <strong>Important:</strong> Please read our booking policies before submitting. 
                      We require 24-hour advance notice for rescheduling and have specific requirements for wig drop-offs.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-base sm:text-lg py-3 sm:py-4 shadow-2xl"
                  >
                    Complete Booking Request
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Powered by Footer */}
      <div className="text-center py-6 sm:py-8 border-t border-gray-800">
        <p className="text-gray-400 text-xs sm:text-sm mb-2">Powered by</p>
        <p className="text-warm-beige font-semibold text-sm sm:text-base">Eminence Hair Co. Booking System</p>
      </div>
    </div>
  );
};

export default BookNow;