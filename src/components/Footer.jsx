import React from 'react';
import './css/Footer.css';
import { FaInstagram, FaLinkedin, FaTelegram, FaGithub } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">

          <div className="footer-left">
            <h2 className="footer-heading-underline">Ayush Srivastava</h2>
            <p>Full-Stack Developer</p>
            <p>Programmer</p>
          </div>

          <div className="footer-center">
            <h4 className="footer-heading-underline">Quick Links</h4><br />
            <div className="quick-links-boxes">
              <NavLink to="/" className="quick-box">Home</NavLink>
              <NavLink to="/about" className="quick-box">About</NavLink>
              <NavLink to="/skills" className="quick-box">Skills</NavLink>
              <NavLink to="/certificate" className="quick-box">Certificates</NavLink>
              <NavLink to="/resume" className="quick-box">Resume</NavLink>
            </div>
          </div>

          <div className="footer-right">
            <h4 className="footer-heading-underline">Connect with Me</h4>
            <div className="social-icons">
              <a href="https://www.instagram.com/ayushsrivastava_01" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/ayush-srivastava01" target="_blank" rel="noreferrer"><FaLinkedin /></a>
              <a href="https://telegram.me/ayushsrivastava_01" target="_blank" rel="noreferrer"><FaTelegram /></a>
              <a href="https://github.com/ayushsrivastava-01" target="_blank" rel="noreferrer"><FaGithub /></a>
              <a href="https://www.threads.net/@ayushsrivastava_01" target="_blank" rel="noreferrer"><FaThreads /></a>
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
