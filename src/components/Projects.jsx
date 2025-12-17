import React, { useState } from 'react';
import './css/Project.css';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaLaptopCode, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Using your original projects array with added images
const projects = [
  {
    title: "Real Estate Webapp",
    description: "Property listing platform with advanced filtering and search capabilities",
    github: "https://github.com/ayushsrivastava-01/real-estate-agency",
    image: "/images/real-estate.png",
    live: "https://sunriserealestate.netlify.app/",
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express"]
  },
  {
    title: "Number System Converter",
    description: "Advanced number system converter with real-time calculations and copy-paste functionality",
    github: "https://github.com/ayushsrivastava-01/Number-Convertor",
    image: "/images/number-converter.png", 
    live: "https://numconvertor.netlify.app/",
    tech: ["HTML5", "JavaScript", "CSS3"]
  },
  {
    title: "Weather App",
    description: "A modern, responsive webapp that provides real-time weather updates,hourly & day wise for any location.",
    github: "https://github.com/ayushsrivastava-01/weather-app",
    image: "/images/weather-app.png", 
    live: "https://skytemp.vercel.app/",
    tech: ["JavaScript", "React", "CSS3"]
  },
  {
    title: "Personal Portfolio",
    description: "My personal portfolio, a collection of my works,education and achievements.",
    github: "https://github.com/ayushsrivastava-01/my-portfolio",
    image: "/images/portfolio.png",
    live: "https://ayushsri.netlify.app/",
    tech: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind"]
  },
  {
    title: "Travel Booking System",
    description: "Travel agency website with destination exploration and booking features",
    github: "https://github.com/ayushsrivastava-01/travel-agency-webpage",
    image: "/images/travel-booking.png", 
    live: "https://xploretravelagency.netlify.app/",
    tech: ["HTML5", "CSS3", "JavaScript"]
  },
  {
    title: "Educational Platform",
    description: "Modern school website with responsive design and interactive elements",
    github: "https://github.com/ayushsrivastava-01/school-webpage",
    image: "/images/school.png", 
    live: "https://newschools.netlify.app/",
    tech: ["HTML5", "CSS3", "JavaScript"]
  },
  {
    title: "Tic Tac Toe Game",
    description: "Classic two-player game with win detection and responsive design",
    github: "https://github.com/ayushsrivastava-01/tic-tac-toe",
    image: "/images/tic-tac-toe.png", 
    live: "https://tactoex.netlify.app/",
    tech: ["JavaScript", "HTML5", "CSS3"]
  },
  {
    title: "Interactive Quiz Engine",
    description: "Dynamic quiz application with scoring system and instant feedback",
    github: "https://github.com/ayushsrivastava-01/quiz-app",
    image: "/images/quiz-app.png",
    live: "https://brainstormy.netlify.app/",
    tech: ["React", "JavaScript", "CSS3"]
  },
  {
    title: "Grocery Shopping Webapp",
    description: "Full-stack e-commerce platform with user authentication and admin dashboard",
    github: "https://github.com/ayushsrivastava-01/Grocery-Shopping-Webapp",
    image: "/images/grocery-app.png", 
    live: null,
    tech: ["MySQL", "PHP", "HTML", "React"]
  },
  {
    title: "Real-Time Chat Application",
    description: "Command-line based real-time messaging system using socket programming",
    github: "https://github.com/ayushsrivastava-01/chat-application",
    image: "/images/chat-app.png",
    live: null,
    tech: ["Java", "Socket IO", "Multithreading"]
  },
  {
    title: "Hospital Management System",
    description: "Comprehensive healthcare platform for patients and administrators",
    github: "https://github.com/ayushsrivastava-01/hospital-management-system",
    image: "/images/hospital-management.png",
    live: null,
    tech: ["Node.js", "Tailwind CSS", "JavaScript"]
  },
  {
    title: "School Management System",
    description: "Complete student and staff management system with CRUD operations",
    github: "https://github.com/ayushsrivastava-01/school-management-system",
    image: "/images/school-management.png", 
    live: null,
    tech: ["Java", "MySQL", "JDBC", "AWT", "Swing"]
  },
];

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Show only first 6 projects initially
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 6);

  const handleVisit = (url, title, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setModalMessage(`${title} is currently under development!\n\nCheck out the source code on GitHub for the latest updates.`);
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

  const toggleShowAllProjects = () => {
    setShowAllProjects(!showAllProjects);
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
        {visibleProjects.map((project, index) => (
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
            {/* Project Image */}
            <div className="project-image">
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.style.background = 'linear-gradient(135deg, #3b82f6, #10b981)';
                }}
              />
              <div className="image-overlay"></div>
              
              {/* Live/Demo Badge */}
              <div className="live-badge">
                {project.live ? 'Live' : 'Coming Soon'}
              </div>
            </div>

            <div className="project-content">
              <div className="card-header">
                <h3>{project.title}</h3>
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

              <p>{project.description}</p>

              <div className="tech-stack">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
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
                  {project.live ? 'Live Demo' : 'Coming Soon'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show All / Show Less Button */}
      {projects.length > 6 && (
        <motion.div 
          className="show-more-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            className="show-more-btn"
            onClick={toggleShowAllProjects}
          >
            {showAllProjects ? (
              <>
                <FaChevronUp /> Show Less
              </>
            ) : (
              <>
                <FaChevronDown /> Show All Projects ({projects.length - 6} more)
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Modal - Shows when clicking "Coming Soon" */}
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
              <h3>Under Development</h3>
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