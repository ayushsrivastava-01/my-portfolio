import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react"; // ADD THIS IMPORT
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
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // ADD THIS SEO CODE - Place it right here inside the App function
  useEffect(() => {
    document.title = "Ayush Srivastava - Full Stack Developer Portfolio";
    
    // Optional: Add meta description dynamically
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Ayush Srivastava - Full Stack Developer specializing in React, Node.js, and modern web technologies. View my projects, resume, and get in touch.');
    }
  }, []);

  return (
    <>
      <Router>
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