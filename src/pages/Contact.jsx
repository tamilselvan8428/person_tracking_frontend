import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import "./Contact.css";

// Initialize EmailJS with your public key
const EMAILJS_SERVICE_ID = 'service_86s12e8';
const EMAILJS_TEMPLATE_ID = 'template_lqiq4hp';
const EMAILJS_PUBLIC_KEY = 'PVvjgTLofvDoeyXeC';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ text: "Sending message...", type: "info" });

    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setStatus({ 
          text: "✅ Message sent successfully!", 
          type: "success" 
        });
        setFormData({ 
          name: "", 
          email: "", 
          phone: "", 
          message: "" 
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ 
        text: "❌ Failed to send message. Please try again.", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <motion.h1
        className="contact-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Contact Us 📩
      </motion.h1>

      <motion.p
        className="contact-subtext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        Have questions or feedback? Send us a message and we’ll get back to you soon.
      </motion.p>

      <motion.form
        ref={form}
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
        ></textarea>

        <motion.button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          style={{
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.8 : 1
          }}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </motion.button>

        {status.text && (
          <p 
            className={`status-msg ${status.type}`}
            style={{
              color: status.type === 'error' ? '#ef4444' : status.type === 'success' ? '#10b981' : '#3b82f6'
            }}
          >
            {status.text}
          </p>
        )}
      </motion.form>
    </div>
  );
};

export default Contact;
