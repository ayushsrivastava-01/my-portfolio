import React, { useEffect, useState } from 'react';
import './css/navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg custom-navbar sticky-top ${scrolled ? 'sticky-scrolled' : ''}`}>
      <div className="container">
        <NavLink className="navbar-brand" to="/" onClick={handleNavClick}>
          Ayush's Portfolio
        </NavLink>

        <button
          className={`navbar-toggler custom-toggler ${isOpen ? 'open' : ''}`}
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger icon */}
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center flex-column flex-lg-row text-center text-lg-start">
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/" onClick={handleNavClick}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/about" onClick={handleNavClick}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/skills" onClick={handleNavClick}>Skills</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/projects" onClick={handleNavClick}>Projects</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/contact" onClick={handleNavClick}>Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/certificate" onClick={handleNavClick}>Certificates</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/resume" onClick={handleNavClick}>Resume</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
