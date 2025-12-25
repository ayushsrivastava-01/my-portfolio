import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Certificate from "./components/Certificate";
import Resume from "./components/Resume";
import Projects from "./components/Projects";
import Analytics from "./components/Analytics";
import ScrollToTop from "./components/ScrollToTop";

function TitleUpdater() {
  const location = useLocation();
  
  useEffect(() => {
    const pageTitles = {
      "/": "Portfolio",
      "/about": "About",
      "/projects": "Projects",
      "/skills": "Skills",
      "/contact": "Contact",
      "/certificate": "Certificates",
      "/resume": "Resume"
    };
    
    const currentPage = pageTitles[location.pathname] || "Portfolio";
    document.title = `Ayush Srivastava | ${currentPage}`;
    

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const descriptions = {
        "/": "Ayush Srivastava - Full Stack Developer specializing in React, Node.js, and modern web technologies. View my projects, resume, and get in touch.",
        "/about": "Learn more about Ayush Srivastava - Full Stack Developer, skills, experience and background.",
        "/projects": "View projects by Ayush Srivastava - Full Stack Developer including web applications and software solutions.",
        "/skills": "Technical skills and expertise of Ayush Srivastava in web development and programming.",
        "/contact": "Contact Ayush Srivastava - Full Stack Developer for collaborations, job opportunities or queries.",
        "/certificate": "Certifications and qualifications earned by Ayush Srivastava in web development.",
        "/resume": "Professional resume and work experience of Ayush Srivastava - Full Stack Developer."
      };
      metaDescription.setAttribute('content', descriptions[location.pathname] || descriptions["/"]);
    }
  }, [location]);
  
  return null;
}

function App() {
  return (
    <>
      <Router>
        <Analytics /> 
        <TitleUpdater />
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;