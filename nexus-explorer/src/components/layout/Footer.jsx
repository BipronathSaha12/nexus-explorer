import React from 'react';
import { MdCode, MdSecurity, MdHelpOutline } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Nexus Explorer</h4>
          <p>Character Intelligence Dashboard powered by the Rick and Morty API.</p>
        </div>
        
        <div className="footer-section footer-links">
          <h4>Resources</h4>
          <a href="#"><MdHelpOutline /> Documentation</a>
          <a href="#"><MdCode /> API Reference</a>
          <a href="#"><MdSecurity /> Privacy Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Nexus Explorer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
