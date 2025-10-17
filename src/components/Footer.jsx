import React, { useEffect, useState } from 'react';
import './css/Footer.css';
import { FaInstagram, FaLinkedin, FaTelegram, FaGithub } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // ✅ Prevent double counting (React Strict Mode fix)
    if (!sessionStorage.getItem('counted')) {
      const storedCount = localStorage.getItem('visitorCount');
      const newCount = storedCount ? parseInt(storedCount) + 1 : 1;
      localStorage.setItem('visitorCount', newCount);
      setVisitors(newCount);
      sessionStorage.setItem('counted', 'true');
    } else {
      const storedCount = localStorage.getItem('visitorCount');
      setVisitors(storedCount ? parseInt(storedCount) : 1);
    }
  }, []);

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">

          {/* ===== Left Section ===== */}
          <div className="footer-left">
            <h2 className="footer-heading-underline">Ayush Srivastava</h2>
            <p>Full-Stack Developer</p>
            <p>Programmer</p>
          </div>

          {/* ===== Center Section (Quick Links) ===== */}
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

          {/* ===== Right Section (Socials + Email) ===== */}
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

        {/* ===== Visitor Counter ===== */}
        <p className="visitors-counter">
          No. of visitors: <span className="visitor-count">{visitors}</span>
        </p>

        {/* ===== Copyright ===== */}
        <p className="copyright">
          © {new Date().getFullYear()} Ayush Srivastava. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
