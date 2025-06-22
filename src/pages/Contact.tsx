import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle, CheckCircle, Loader } from 'lucide-react';
import { sendContactEmail, sendEmailFallback, ContactEmailData } from '../lib/emailService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-muted-coral" />,
      title: "Phone",
      details: ["(204) 825-8526"],
      action: "Call now"
    },
    {
      icon: <Mail className="w-6 h-6 text-golden-yellow" />,
      title: "Email",
      details: ["ahussein@kallmania.com"],
      action: "Send email"
    },
    {
      icon: <Instagram className="w-6 h-6 text-muted-coral" />,
      title: "Instagram",
      details: ["@eminencehairco"],
      action: "Follow us"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-golden-yellow" />,
      title: "DM for Consultation",
      details: ["Custom orders", "Squeeze-in appointments"],
      action: "Message us"
    }
  ];

  const businessHours = [
    { day: "Monday", hours: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
    { day: "Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 1-2 weeks in advance, especially for weekends. Don't forget to drop off your wig 3-5 days before your appointment!"
    },
    {
      question: "What if I need a same-day appointment?",
      answer: "Same-day appointments are available with a $50 fee (doesn't go toward service total). DM us first to check availability before booking."
    },
    {
      question: "Can I bring my own wig for installation?",
      answer: "We only install wigs that we customize ourselves. Your wig must be new, HD or transparent lace only, and meet our quality standards."
    },
    {
      question: "What's included in the customization service?",
      answer: "Our $55 customization includes bleaching knots, plucking the hairline, creating your preferred parting, and prepping the wig to be glueless-ready."
    },
    {
      question: "Do you offer reinstalls?",
      answer: "Yes! Reinstalls are $60 and available only for wigs originally installed by us. The wig must be in good condition for reinstallation."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Prepare email data
    const emailData: ContactEmailData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    };

    try {
      // Try to send email automatically
      const emailSent = await sendContactEmail(emailData);
      
      if (emailSent) {
        setIsSubmitted(true);
      } else {
        // Fallback to mailto if automatic sending fails
        sendEmailFallback(emailData, 'contact');
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError('There was an issue sending your message. Please try again or contact us directly.');
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
        subject: '',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Elegant Background */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-slider3-background-img.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="section-title text-shadow">Get in Touch</h1>
          <p className="text-xl text-warm-beige max-w-3xl mx-auto drop-shadow-lg text-shadow">
            Ready to transform your look? Contact us to schedule your appointment or ask any questions 
            about our services and products.
          </p>
        </div>
      </section>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform duration-300">
                <div className="mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-warm-beige">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-300 mb-2">{detail}</p>
                ))}
                <button className="text-muted-coral hover:text-burnt-orange font-medium text-sm transition-colors">
                  {info.action}
                </button>
              </div>
            ))}
          </div>

          {/* Business Hours with Background */}
          <div className="relative mb-20 overflow-hidden rounded-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-parallax-1.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-soft-black bg-opacity-50"></div>
            </div>
            
            <div className="relative z-10 p-8">
              <h2 className="text-3xl font-bold text-center mb-12 text-warm-beige text-shadow">Business Hours</h2>
              <div className="max-w-2xl mx-auto">
                <div className="card bg-gray-800 bg-opacity-80 backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-6">
                    <Clock className="w-6 h-6 text-muted-coral mr-3" />
                    <h3 className="text-xl font-semibold text-warm-beige">Operating Hours</h3>
                  </div>
                  <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                        <span className="text-gray-300 font-medium">{schedule.day}</span>
                        <span className={`font-semibold ${schedule.hours === 'Closed' ? 'text-gray-500' : 'text-muted-coral'}`}>
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-golden-yellow bg-opacity-10 rounded-lg border border-golden-yellow border-opacity-30">
                    <p className="text-sm text-golden-yellow text-center">
                      <strong>Note:</strong> Hours may vary during holidays. Please contact us to confirm availability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-warm-beige">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="text-lg font-semibold mb-3 text-muted-coral">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="section-title">Send Us a Message</h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                Have a question or want to schedule a consultation? Fill out the form below and we'll get back to you quickly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="card max-w-2xl mx-auto animate-fade-in text-center bg-gradient-to-br from-green-600/10 to-muted-coral/10 border-2 border-green-500 border-opacity-30">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-warm-beige mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-300 mb-6">
                  Your message has been automatically sent to our team. We'll get back to you within 24 hours.
                </p>
                <div className="bg-golden-yellow bg-opacity-10 rounded-lg p-4 border border-golden-yellow border-opacity-30">
                  <p className="text-golden-yellow text-sm">
                    <strong>What's Next?</strong><br />
                    • We'll review your message and respond promptly<br />
                    • For urgent matters, please call us directly<br />
                    • Check your email for our response
                  </p>
                </div>
              </div>
            ) : (
              <div className="card max-w-2xl mx-auto animate-fade-in">
                {submitError && (
                  <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg">
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-warm-beige">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-warm-beige">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
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
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-warm-beige">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Appointment Booking">Appointment Booking</option>
                      <option value="Service Questions">Service Questions</option>
                      <option value="Pricing Information">Pricing Information</option>
                      <option value="Custom Order">Custom Order</option>
                      <option value="Complaint or Feedback">Complaint or Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-warm-beige">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Tell us how we can help you..."
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
                        Sending Message...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Prefer to call? Contact us directly at{' '}
                    <a href="tel:+12048258526" className="text-muted-coral hover:text-burnt-orange font-medium">
                      (204) 825-8526
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Location & Final CTA with Background */}
          <div className="mt-20 relative overflow-hidden rounded-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-slider2-background-img.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-soft-black bg-opacity-50"></div>
            </div>
            
            <div className="relative z-10 card text-center bg-gradient-to-r from-muted-coral/10 to-golden-yellow/10 backdrop-blur-sm">
              <div className="mb-6">
                <MapPin className="w-8 h-8 text-muted-coral mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-warm-beige text-shadow">Visit Our Studio</h3>
                <p className="text-gray-300 mb-6 text-shadow">
                  Located in a convenient, professional setting where you can relax and enjoy your hair transformation experience.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4">
                  <h4 className="font-semibold text-warm-beige mb-2">Professional Environment</h4>
                  <p className="text-gray-300 text-sm">Clean, comfortable studio space designed for your relaxation and privacy.</p>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-warm-beige mb-2">Expert Service</h4>
                  <p className="text-gray-300 text-sm">Skilled customization and installation by our experienced professional.</p>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-warm-beige mb-2">Quality Results</h4>
                  <p className="text-gray-300 text-sm">Leave feeling confident and beautiful with your perfectly fitted, styled wig.</p>
                </div>
              </div>

              <p className="text-xl text-gray-300 mb-6 text-shadow">
                Ready to experience the Eminence Hair difference?
              </p>
              <button className="btn-primary text-lg px-8 py-4">
                Book Your Transformation Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;