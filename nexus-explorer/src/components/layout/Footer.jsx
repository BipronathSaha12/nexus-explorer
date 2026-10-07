import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/documentation"><MdHelpOutline /> Documentation</Link>
          <Link to="/api-reference"><MdCode /> API Reference</Link>
          <Link to="/privacy"><MdSecurity /> Privacy Policy</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Nexus Explorer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
