import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ ADDED
import "./css/About.css";
import Lottie from "lottie-react";
import profileImage from "../assets/ayush.jpg";
import codingAnimation from "../assets/about.json";

const quotes = [
  "Code is like humor. When you have to explain it, it's bad.",
  "Programs must be written for people to read.",
  "Simplicity is the soul of efficiency.",
  "First, solve the problem. Then, write the code.",
  "Clean code always looks like it was written by someone who cares.",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const About = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate(); // ✅ ADDED

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      id="about"
      className="about-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="container" variants={itemVariants}>
        <h1 style={{ display: "none" }}>
          About Ayush Srivastava - Full Stack Developer
        </h1>

        <h2 className="section-title">
          About <span>Me</span>
        </h2>

        <div className="about-wrapper">
          {/* ================= IMAGE CARD ================= */}
          <motion.div
            className="profile-card jumping-card image-card"
            variants={itemVariants}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <img
              src={profileImage}
              alt="Ayush Srivastava - Full Stack Developer"
            />
            <h3>Ayush Srivastava</h3>
            <p className="title">Full-Stack Developer</p>

            {/* 🔁 CHANGING QUOTE */}
            <p className="quote">"{quotes[quoteIndex]}"</p>

            {/* 🎓 EDUCATION BUTTON — EXACTLY HERE */}
            <button
              className="education-btn"
              onClick={() => navigate("/education")}
            >
              View My Education 🎓
            </button>
          </motion.div>

          {/* ================= ABOUT TEXT ================= */}
          <motion.div
            className="about-text jumping-card"
            variants={itemVariants}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <div
              className="about-text-content"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div className="about-lottie">
                <Lottie animationData={codingAnimation} loop />
              </div>

              <p style={{ textAlign: "center" }}>
                I'm <strong>Ayush Srivastava</strong>, a Full-Stack Developer passionate about building clean and efficient web experiences. I blend creativity with functionality, constantly exploring the latest tech. I enjoy contributing to open-source projects and leveling up my skills. I believe great code is intuitive and user-focused, turning ideas into impactful digital solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ================= Mission Section ================= */}
        <motion.div className="core-mission-section" variants={itemVariants}>
          <h3 className="mission-title">My Mission & Core Values</h3>
          <div className="mission-cards">
            {[
              {
                emoji: "🌟",
                title: "Mission",
                text: "To craft impactful and accessible digital experiences that empower users and elevate businesses.",
              },
              {
                emoji: "🔍",
                title: "Focus",
                text: "Writing clean, scalable code and always staying updated with modern technologies and best practices.",
              },
              {
                emoji: "💬",
                title: "Core Values",
                text: "Creativity, Integrity, Empathy, and a strong sense of Responsibility in every line of code I write.",
              },
            ].map((card, i) => (
              <motion.div key={i} className="mission-card" variants={itemVariants}>
                <h4>
                  {card.emoji} {card.title}
                </h4>
                <p>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= What I Do Section ================= */}
        <motion.div className="what-i-do-section" variants={itemVariants}>
          <h3 className="what-title">What I Do ?</h3>
          <div className="what-cards">
            {[
              {
                emoji: "🖥️",
                title: "Frontend Development",
                text: "Building responsive and dynamic UIs with HTML, CSS, JavaScript, React & Tailwind.",
              },
              {
                emoji: "🧠",
                title: "Backend Development",
                text: "Creating robust APIs using Node.js, Express, and integrating with MySQL & MongoDB.",
              },
              {
                emoji: "🎨",
                title: "UI/UX Design",
                text: "Designing clean and intuitive user experiences with Figma & Adobe tools.",
              },
              {
                emoji: "⚙️",
                title: "Deployment",
                text: "Deploying web apps on platforms like Vercel & Netlify, with focus on performance.",
              },
            ].map((service, i) => (
              <motion.div key={i} className="what-card" variants={itemVariants}>
                <h4>
                  {service.emoji} {service.title}
                </h4>
                <p>{service.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
