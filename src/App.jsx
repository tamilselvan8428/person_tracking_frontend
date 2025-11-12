import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Tracking from "./pages/Tracking";
import "./App.css";
export default function App() {
  return (
    <BrowserRouter>
      <header style={styles.header}>
        <h2>Smart Tracker</h2>
        <nav>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          <Link to="/tracking" style={styles.link}>Tracking</Link>
        </nav>
      </header>

      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </div>

      <footer style={styles.footer}>
        <p>© 2025 Smart Tracker. All rights reserved.</p>
      </footer>
    </BrowserRouter>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0b1736",
    color: "white",
    padding: "10px 20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px",
  },
  container: {
  
    textAlign: "center",
    minHeight: "80vh",
  },
  footer: {
    backgroundColor: "#0b1736",
    color: "white",
    padding: "10px",
    textAlign: "center",
  },
};
