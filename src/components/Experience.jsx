import React, { useEffect, useRef, useState } from "react";
import "./css/Experience.css";

const Experience = () => {
  const [visible, setVisible] = useState({});
  const cardsRef = useRef([]);

  const experiences = [
    {
      id: 1,
      company: "Tata Consultancy Services",
      role: "Graduate Trainee",
      date: "Jan 2026 – Present",
      location: "Noida, India",
      description: "Working as a Graduate Trainee in Tata Consultancy Services and gaining hands-on exposure to enterprise software development, Team work, and modern web technologies.",
      current: true
    },
    {
      id: 2,
      company: "Sipher Web Academy",
      role: "Frontend Development Intern",
      date: "Aug 2025 - Sep 2025",
      location: "Remote",
      description: "Completed training in enterprise IT solutions, frontend technologies, and some more mordern tech stacks.",
      current: false
    },
    {
      id: 3,
      company: "Barrownz Learning Academy",
      role: "Java Developer Intern",
      date: "December 2023",
      location: "Remote",
      description: "Built responsive UI, portfolio websites and optimized performance for better user experience.",
      current: false
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="experience-section">
      {/* Animated Background - Fixed so it doesn't go to footer */}
      <div className="bg-animation-fixed">
        <div className="bg-blur bg-1"></div>
        <div className="bg-blur bg-2"></div>
        <div className="bg-blur bg-3"></div>
      </div>

      <div className="exp-container">
        {/* Heading Center */}
        <div className="exp-header-center">
          {/* <div className="header-badge">📌 My Journey</div> */}
          <h1 className="exp-title-center">
             <span className="gradient-text">Professional Experience</span>
          </h1>
          <div className="header-line-center"></div>
          {/* <p className="header-subtitle">Building digital solutions with passion & expertise</p> */}
        </div>

        {/* Timeline with Connection */}
        <div className="timeline-wrapper">
          <div className="timeline-center-line"></div>
          
          <div className="exp-list">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                id={`exp-${exp.id}`}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`exp-item-wrapper ${visible[`exp-${exp.id}`] ? "visible" : ""}`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* Timeline Dot */}
                <div className="timeline-dot-wrapper">
                  <div className={`timeline-dot ${exp.current ? "active" : ""}`}>
                    <div className="dot-inner"></div>
                  </div>
                </div>

                {/* Card */}
                <div className="exp-card-connected">
                  <div className="exp-card-inner">
                    <div className="exp-card-header">
                      <div>
                        <h2 className="exp-role">{exp.role}</h2>
                        <h3 className="exp-company">{exp.company}</h3>
                      </div>
                      {exp.current && <span className="current-tag">● Currently Working</span>}
                    </div>

                    <div className="exp-meta">
                      <span>📅 {exp.date}</span>
                      <span>📍 {exp.location}</span>
                    </div>

                    <p className="exp-description">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;