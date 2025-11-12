import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <motion.h1
        className="about-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Smart Tracker
      </motion.h1>

      <motion.p
        className="about-subtext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        The Smart Tracker system helps monitor and locate people or assets in a networked environment using IoT devices.
        Admins can add and manage devices, while viewers can track their real-time positions.
      </motion.p>

      <div className="about-features">
        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2>💡 Intelligent Detection</h2>
          <p>
            The system automatically detects available devices on the common network and allows the admin to assign
            them to specific users for monitoring.
          </p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2>🌐 Real-Time Tracking</h2>
          <p>
            Track the live location of each person or asset within the network. Viewers can easily see which room or
            area a device is currently located in.
          </p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2>🔒 Secure Management</h2>
          <p>
            Only admins can add or manage devices, ensuring a secure and controlled environment. Each viewer gets
            real-time data access with read-only permissions.
          </p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="stats-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="stat-item">
          <h3>100%</h3>
          <p>Accuracy</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>Monitoring</p>
        </div>
        <div className="stat-item">
          <h3>99.9%</h3>
          <p>Uptime</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Devices Supported</p>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        className="how-it-works"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Device Setup</h3>
            <p>Connect ESP32 devices to your network and register them in the system.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Assign Devices</h3>
            <p>Admin assigns devices to specific users or assets for tracking.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Real-time Tracking</h3>
            <p>Monitor locations in real-time through the intuitive dashboard.</p>
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        className="team-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2>Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <div className="member-avatar">👨‍💻</div>
            <h3>John Doe</h3>
            <p>Lead Developer</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">🎨</div>
            <h3>Jane Smith</h3>
            <p>UI/UX Designer</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">🔧</div>
            <h3>Mike Johnson</h3>
            <p>Hardware Engineer</p>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="cta-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2>Ready to Get Started?</h2>
        <p>Join hundreds of businesses already using Smart Tracker for their asset management needs.</p>
        <button className="cta-button">Contact Us Today</button>
      </motion.div>

      <motion.div
        className="about-footer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3>🚀 Built With</h3>
        <ul>
          <li>React + Vite for fast and dynamic frontend</li>
          <li>Node.js + Express for backend communication</li>
          <li>MongoDB for storing device and user data</li>
          <li>ESP32 hardware for smart tracking capabilities</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default About;
