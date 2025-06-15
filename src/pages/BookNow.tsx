import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, DollarSign, CheckCircle, Star, Heart, Crown, Plus, Minus } from 'lucide-react';

const BookNow = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
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

  const addOnServices = [
    {
      id: 'jet-black-coloring',
      name: 'Jet Black Coloring',
      price: 75,
      duration: '45 minutes',
      description: 'Professional jet black color application'
    },
    {
      id: 'professional-toning',
      name: 'Professional Toning (Blonde Wigs)',
      price: 75,
      duration: '60 minutes',
      description: 'Color correction and toning for blonde wigs'
    },
    {
      id: 'rush-service',
      name: 'Rush Service (24-72hrs)',
      price: 40,
      duration: 'Priority processing',
      description: 'Expedited service completion'
    },
    {
      id: 'same-day-customization',
      name: 'Same Day Customization',
      price: 45,
      duration: '45 minutes',
      description: 'Same-day wig preparation service'
    },
    {
      id: 'sew-in-bundle',
      name: 'Sew In/Glue in a Bundle',
      price: 30,
      duration: '30 minutes',
      description: 'Additional bundle installation'
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedService(null);
    setCurrentStep(2);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentStep(3);
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedCategory(null);
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setSelectedService(null);
    } else if (currentStep === 4) {
      setCurrentStep(3);
    }
  };

  const handleContinueToDateTime = () => {
    setCurrentStep(4);
  };

  const getCurrentService = () => {
    if (!selectedCategory || !selectedService) return null;
    return services[selectedCategory as keyof typeof services]?.find(s => s.id === selectedService);
  };

  const getSelectedAddOns = () => {
    return addOnServices.filter(addon => selectedAddOns.includes(addon.id));
  };

  const getTotalPrice = () => {
    const basePrice = getCurrentService()?.price || 0;
    const addOnPrice = getSelectedAddOns().reduce((total, addon) => total + addon.price, 0);
    return basePrice + addOnPrice;
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && date.getDay() !== 0; // Not Sunday
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
              <div className={`w-8 sm:w-16 h-1 ${currentStep >= 4 ? 'bg-muted-coral' : 'bg-gray-700'}`}></div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                currentStep >= 4 ? 'bg-muted-coral text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                4
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
                    Select Service
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

          {/* Step 3: Add-ons Selection */}
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
                  <h2 className="text-xl sm:text-2xl font-bold text-warm-beige mb-1 sm:mb-2">Add-On Services</h2>
                  <p className="text-muted-coral font-medium text-sm sm:text-base">
                    Enhance your service with these optional add-ons
                  </p>
                </div>
              </div>

              {/* Service Summary */}
              <div className="card mb-6 sm:mb-8 bg-gradient-to-br from-muted-coral/10 to-golden-yellow/10 border-2 border-muted-coral border-opacity-30">
                <h3 className="text-lg font-semibold text-warm-beige mb-4">Selected Service</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-warm-beige font-medium text-sm sm:text-base">{getCurrentService()?.name}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{getCurrentService()?.duration}</p>
                  </div>
                  <p className="text-muted-coral font-bold text-lg">${getCurrentService()?.price}.00</p>
                </div>
              </div>

              {/* Add-on Services */}
              <div className="space-y-3 sm:space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-warm-beige mb-4">ADD TO APPOINTMENT</h3>
                {addOnServices.map((addon) => (
                  <div
                    key={addon.id}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      selectedAddOns.includes(addon.id)
                        ? 'bg-muted-coral bg-opacity-10 border-muted-coral'
                        : 'bg-gray-800 bg-opacity-50 border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => handleAddOnToggle(addon.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedAddOns.includes(addon.id)
                            ? 'bg-muted-coral border-muted-coral'
                            : 'border-gray-500'
                        }`}>
                          {selectedAddOns.includes(addon.id) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-warm-beige font-medium">{addon.name}</h4>
                          <p className="text-gray-400 text-sm">{addon.description}</p>
                          <p className="text-gray-400 text-xs">{addon.duration}</p>
                        </div>
                      </div>
                      <div className="text-muted-coral font-bold">
                        + ${addon.price}.00
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total and Continue */}
              <div className="card bg-gradient-to-br from-golden-yellow/10 to-muted-coral/10 border-2 border-golden-yellow border-opacity-30">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-warm-beige">Total</span>
                  <span className="text-2xl font-bold text-muted-coral">${getTotalPrice()}.00</span>
                </div>
                <button
                  onClick={handleContinueToDateTime}
                  className="w-full btn-primary text-base sm:text-lg py-3 sm:py-4"
                >
                  Continue to Date & Time
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Date & Time Selection */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6 sm:mb-8">
                <button
                  onClick={handleBack}
                  className="mr-3 sm:mr-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-warm-beige" />
                </button>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-warm-beige mb-1 sm:mb-2">Select Date & Time</h2>
                  <p className="text-muted-coral font-medium text-sm sm:text-base">
                    Choose your preferred appointment slot
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-warm-beige">June 2025</h3>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                        <ArrowLeft className="w-4 h-4 text-warm-beige" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                        <ArrowLeft className="w-4 h-4 text-warm-beige transform rotate-180" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                      <div key={day} className="text-center text-gray-400 text-sm font-medium py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((date, index) => {
                      const dateStr = formatDate(date);
                      const isCurrentMonth = date.getMonth() === new Date().getMonth();
                      const isAvailable = isDateAvailable(date);
                      const isSelected = selectedDate === dateStr;

                      return (
                        <button
                          key={index}
                          onClick={() => isAvailable ? setSelectedDate(dateStr) : null}
                          disabled={!isAvailable}
                          className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
                            isSelected
                              ? 'bg-muted-coral text-white font-bold'
                              : isAvailable
                              ? 'text-warm-beige hover:bg-gray-700'
                              : 'text-gray-600 cursor-not-allowed'
                          } ${!isCurrentMonth ? 'opacity-30' : ''}`}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 text-xs text-gray-400 text-center">
                    TIME ZONE: EASTERN TIME (GMT-04:00)
                  </div>
                </div>

                {/* Time Selection */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-warm-beige mb-6">Available Times</h3>
                  
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border transition-all duration-200 ${
                            selectedTime === time
                              ? 'bg-muted-coral border-muted-coral text-white'
                              : 'bg-gray-800 border-gray-600 text-warm-beige hover:border-muted-coral'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      Please select a date first
                    </div>
                  )}

                  {/* Booking Summary */}
                  {selectedDate && selectedTime && (
                    <div className="mt-8 p-4 bg-gradient-to-br from-golden-yellow/10 to-muted-coral/10 rounded-lg border border-golden-yellow border-opacity-30">
                      <h4 className="font-semibold text-warm-beige mb-3">Booking Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Service:</span>
                          <span className="text-warm-beige">{getCurrentService()?.name}</span>
                        </div>
                        {getSelectedAddOns().map((addon) => (
                          <div key={addon.id} className="flex justify-between">
                            <span className="text-gray-300">+ {addon.name}:</span>
                            <span className="text-warm-beige">${addon.price}</span>
                          </div>
                        ))}
                        <div className="flex justify-between">
                          <span className="text-gray-300">Date:</span>
                          <span className="text-warm-beige">{new Date(selectedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Time:</span>
                          <span className="text-warm-beige">{selectedTime}</span>
                        </div>
                        <div className="border-t border-gray-600 pt-2 mt-3">
                          <div className="flex justify-between font-bold">
                            <span className="text-warm-beige">Total:</span>
                            <span className="text-muted-coral text-lg">${getTotalPrice()}.00</span>
                          </div>
                        </div>
                      </div>
                      
                      <button className="w-full btn-primary mt-4">
                        Complete Booking
                      </button>
                    </div>
                  )}
                </div>
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