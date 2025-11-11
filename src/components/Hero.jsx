import React from "react";
import "./css/Hero.css";
import Lottie from "lottie-react";
import heroAnimation from "../assets/hero.json";
import { Link } from "react-router-dom";

const Hero = () => {
  const fullText =
    "A passionate full-stack developer who loves turning complex problems into elegant solutions. With a strong foundation in both frontend and backend technologies.";

  return (
    <section id="home" className="hero-section">
      <div className="background-pattern"></div>
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="row align-items-center w-100">

          {/* Animation */}
          <div className="col-lg-6 text-center mb-4 mb-lg-0 fade-in-left">
            <Lottie
              animationData={heroAnimation}
              loop={true}
              className="hero-lottie"
            />
          </div>

          {/* Text Content */}
          <div className="col-lg-6 text-center text-lg-start fade-in-right">
            {/* ADDED: Hidden H1 for better SEO structure */}
            <h1 className="hero-heading" style={{display: 'none'}}>
              Ayush Srivastava - Full Stack Developer Portfolio
            </h1>
            
            {/* Your existing visible heading */}
            <h2 className="hero-heading">
              Hi, I'm <span className="highlight">Ayush Srivastava</span>
            </h2>
            <p className="hero-subtext">{fullText}</p>
            <div className="hero-buttons mt-4">
              <Link to="/contact" className="modern-btn contact-btn me-3">
                CONTACT ME
              </Link>
              <Link to="/projects" className="animated-button">
                <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
                <span className="text">SEE MY WORK</span>
                <span className="circle"></span>
                <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;