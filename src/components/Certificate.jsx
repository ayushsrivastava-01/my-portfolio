import React, { useState } from 'react';
import './css/Certificate.css';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import C1 from '../assets/C1.png';
import C3 from '../assets/C3.png';
import C2 from '../assets/C2.png';
import C5 from '../assets/C5.png';
import C4 from '../assets/C4.png';
import C6 from '../assets/C6.png';
import C7 from '../assets/C7.png';
import C8 from '../assets/C8.png';
import C9 from '../assets/C9.png';
import C10 from '../assets/C10.png';
import C11 from '../assets/C11.png';
import C12 from '../assets/C12.png';
import C13 from '../assets/C13.png';
import C14 from '../assets/C14.png';
import C15 from '../assets/C15.png';
import C16 from '../assets/C16.png';

import P1 from '/certificates/C1.pdf';
import P2 from '/certificates/C2.pdf';
import P3 from '/certificates/C3.pdf';
import P4 from '/certificates/C4.pdf';
import P5 from '/certificates/C5.pdf';
import P6 from '/certificates/C6.pdf';
import P7 from '/certificates/C7.pdf';
import P8 from '/certificates/C8.pdf';
import P9 from '/certificates/C9.pdf';
import P10 from '/certificates/C10.pdf';
import P11 from '/certificates/C11.pdf';
import P12 from '/certificates/C12.pdf';
import P13 from '/certificates/C13.pdf';
import P14 from '/certificates/C14.pdf';
import P15 from '/certificates/C15.pdf';
import P16 from '/certificates/C16.pdf';

const certificates = [
  { title: "Generative AI Mastermind class conducted by Outskill", image: C8, pdf: P8 },
  { title: "Web Development Internship", image: C1, pdf: P1 },
  { title: "Software Engineer Intern", image: C10, pdf: P10 },
  { title: "Web Development using Java", image: C3, pdf: P3 },
  { title: "Basics of SQL", image: C11, pdf: P11 },
  { title: "File handling in Python", image: C2, pdf: P2 },
  { title: "Problem Solving", image: C16, pdf: P16 },
  { title: "AI Design Challenges organised by VI", image: C9, pdf: P9 },
  { title: "Career in Tech", image: C5, pdf: P4 },
  { title: "Intermediate Javascript", image: C12, pdf: P12 },
  { title: "Data Science & Machine Learning", image: C4, pdf: P5 },
  { title: "Basics of Python", image: C13, pdf: P13 },
  { title: "Technical Workshop", image: C6, pdf: P6 },
  { title: "Core JAVA", image: C14, pdf: P14 },
  { title: "Naukri Campus Contest", image: C7, pdf: P7 },
  { title: "Basics of React.js", image: C15, pdf: P15 },
];

const Certificate = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleCertificates = showAll ? certificates : certificates.slice(0, 9);

  return (
    <section className="certificates-section">
      <motion.h2
        className="section-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        My <span className="highlight">Certificates</span>
      </motion.h2>

      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Professional achievements and learning milestones
      </motion.p>

      <div className="certificates-grid">
        {visibleCertificates.map((cert, index) => (
          <motion.div
            className="certificate-card"
            key={index}
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.1
            }}
            viewport={{ once: true, margin: "-30px" }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <div className="card-image-container">
              <motion.img 
                src={cert.image} 
                alt={cert.title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <h4>{cert.title}</h4>

            <motion.a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="view-button"
              download={false}
              whileHover={{ 
                scale: 1.03,
              }}
              whileTap={{ scale: 0.98 }}
            >
              View Certificate
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* Show More / Show Less Button - Only show if more than 9 certificates */}
      {certificates.length > 9 && (
        <motion.div 
          className="show-more-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            className="show-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <FaChevronUp /> Show Less
              </>
            ) : (
              <>
                <FaChevronDown /> Show All Certificates ({certificates.length - 9} more)
              </>
            )}
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Certificate;