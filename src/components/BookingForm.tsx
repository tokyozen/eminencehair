import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Loader } from 'lucide-react';
import { sendBookingEmail, sendEmailFallback, BookingEmailData } from '../lib/emailService';

interface BookingFormProps {
  title?: string;
  subtitle?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  title = "Book Your Appointment", 
  subtitle = "Ready to transform your look? Schedule your session today!" 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const services = [
    'Wig Install (No Styling) - $75',
    'Wig Install + Styling - $80',
    'Reinstall - $60',
    'Basic Wig Customization - $55',
    'Glueless Wig Units (Custom Price)',
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Extract service name and price
    const serviceParts = formData.service.split(' - ');
    const serviceName = serviceParts[0];
    const servicePrice = serviceParts[1] || 'Contact for pricing';
    
    // Prepare email data
    const emailData: BookingEmailData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      serviceName: serviceName,
      servicePrice: servicePrice,
      totalPrice: servicePrice,
      preferredDate: new Date(formData.date).toLocaleDateString(),
      preferredTime: formData.time,
      additionalNotes: formData.message,
      bookingType: 'simple'
    };

    try {
      // Try to send email automatically
      const emailSent = await sendBookingEmail(emailData);
      
      if (emailSent) {
        setIsSubmitted(true);
      } else {
        // Fallback to mailto if automatic sending fails
        sendEmailFallback(emailData, 'booking');
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitError('There was an issue sending your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setSubmitError(null);
  };

  if (isSubmitted) {
    return (
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card max-w-2xl mx-auto animate-fade-in text-center bg-gradient-to-br from-green-600/10 to-muted-coral/10 border-2 border-green-500 border-opacity-30">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-warm-beige mb-4">Request Sent Successfully!</h2>
              <p className="text-gray-300 mb-6">
                Your appointment request has been automatically sent to our team. We'll get back to you within 24 hours to confirm your booking.
              </p>
              <div className="bg-golden-yellow bg-opacity-10 rounded-lg p-4 border border-golden-yellow border-opacity-30">
                <p className="text-golden-yellow text-sm">
                  <strong>What's Next?</strong><br />
                  • We'll review your request and confirm availability<br />
                  • You'll receive a confirmation email with appointment details<br />
                  • Remember to drop off your wig 3-5 days before your appointment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="section-title">{title}</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="card max-w-2xl mx-auto animate-fade-in">
          {submitError && (
            <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg">
              <p className="text-red-400 text-sm">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-warm-beige">
                  <User className="inline w-4 h-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-warm-beige">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="(204) 825-8526"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-warm-beige">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-warm-beige">
                Service *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-warm-beige">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="input-field"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-warm-beige">
                  <Clock className="inline w-4 h-4 mr-2" />
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-warm-beige">
                Additional Notes
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="input-field resize-none"
                placeholder="Any special requests or questions?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-base sm:text-lg py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Sending Request...
                </>
              ) : (
                'Send Appointment Request'
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-golden-yellow bg-opacity-10 rounded-lg border border-golden-yellow border-opacity-30">
            <p className="text-xs sm:text-sm text-golden-yellow font-medium">
              <strong>Important:</strong> Please read our booking policies before submitting. 
              We require 24-hour advance notice for rescheduling and have specific requirements for wig drop-offs.
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Prefer to call? Contact us directly at{' '}
              <a href="tel:+12048258526" className="text-muted-coral hover:text-burnt-orange font-medium">
                (204) 825-8526
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;