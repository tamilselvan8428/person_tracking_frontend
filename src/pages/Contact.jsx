import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5005/sendMail", formData);
      if (res.data.success) {
        setStatus("✅ Mail sent successfully!");
        setFormData({ name: "", email: "", phone: "", description: "" });
      } else {
        setStatus("❌ Failed to send mail.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending mail.");
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
          name="description"
          placeholder="Write your message..."
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>

        {status && <p className="status-msg">{status}</p>}
      </motion.form>
    </div>
  );
};

export default Contact;
