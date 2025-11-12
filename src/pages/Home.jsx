import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWifi, FaMapMarkerAlt, FaShieldAlt, FaArrowRight, FaRocket } from 'react-icons/fa';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation class to feature cards on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <FaWifi className="feature-icon" />,
      title: 'Real-Time Monitoring',
      description: 'Get instant updates on device status and location changes in real-time.'
    },
    {
      icon: <FaMapMarkerAlt className="feature-icon" />,
      title: 'Precise Location',
      description: 'Track exact room-level location of devices within your network.'
    },
    {
      icon: <FaShieldAlt className="feature-icon" />,
      title: 'Secure & Private',
      description: 'Your data stays private and secure with enterprise-grade encryption.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Smart <span>Device</span> Tracking
          </h1>
          <p className="hero-subtitle">
            Monitor and manage all your connected devices in real-time with our powerful IoT tracking solution.
          </p>
          <div className="cta-buttons">
            <button 
              onClick={() => navigate('/tracking')} 
              className="primary-btn"
            >
              Start Tracking <FaArrowRight className="ml-2" />
            </button>
            <button className="secondary-btn">
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Monitoring</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Accuracy</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          {/* Placeholder for hero image or illustration */}
          <div className="hero-illustration">
            <FaRocket className="rocket-icon" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Our Tracker?</h2>
          <p>Powerful features designed to give you complete control over your IoT devices</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users who trust our platform for their device tracking needs.</p>
          <button 
            onClick={() => navigate('/tracking')} 
            className="primary-btn large"
          >
            Start Tracking Now <FaArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <FaWifi className="logo-icon" />
            <span>IoT Tracker</span>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} IoT Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
