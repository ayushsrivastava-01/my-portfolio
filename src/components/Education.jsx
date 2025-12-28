import React from "react";
import { motion } from "framer-motion";
import "./css/Education.css"

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institute: "Meena Shah Institute of Technology & Management, Gonda, UP",
    date: "September 2022 - August 2025",
    score: "81.25%",
    status: "Completed",
    icon: "🎓",
  },
  {
    degree: "Intermediate (12th)",
    institute: "UP Board",
    date: "2021 - 2022",
    score: "74.20%",
    status: "Completed",
    icon: "📚",
  },
  {
    degree: "High School (10th)",
    institute: "UP Board",
    date: "2019 - 2020",
    score: "84.50%",
    status: "Completed",
    icon: "🏫",
  },
];

const Education = () => {
  return (
    <section className="edu-section" id="education">
      <motion.div
        className="edu-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="edu-title">
          <span className="title-icon">📚</span>
          Educational Qualifications
        </h2>
        <p className="edu-subtitle">
          My academic progression through the years
        </p>
      </motion.div>

      <div className="single-line-timeline">
        <div className="single-line" />
        
        {education.map((item, index) => (
          <motion.div
            key={index}
            className="single-line-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="dot-on-line">
              <div className="line-dot">{item.icon}</div>
            </div>

            <div className="education-card">
              <div className="card-top">
                <h3 className="degree">{item.degree}</h3>
                <div className="institute-info">
                  <span className="institute-icon">🏛️</span>
                  <span className="institute">{item.institute}</span>
                </div>
              </div>

              <div className="card-details-grid">
                <div className="detail-box">
                  <div className="detail-label">Duration</div>
                  <div className="detail-value">
                    <span className="date-icon">📅</span>
                    {item.date}
                  </div>
                </div>
                
                <div className="detail-box">
                  <div className="detail-label">Percentage</div>
                  <div className="detail-value score-highlight">
                    <span className="score-icon">🎯</span>
                    {item.score}
                  </div>
                </div>
              </div>

              <div className="status-tag">
                <span className="status-indicator" />
                {item.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;