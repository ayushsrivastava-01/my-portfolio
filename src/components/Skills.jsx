import React from "react";
import "./css/Skills.css";
import { motion } from "framer-motion";

import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub,
  FaJava, FaPython, FaDatabase, FaBootstrap, FaBoxOpen, FaCode, FaLaptopCode
} from "react-icons/fa";
import {
  SiMongodb, SiPhp, SiMysql, SiExpress, SiTailwindcss, SiOracle, SiSpring,
  SiCplusplus, SiC, SiIntellijidea, SiEclipseide
} from "react-icons/si";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      accentColor: "#6366f1",
      skills: [
        { name: "HTML5", icon: <FaHtml5 />, color: "#e34c26" },
        { name: "CSS3", icon: <FaCss3Alt />, color: "#264de4" },
        { name: "JavaScript", icon: <FaJs />, color: "#f7df1e" },
        { name: "React", icon: <FaReact />, color: "#61dafb" },
        { name: "Bootstrap", icon: <FaBootstrap />, color: "#7952b3" },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "#38b2ac" },
      ],
    },
    {
      title: "Backend",
      icon: "⚙️",
      accentColor: "#10b981",
      skills: [
        { name: "Node.js", icon: <FaNodeJs />, color: "#68a063" },
        { name: "Express", icon: <SiExpress />, color: "#ffffff" },
        { name: "Spring", icon: <SiSpring />, color: "#6db33f" },
        { name: "PHP", icon: <SiPhp />, color: "#777bb4" },
      ],
    },
    {
      title: "Languages",
      icon: "👨‍💻", // Changed to programmer emoji
      accentColor: "#f59e0b",
      skills: [
        { name: "Java", icon: <FaJava />, color: "#f89820" },
        { name: "C", icon: <SiC />, color: "#00599c" },
        { name: "C++", icon: <SiCplusplus />, color: "#004482" },
        { name: "Python", icon: <FaPython />, color: "#3776ab" },
      ],
    },
    {
      title: "Databases",
      icon: "🗄️",
      accentColor: "#8b5cf6",
      skills: [
        { name: "MySQL", icon: <SiMysql />, color: "#00758f" },
        { name: "SQLite", icon: <FaDatabase />, color: "#003b57" },
        { name: "Oracle", icon: <SiOracle />, color: "#f80000" },
      ],
    },
    {
      title: "Tools",
      icon: "🛠️",
      accentColor: "#ef4444",
      skills: [
        { name: "Git", icon: <FaGitAlt />, color: "#f34f29" },
        { name: "GitHub", icon: <FaGithub />, color: "#ffffff" },
        { name: "Photoshop", icon: <FaBoxOpen />, color: "#31a8ff" },
        { name: "Canvas", icon: <FaCode />, color: "#00c4cc" },
        { name: "VS Code", icon: <FaLaptopCode />, color: "#007acc" },
        { name: "IntelliJ IDEA", icon: <SiIntellijidea />, color: "#000000" },
        { name: "Eclipse", icon: <SiEclipseide />, color: "#2c2255" },
        { name: "NetBeans", icon: <FaLaptopCode />, color: "#1b6ac6" },
      ],
    },
    {
      title: "Libraries & Frameworks",
      icon: "📚",
      accentColor: "#06b6d4",
      skills: [
        { name: "React", icon: <FaReact />, color: "#61dafb" },
        { name: "Express", icon: <SiExpress />, color: "#ffffff" },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "#38b2ac" },
        { name: "Bootstrap", icon: <FaBootstrap />, color: "#7952b3" },
      ],
    },
  ];

  return (
    <div className="skills-section">
      <motion.h2
        className="skills-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My <span className="highlight">Skills</span>
      </motion.h2>

      <div className="skills-grid">
        {skillCategories.map((category, i) => (
          <motion.div
            className="skill-card"
            key={category.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: i * 0.2, 
              duration: 0.6,
              ease: "easeOut"
            }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            style={{ 
              '--accent-color': category.accentColor 
            }}
          >
            <div className="card-header">
              <span className="category-icon">{category.icon}</span>
              <h3>{category.title}</h3>
            </div>
            <div className="skills-list">
              {category.skills.map((skill, index) => (
                <motion.div 
                  className="skill-item"
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 4,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                >
                  <span 
                    className="skill-icon" 
                    style={{ color: skill.color }}
                  >
                    {skill.icon}
                  </span>
                  <span className="skill-name">{skill.name}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Animated Outline Element */}
            <div className="card-outline"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;