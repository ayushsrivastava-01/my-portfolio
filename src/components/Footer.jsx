import React from 'react';
import './css/Footer.css';
import { FaInstagram, FaLinkedin, FaTelegram, FaGithub } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          {/* Left - Name & Profession */}
          <div className="footer-left">
            <h2 className="footer-heading-underline">Ayush Srivastava</h2>
            <p>Full-Stack Developer</p>
            <p>Programmer</p>
          </div>

          {/* Center - Quick Links in boxes */}
          <div className="footer-center">
            <h4 className="footer-heading-underline">Quick Links</h4><br />
            <div className="quick-links-boxes">
              <Link to="/" className="quick-box">Home</Link>
              <Link to="/about" className="quick-box">About</Link>
              <Link to="/skills" className="quick-box">Skills</Link>
              <Link to="/certificate" className="quick-box">Certificates</Link>
              <Link to="/resume" className="quick-box">Resume</Link>
            </div>
          </div>

          {/* Right - Social Icons and Email */}
          <div className="footer-right">
            <h4 className="footer-heading-underline">Connect with Me</h4>
            <div className="social-icons">
              <a href="https://www.instagram.com/ayushsrivastava_01" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/ayush-srivastava01" target="_blank" rel="noreferrer"><FaLinkedin /></a>
              <a href="https://telegram.me/ayushsrivastava_01" target="_blank" rel="noreferrer"><FaTelegram /></a>
              <a href="https://github.com/ayushsrivastava-01" target="_blank" rel="noreferrer"><FaGithub /></a>
              <a href="https://www.threads.com/@ayushsrivastava_01" target="_blank" rel="noreferrer"><FaThreads /></a>
            </div>
            <p className="footer-email">
              Email: <a href="mailto:ayushsrivastava1854@gmail.com" className="footer-email-link">ayushsrivastava1854@gmail.com</a>
            </p>
          </div>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} Ayush Srivastava. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
