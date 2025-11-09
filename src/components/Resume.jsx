import React from 'react';
import './css/Resume.css';
import resumePDF from '../assets/resume.pdf'; 
import Lottie from 'lottie-react';
import paperAnimation from '../assets/resume.json'; 

const Resume = () => {
  return (
    <section className="resume-section" id="resume">
      <div className="resume-title-container animate-fade-up">
        <div className="lottie-icon">
          <Lottie animationData={paperAnimation} loop={true}/>
        </div>
        <h2 className="resume-title">My Resume</h2>
      </div>

      <p className="resume-description animate-fade-up">
        Choose an option below to access my resume:
      </p>

      <div className="resume-buttons animate-fade-up">
        <a
          href={resumePDF}
          download="Ayush_Resume.pdf"
          className="resume-btn download-btn"
        >
          🚀 Download Resume
        </a>
        <a
          href={resumePDF}
          target="_blank"
          rel="noopener noreferrer"
          className="resume-btn view-btn"
        >
          👁️ View Resume
        </a>
      </div>
    </section>
  );
};

export default Resume;
