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
        {/* Download Button */}
        <div className="download-button-container">
          <a
            href={resumePDF}
            download="Ayush_Resume.pdf"
            className="button download-button"
            data-tooltip="Size: 55Kb"
          >
            <div className="button-wrapper">
              <div className="text">Download Resume</div>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path>
                </svg>
              </span>
            </div>
          </a>
          <div className="tooltip">Size: 55Kb</div>
        </div>

        {/* View Resume Button */}
        <a
          href={resumePDF}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-item view-button"
        >
          <span className="button-bg">
            <span className="button-bg-layers">
              <span className="button-bg-layer button-bg-layer-1 -purple"></span>
              <span className="button-bg-layer button-bg-layer-2 -turquoise"></span>
              <span className="button-bg-layer button-bg-layer-3 -yellow"></span>
            </span>
          </span>
          <span className="button-inner">
            <span className="button-inner-static">View Resume</span>
            <span className="button-inner-hover">View Resume</span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default Resume;