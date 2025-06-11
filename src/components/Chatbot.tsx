import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Clock, Phone, Calendar, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting when chatbot opens
      setTimeout(() => {
        addBotMessage(
          "Hi there! 👋 I'm here to help you with all things hair! I can assist you with:\n\n• Service information & pricing\n• Booking appointments\n• Hair care tips\n• Product recommendations\n\nWhat would you like to know?",
          [
            "View Services & Pricing",
            "Book an Appointment", 
            "Hair Care Tips",
            "Contact Information"
          ]
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, quickReplies?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      quickReplies
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const getBotResponse = (userMessage: string): { text: string; quickReplies?: string[] } => {
    const message = userMessage.toLowerCase();

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        text: "Hello! Welcome to Eminence Hair Co! 💫 I'm excited to help you with your hair transformation journey. What can I assist you with today?",
        quickReplies: ["Services & Pricing", "Book Appointment", "Hair Types", "Contact Info"]
      };
    }

    // Services and pricing
    if (message.includes('service') || message.includes('price') || message.includes('cost') || message.includes('pricing')) {
      return {
        text: "Here are our main services:\n\n💇‍♀️ **Installation Services:**\n• Wig Install (No Styling) - $75\n• Wig Install + Styling - $80\n• Reinstalls - $60\n\n✨ **Customization:**\n• Basic Wig Customization - $55\n• Glueless Wig Units - Custom pricing\n\nAll services include professional consultation and aftercare instructions!",
        quickReplies: ["Book Now", "What's Included?", "Hair Collection", "More Details"]
      };
    }

    // Booking related
    if (message.includes('book') || message.includes('appointment') || message.includes('schedule')) {
      return {
        text: "I'd love to help you book your appointment! 📅\n\n**Business Hours:**\n• Mon-Fri: 9:00 AM - 6:00 PM\n• Saturday: 10:00 AM - 4:00 PM\n• Sunday: Closed\n\n**To book:**\n• Use our online booking system\n• Call us at (204) 825-8526\n• DM us on Instagram @eminencehairco\n\nRemember to drop off your wig 3-5 days before your appointment!",
        quickReplies: ["Book Online", "Call Now", "Booking Requirements", "Instagram"]
      };
    }

    // Hair care tips
    if (message.includes('care') || message.includes('tip') || message.includes('maintain') || message.includes('wash')) {
      return {
        text: "Great question! Here are some essential hair care tips: 💡\n\n**For Your Natural Hair:**\n• Keep it clean and moisturized\n• Braid it flat for wig installation\n• Avoid heavy oils before appointments\n\n**For Your Wig:**\n• Use sulfate-free shampoo\n• Deep condition regularly\n• Store on a wig stand\n• Avoid excessive heat\n\nWould you like specific care instructions for your hair type?",
        quickReplies: ["Natural Hair Care", "Wig Maintenance", "Product Recommendations", "More Tips"]
      };
    }

    // Hair types and textures
    if (message.includes('hair type') || message.includes('texture') || message.includes('curly') || message.includes('straight') || message.includes('wave')) {
      return {
        text: "We work with all beautiful hair textures! 🌟\n\n**Our Collection:**\n• Body Wave - Natural, flowing waves\n• Straight - Sleek and smooth\n• Deep Wave - Voluminous curls\n• Exotic Curly - Bold, defined curls\n\nAll our hair is 100% human hair in premium quality. We can customize any texture to match your natural hair perfectly!",
        quickReplies: ["View Collection", "Customization Options", "Hair Matching", "Book Consultation"]
      };
    }

    // Contact information
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address')) {
      return {
        text: "Here's how to reach us! 📞\n\n**Phone:** (204) 825-8526\n**Email:** eihu335@gmail.com\n**Instagram:** @eminencehairco\n\n**For Quick Response:**\n• DM us on Instagram for consultations\n• Call during business hours\n• Use our online booking system\n\nWe typically respond within a few hours!",
        quickReplies: ["Call Now", "Send Email", "Instagram", "Book Online"]
      };
    }

    // Requirements and policies
    if (message.includes('requirement') || message.includes('policy') || message.includes('rule') || message.includes('bring')) {
      return {
        text: "Important requirements for your appointment: 📋\n\n**Wig Requirements:**\n• Must be new\n• HD or transparent lace only\n• Drop off 3-5 days before appointment\n\n**Arrival Requirements:**\n• Come with clean, blow-dried hair\n• No oils or heavy products\n• Be ready for braid-down\n\n**Policies:**\n• 24-hour notice for rescheduling\n• Same-day appointments: $50 fee",
        quickReplies: ["More Policies", "Wig Guidelines", "Preparation Tips", "Book Now"]
      };
    }

    // Customization details
    if (message.includes('custom') || message.includes('bleach') || message.includes('pluck') || message.includes('glueless')) {
      return {
        text: "Our customization process is what makes us special! ✨\n\n**Basic Customization ($55) includes:**\n• Bleaching the knots\n• Plucking the hairline\n• Creating your preferred parting\n• Glueless preparation\n\n**Result:** A natural-looking, ready-to-wear wig that blends seamlessly with your hairline!\n\nThis process takes 4-6 hours and transforms your wig completely.",
        quickReplies: ["See Before/After", "Book Customization", "Glueless Benefits", "Pricing Details"]
      };
    }

    // Hours and availability
    if (message.includes('hour') || message.includes('open') || message.includes('close') || message.includes('available')) {
      return {
        text: "Our studio hours: 🕐\n\n**Monday - Friday:** 9:00 AM - 6:00 PM\n**Saturday:** 10:00 AM - 4:00 PM\n**Sunday:** Closed\n\n**Booking Tips:**\n• Book 1-2 weeks in advance\n• Weekends fill up quickly\n• Same-day available with $50 fee\n• DM for squeeze-in appointments",
        quickReplies: ["Book Now", "Weekend Availability", "Same-Day Booking", "Call Now"]
      };
    }

    // Thank you responses
    if (message.includes('thank') || message.includes('thanks')) {
      return {
        text: "You're so welcome! 💕 I'm here whenever you need help with your hair journey. Is there anything else I can assist you with today?",
        quickReplies: ["Book Appointment", "More Questions", "Contact Info", "Hair Tips"]
      };
    }

    // Default response
    return {
      text: "I'd love to help you with that! 😊 While I might not have the exact answer, I can connect you with our team for personalized assistance.\n\nHere are some things I can definitely help with:",
      quickReplies: ["Services & Pricing", "Book Appointment", "Hair Care Tips", "Contact Team"]
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const userMessage = inputValue;
    setInputValue('');

    simulateTyping();
    setTimeout(() => {
      const response = getBotResponse(userMessage);
      addBotMessage(response.text, response.quickReplies);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    simulateTyping();
    setTimeout(() => {
      const response = getBotResponse(reply);
      addBotMessage(response.text, response.quickReplies);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button - Responsive sizing */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-muted-coral to-burnt-orange rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-golden-yellow rounded-full flex items-center justify-center">
          <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-soft-black" />
        </div>
      </button>

      {/* Chat Window - Responsive sizing */}
      {isOpen && (
        <div className="fixed inset-4 sm:bottom-6 sm:right-6 sm:inset-auto z-50 sm:w-96 sm:h-[600px] bg-soft-black bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-muted-coral to-golden-yellow p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base">Hair Assistant</h3>
                <p className="text-xs text-white text-opacity-80">Eminence Hair Co.</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] sm:max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`p-2 sm:p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-800 bg-opacity-70 text-warm-beige'
                        : 'bg-gradient-to-r from-muted-coral to-burnt-orange text-white'
                    }`}
                  >
                    <p className="text-xs sm:text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  
                  {/* Quick Replies */}
                  {message.isBot && message.quickReplies && (
                    <div className="mt-2 space-y-1">
                      {message.quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="block w-full text-left text-xs px-2 sm:px-3 py-1 sm:py-2 bg-gray-700 bg-opacity-50 hover:bg-muted-coral hover:bg-opacity-20 text-gray-300 hover:text-warm-beige rounded-lg transition-colors duration-200"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className={`flex items-center mt-1 space-x-1 ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                    {message.isBot ? (
                      <Bot className="w-3 h-3 text-muted-coral" />
                    ) : (
                      <User className="w-3 h-3 text-gray-400" />
                    )}
                    <span className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 bg-opacity-70 p-2 sm:p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-coral rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-coral rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-coral rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about hair services..."
                className="flex-1 px-3 py-2 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-warm-beige placeholder-gray-400 focus:border-muted-coral focus:ring-1 focus:ring-muted-coral outline-none text-xs sm:text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-muted-coral to-burnt-orange rounded-lg flex items-center justify-center hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
              <button
                onClick={() => handleQuickReply("Book an appointment")}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-golden-yellow bg-opacity-20 text-golden-yellow rounded-full text-xs hover:bg-opacity-30 transition-colors"
              >
                <Calendar className="w-3 h-3" />
                <span className="hidden sm:inline">Book</span>
              </button>
              <button
                onClick={() => handleQuickReply("Call now")}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-muted-coral bg-opacity-20 text-muted-coral rounded-full text-xs hover:bg-opacity-30 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">Call</span>
              </button>
              <button
                onClick={() => handleQuickReply("Business hours")}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-gray-600 bg-opacity-20 text-gray-300 rounded-full text-xs hover:bg-opacity-30 transition-colors"
              >
                <Clock className="w-3 h-3" />
                <span className="hidden sm:inline">Hours</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;