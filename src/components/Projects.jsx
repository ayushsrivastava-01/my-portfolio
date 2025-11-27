import React, { useState } from 'react';
import './css/Project.css';
import { motion } from 'framer-motion';
import {
  FaGithub, FaExternalLinkAlt, FaLaptopCode
} from 'react-icons/fa';

const projects = [
  {
    title: "Number System Converter",
    description: "Advanced number system converter with real-time calculations and copy-paste functionality",
    github: "https://github.com/ayushsrivastava-01/Number-Convertor",
    live: "https://numconvertor.netlify.app/",
    icon: "🧮",
    tech: ["HTML5", "JavaScript", "CSS3"]
  },
  {
    title: "Grocery Shopping Webapp",
    description: "Full-stack e-commerce platform with user authentication and admin dashboard",
    github: "https://github.com/ayushsrivastava-01/Grocery-Shopping-Webapp",
    icon: "🛒",
    tech: ["MySQL", "PHP", "HTML", "React"]
  },
  {
    title: "Real-Time Chat Application",
    description: "Command-line based real-time messaging system using socket programming",
    github: "https://github.com/ayushsrivastava-01/chat-application",
    icon: "💬",
    tech: ["Java", "Socket IO", "Multithreading"]
  },
  {
    title: "Hospital Management System",
    description: "Comprehensive healthcare platform for patients and administrators",
    github: "https://github.com/ayushsrivastava-01/hospital-management-system",
    icon: "🏥",
    tech: ["Node.js", "Tailwind CSS", "JavaScript"]
  },
  {
    title: "Educational Platform",
    description: "Modern school website with responsive design and interactive elements",
    github: "https://github.com/ayushsrivastava-01/school-webpage",
    live: "https://newschools.netlify.app/",
    icon: "🎓",
    tech: ["HTML5", "CSS3", "JavaScript"]
  },
  {
    title: "Interactive Quiz Engine",
    description: "Dynamic quiz application with scoring system and instant feedback",
    github: "https://github.com/ayushsrivastava-01/quiz-app",
    icon: "🧠",
    tech: ["React", "JavaScript", "CSS3"]
  },
  {
    title: "Real Estate Webapp",
    description: "Property listing platform with advanced filtering and search capabilities",
    github: "https://github.com/ayushsrivastava-01/real-estate-agency",
    icon: "🏠",
    tech: ["HTML5", "CSS3", "JavaScript","Node.js","Express"]
  },
  {
    title: "School Management System",
    description: "Complete student and staff management system with CRUD operations",
    github: "https://github.com/ayushsrivastava-01/school-management-system",
    icon: "💻",
    tech: ["Java", "MySQL", "JDBC","AWT","Swing"]
  },
  {
    title: "Travel Booking System",
    description: "Travel agency website with destination exploration and booking features",
    github: "https://github.com/ayushsrivastava-01/travel-agency-webpage",
    icon: "✈️",
    tech: ["HTML5", "CSS3", "JavaScript"]
  },
  {
    title: "Tic Tac Toe Game",
    description: "Classic two-player game with win detection and responsive design",
    github: "https://github.com/ayushsrivastava-01/tic-tac-toe",
    icon: "🎮",
    tech: ["JavaScript", "HTML5", "CSS3"]
  },
];

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleVisit = (url, title, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setModalMessage(`${title} is currently in development!\n\nCheck out the source code on GitHub for the latest updates.`);
      setModalOpen(true);
    }
  };

  const handleGitHubClick = (url, event) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <section className="projects-section">
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="projects-title">My Projects</h2>
        <p className="projects-subtitle">A collection of my work showcasing various technologies and solutions</p>
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
          >
            <div className="card-header">
              <div className="project-icon">{project.icon}</div>
              <div className="project-links">
                <a 
                  href={project.github} 
                  onClick={(e) => handleGitHubClick(project.github, e)}
                  className="link-btn"
                  title="View Source Code"
                >
                  <FaGithub />
                </a>
                {project.live && (
                  <a 
                    href={project.live} 
                    onClick={(e) => handleVisit(project.live, project.title, e)}
                    className="link-btn live"
                    title="View Live Demo"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>

            <div className="card-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="tech-stack">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-actions">
              <a 
                href={project.github} 
                onClick={(e) => handleGitHubClick(project.github, e)}
                className="action-btn code-btn"
              >
                <FaGithub /> Source Code
              </a>
              <button 
                className={`action-btn demo-btn ${!project.live ? 'coming-soon' : ''}`}
                onClick={(e) => handleVisit(project.live, project.title, e)}
              >
                {project.live ? <FaExternalLinkAlt /> : <FaLaptopCode />}
                {project.live ? 'Live Demo' : 'View Code'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <motion.div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="modal-content">
              <div className="modal-icon">🚧</div>
              <h3>Work in Progress</h3>
              <p>{modalMessage}</p>
              <button 
                className="modal-cta"
                onClick={handleModalClose}
              >
                Continue Exploring
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Projects;