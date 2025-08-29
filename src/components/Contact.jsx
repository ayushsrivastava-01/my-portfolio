import React, { useEffect, useState } from "react";
import "./css/Contact.css";
import { FaInstagram, FaLinkedin, FaTelegram, FaGithub,FaEnvelope } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';

const Contact = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className="contact-section">
      <div className={`contact-header ${animate ? "show" : ""}`}>
        <h2 className="contact-heading">Let's Connect</h2>
        <p className="contact-subheading">
          Feel free to contact. I'm just one click away...
        </p>
      </div>

      <div className={`contact-container ${animate ? "show" : ""}`}>
        <div className="contact-box email-box">
          <FaEnvelope className="icon" />
          <h3>Email Me</h3>
          <p>
            <a href="mailto:ayushsrivastava1854@gmail.com">
              ayushsrivastava1854@gmail.com
            </a>
          </p>
        </div>

        <div className="contact-box social-box">
          <h3>Social Platforms</h3>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/ayushsrivastava_01"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-srivastava01"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://telegram.me/ayushsrivastava_01"
              target="_blank"
              rel="noreferrer"
            >
              <FaTelegram />
            </a>
            <a
              href="https://github.com/ayushsrivastava-01"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.threads.com/@ayushsrivastava_01"
              target="_blank"
              rel="noreferrer"
            >
              <FaThreads />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
