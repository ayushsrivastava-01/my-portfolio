import React from 'react';
import './css/Resume.css';
import resumePDF from '../assets/Ayush_Srivastava_Resume.pdf'; 
import Lottie from 'lottie-react';
import paperAnimation from '../assets/resume.json'; 

const Resume = () => {
  return (
    <section className="resume-section" id="resume">
      {/* Resume Preview Container */}
      <div className="resume-preview-container animate-fade-up">
        <div className="preview-header">
          <div className="preview-lottie">
            <Lottie animationData={paperAnimation} loop={true}/>
          </div>
          <div className="preview-title">
            <h3>Ayush Srivastava - Resume</h3>
          </div>
          <div className="preview-tag">Live Preview</div>
        </div>
        
        {/* PDF Preview - Actual PDF embed */}
        <div className="pdf-preview-wrapper">
          <iframe
            src={resumePDF}
            className="pdf-preview-full"
            title="Resume Preview"
            loading="lazy"
          />
        </div>
        
        <div className="preview-info-grid">
          <div className="info-item">
            <span className="info-label">Format</span>
            <span className="info-value">PDF</span>
          </div>
          <div className="info-item">
            <span className="info-label">Size</span>
            <span className="info-value">171 KB</span>
          </div>
          <div className="info-item">
            <span className="info-label">Pages</span>
            <span className="info-value">1</span>
          </div>
          <div className="info-item">
            <span className="info-label">Quality</span>
            <span className="info-value">Print Ready</span>
          </div>
        </div>
      </div>

      <p className="resume-description animate-fade-up">
        Choose an option below to access my resume:
      </p>

      <div className="resume-buttons animate-fade-up">
        {/* Download Button */}
        <div className="download-button-container">
          <a
            href={resumePDF}
            download="Ayush_Srivastava_Resume.pdf"
            className="button download-button"
            data-tooltip="Size: 171Kb"
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
          <div className="tooltip">Size: 171Kb</div>
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

      {/* Update Info Box - SABSE NICHE */}
      <div className="resume-update-info animate-fade-up">
        <div className="update-badge">
          {/* <svg className="update-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg> */}
          Latest Updated Version
        </div>
        <div className="update-date">
          <svg className="update-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Last Updated: December 2025
        </div>
      </div>
    </section>
  );
};

export default Resume;