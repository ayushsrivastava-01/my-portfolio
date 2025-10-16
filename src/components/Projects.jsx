import React from 'react';
import './css/Project.css';
import { motion } from 'framer-motion';
import {
  FaLaptopCode, FaHospital, FaSchool, FaBrain, FaHome,
  FaGamepad, FaPlane, FaShoppingCart, FaComments, FaGithub, FaCalculator
} from 'react-icons/fa';

const projects = [
  {
    title: "Number System Converter",
    description: "A web-based number system converter and calculator (binary, octal, decimal, hexadecimal) with copy & swap features.",
    github: "https://github.com/ayushsrivastava-01/Number-Convertor",
    icon: <FaCalculator />
  },
  {
    title: "Grocery Shopping Webapp",
    description: "A full-stack grocery shopping web application with user and admin panel both.",
    github: "https://github.com/ayushsrivastava-01/Grocery-Shopping-Webapp",
    icon: <FaShoppingCart />
  },
  {
    title: "Chat Application",
    description: "A real-time chat app using socket in Java. Command-line based.",
    github: "https://github.com/ayushsrivastava-01/chat-application",
    icon: <FaComments />
  },
  {
    title: "Hospital Website",
    description: "Client/admin-side hospital website with HTML, Tailwind, JS, Node & Express.",
    github: "https://github.com/ayushsrivastava-01/hospital-management-system",
    icon: <FaHospital />
  },
  {
    title: "School Website",
    description: "Static school website using HTML, CSS, and JS.",
    github: "https://github.com/ayushsrivastava-01/school-webpage",
    icon: <FaSchool />
  },
  {
    title: "Quiz App",
    description: "Quiz app to test knowledge and display results with answer feedback.",
    github: "https://github.com/ayushsrivastava-01/quiz-app",
    icon: <FaBrain />
  },
  {
    title: "Real Estate Website",
    description: "Platform to buy/sell properties. Node.js + Express backend.",
    github: "https://github.com/ayushsrivastava-01/real-estate-agency",
    icon: <FaHome />
  },
  {
    title: "School Management System",
    description: "Manage student/admin records. CRUD operations.",
    github: "https://github.com/ayushsrivastava-01/school-management-system",
    icon: <FaLaptopCode />
  },
  {
    title: "Travel Agency Website",
    description: "Helps users plan journeys with a modern UI.",
    github: "https://github.com/ayushsrivastava-01/travel-agency-webpage",
    icon: <FaPlane />
  },
  {
    title: "Tic Tac Toe",
    description: "A simple two-player Tic Tac Toe game with result tracking.",
    github: "https://github.com/ayushsrivastava-01/tic-tac-toe",
    icon: <FaGamepad />
  },
];

const Projects = () => {
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
            transition={{ delay: index * 0.2, duration: 0.6 }}
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
                View on GitHub <FaGithub />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
