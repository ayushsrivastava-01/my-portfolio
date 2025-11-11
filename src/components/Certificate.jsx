import React from 'react';
import './css/Certificate.css';
import { motion } from 'framer-motion';

import C1 from '../assets/C1.png';
import C3 from '../assets/C3.png';
import C2 from '../assets/C2.png';
import C5 from '../assets/C5.png';
import C4 from '../assets/C4.png';
import C6 from '../assets/C6.png';
import C7 from '../assets/C7.png';
import C8 from '../assets/C8.png';

import P1 from '/certificates/C1.pdf';
import P2 from '/certificates/C2.pdf';
import P3 from '/certificates/C3.pdf';
import P4 from '/certificates/C4.pdf';
import P5 from '/certificates/C5.pdf';
import P6 from '/certificates/C6.pdf';
import P7 from '/certificates/C7.pdf';
import P8 from '/certificates/C8.pdf';

const certificates = [
  { title: "Generative AI Mastermind class conducted by Outskill", image: C8, pdf: P8 },
  { title: "Web Development Internship", image: C1, pdf: P1 },
  { title: "Web Development using Java", image: C3, pdf: P3 },
  { title: "File handling in Python", image: C2, pdf: P2 },
  { title: "Career in Tech", image: C5, pdf: P4 },
  { title: "Data Science & Machine Learning", image: C4, pdf: P5 },
  { title: "Technical Workshop", image: C6, pdf: P6 },
  { title: "Naukri Campus Contest", image: C7, pdf: P7 },
];

const Certificate = () => {
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
        {certificates.map((cert, index) => (
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
                whileHover={{ scale: 1.02 }}
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
    </section>
  );
};

export default Certificate;