// frontend/src/ContactUs.js
import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';   // New dedicated CSS file (recommended)

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');
    setIsSuccess(false);

    try {
      const base = process.env.REACT_APP_API_URL || '';
      const res = await axios.post(`${base}/api/email`, formData);
      
      setResponse(res.data.message || 'Message sent successfully!');
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setResponse('Failed to send message. Please try again later.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">
          We'd love to hear from you. Send us a message!
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>

          {response && (
            <p className={`response-message ${isSuccess ? 'success' : 'error'}`}>
              {response}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;