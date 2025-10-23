// Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Using react-icons/fa for icons
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          2025 &copy; All rights Reserved. Sumit Vishwakarma
        </p>
        <div className="icon-container">
          <a href="https://www.linkedin.com/in/sumit-vishwakarma272/" target="_blank" rel="noopener noreferrer" className="icon-link linkedin">
            <FaLinkedin className="icon" />
          </a>
          <a href="https://github.com/cjsumit" target="_blank" rel="noopener noreferrer" className="icon-link github">
            <FaGithub className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;