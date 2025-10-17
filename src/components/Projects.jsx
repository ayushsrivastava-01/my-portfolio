import React, { useState } from 'react';
import './css/Project.css';
import { motion } from 'framer-motion';
import {
  FaLaptopCode, FaHospital, FaSchool, FaBrain, FaHome,
  FaGamepad, FaPlane, FaShoppingCart, FaComments, FaGithub, FaCalculator
} from 'react-icons/fa';

const projects = [
  {
    title: "Number System Converter",
    description: "A web-based number system converter and calculator with copy & swap features.",
    github: "https://github.com/ayushsrivastava-01/Number-Convertor",
    live: "https://numconvertor.netlify.app/",
    icon: <FaCalculator />
  },
  {
    title: "Grocery Shopping Webapp",
    description: "A full-stack grocery shopping web app with user and admin panels.",
    github: "https://github.com/ayushsrivastava-01/Grocery-Shopping-Webapp",
    icon: <FaShoppingCart />
  },
  {
    title: "Chat Application",
    description: "A real-time chat app using socket in Java (command-line based).",
    github: "https://github.com/ayushsrivastava-01/chat-application",
    icon: <FaComments />
  },
  {
    title: "Hospital Website",
    description: "Hospital website for clients and admins using Node.js and Tailwind CSS.",
    github: "https://github.com/ayushsrivastava-01/hospital-management-system",
    icon: <FaHospital />
  },
  {
    title: "School Website",
    description: "Static school website built with HTML, CSS, and JS.",
    github: "https://github.com/ayushsrivastava-01/school-webpage",
    live: "https://newschools.netlify.app/",
    icon: <FaSchool />
  },
  {
    title: "Quiz App",
    description: "Quiz app with instant feedback and score display.",
    github: "https://github.com/ayushsrivastava-01/quiz-app",
    icon: <FaBrain />
  },
  {
    title: "Real Estate Website",
    description: "A responsive real estate site to list and explore properties.",
    github: "https://github.com/ayushsrivastava-01/real-estate-agency",
    icon: <FaHome />
  },
  {
    title: "School Management System",
    description: "A record management system for schools with CRUD operations.",
    github: "https://github.com/ayushsrivastava-01/school-management-system",
    icon: <FaLaptopCode />
  },
  {
    title: "Travel Agency Website",
    description: "Travel agency site to plan journeys with a modern interface.",
    github: "https://github.com/ayushsrivastava-01/travel-agency-webpage",
    icon: <FaPlane />
  },
  {
    title: "Tic Tac Toe",
    description: "A simple two-player Tic Tac Toe game with winner logic.",
    github: "https://github.com/ayushsrivastava-01/tic-tac-toe",
    icon: <FaGamepad />
  },
];

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleVisit = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      setModalMessage("🚧 Work in progress...\n\n🛠️ Project is not live yet...\n\n💻 You can check it on GitHub!");
      setModalOpen(true);
    }
  };

  return (
    <section className="projects-section">
      <motion.h2
        className="projects-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Projects
      </motion.h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="project-icon">{project.icon}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-buttons">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                GitHub <FaGithub />
              </a>
              <button
                className="project-link visit-link"
                onClick={() => handleVisit(project.live)}
              >
                View Live
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <button className="modal-close" onClick={() => setModalOpen(false)}>OK</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
