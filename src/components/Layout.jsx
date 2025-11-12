import React from 'react';
import { motion } from 'framer-motion';
import './Layout.css';

const Layout = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`layout ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Layout;