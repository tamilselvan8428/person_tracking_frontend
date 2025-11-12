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

      <motion.div
        className="about-footer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
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
