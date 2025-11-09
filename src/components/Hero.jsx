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
            <h1 className="hero-heading">
              Hi, I'm <span className="highlight">Ayush Srivastava</span>
            </h1>
            <p className="hero-subtext animate-text">{fullText}</p>
            <div className="hero-buttons mt-4">
              <Link to="/contact" className="btn hero-btn me-3">
                Contact Me
              </Link>
              <Link to="/projects" className="btn hero-btn-outline">
                See my Work
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
