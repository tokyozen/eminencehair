import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_n0g4676';
const EMAILJS_TEMPLATE_ID = 'template_e7fxwyc';
const EMAILJS_PUBLIC_KEY = 'cgiZAqf_3nAX4xAPM';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  servicePrice: string;
  addOns?: string;
  totalPrice: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
  bookingType: 'simple' | 'detailed';
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const sendBookingEmail = async (data: BookingEmailData): Promise<boolean> => {
  try {
    // Prepare email template parameters
    const templateParams = {
      to_email: 'bookings@eminenceextensions.com',
      from_name: data.customerName,
      from_email: data.customerEmail,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone,
      service_name: data.serviceName,
      service_price: data.servicePrice,
      add_ons: data.addOns || 'None',
      total_price: data.totalPrice,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      additional_notes: data.additionalNotes || 'None',
      booking_type: data.bookingType,
      subject: `New Appointment Booking - ${data.serviceName}`,
      message: `
New appointment booking request received:

CUSTOMER INFORMATION:
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}

SERVICE DETAILS:
Service: ${data.serviceName} - ${data.servicePrice}
${data.addOns ? `Add-ons: ${data.addOns}` : ''}
Total: ${data.totalPrice}

APPOINTMENT PREFERENCES:
Date: ${data.preferredDate}
Time: ${data.preferredTime}

ADDITIONAL NOTES:
${data.additionalNotes || 'None'}

Please confirm availability and contact the customer to finalize the appointment.
      `
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Booking email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Error sending booking email:', error);
    return false;
  }
};

export const sendContactEmail = async (data: ContactEmailData): Promise<boolean> => {
  try {
    // Prepare email template parameters
    const templateParams = {
      to_email: 'bookings@eminenceextensions.com',
      from_name: data.name,
      from_email: data.email,
      customer_name: data.name,
      customer_email: data.email,
      customer_phone: data.phone || 'Not provided',
      subject: data.subject,
      message: `
New contact form submission:

CONTACT INFORMATION:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

SUBJECT: ${data.subject}

MESSAGE:
${data.message}

Please respond to this inquiry as soon as possible.
      `
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_contact', // Different template for contact forms
      templateParams
    );

    console.log('Contact email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};

// Fallback email function (opens email client)
export const sendEmailFallback = (data: BookingEmailData | ContactEmailData, type: 'booking' | 'contact') => {
  let subject: string;
  let body: string;

  if (type === 'booking') {
    const bookingData = data as BookingEmailData;
    subject = encodeURIComponent(`Appointment Booking - ${bookingData.serviceName}`);
    body = encodeURIComponent(`
Hello,

I would like to book an appointment with the following details:

CUSTOMER INFORMATION:
Name: ${bookingData.customerName}
Email: ${bookingData.customerEmail}
Phone: ${bookingData.customerPhone}

SERVICE DETAILS:
Service: ${bookingData.serviceName} - ${bookingData.servicePrice}
${bookingData.addOns ? `Add-ons: ${bookingData.addOns}` : ''}
Total: ${bookingData.totalPrice}

APPOINTMENT PREFERENCES:
Date: ${bookingData.preferredDate}
Time: ${bookingData.preferredTime}

ADDITIONAL NOTES:
${bookingData.additionalNotes || 'None'}

Please confirm availability and provide any additional instructions.

Thank you!
    `);
  } else {
    const contactData = data as ContactEmailData;
    subject = encodeURIComponent(contactData.subject);
    body = encodeURIComponent(`
Hello,

${contactData.message}

Best regards,
${contactData.name}
${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ''}
    `);
  }

  const mailtoLink = `mailto:bookings@eminenceextensions.com?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
};