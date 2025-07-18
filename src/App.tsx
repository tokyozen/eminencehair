import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import BookNow from './pages/BookNow';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show preloader for 3 seconds minimum

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader />
      <Router>
        <div className="min-h-screen bg-soft-black">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<BookNow />} />
          </Routes>
          <Footer />
          <Chatbot />
          <ScrollToTop />
        </div>
      </Router>
    </>
  );
}

export default App;