import React, { useEffect, useState } from "react";
import "./css/Contact.css";
import successAnimation from "../assets/success.json";
import emailAnimation from "../assets/contact.json";

import {
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaGithub,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import Lottie from "lottie-react";

const Contact = () => {
  const [animate, setAnimate] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleSubmit = (e) => {
    // Honeypot & email validation before native submit
    const form = e.target;
    const botField = form.querySelector('input[name="bot-field"]').value;
    const email = form.querySelector('input[name="email"]').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const domain = email.split("@")[1];

    if (botField) {
      // Spam detected → stop submission
      e.preventDefault();
      console.log("Spam detected!");
      return;
    }

    if (!emailRegex.test(email) || !validDomains.includes(domain)) {
      e.preventDefault();
      alert("Please use a valid email address (Gmail, Yahoo, Outlook, Hotmail)");
      return;
    }

    // Allow native submit → Netlify email notification will trigger
    setFormSubmitted(true);
  };

  return (
    <div className="contact-section">
      <div className={`contact-header ${animate ? "show" : ""}`}>
        <h2 className="contact-heading">Let's Connect</h2>
        <p className="contact-subheading">
          Feel free to reach out — I’m just one click away from you !!!
        </p>
      </div>

      <div className={`contact-container ${animate ? "show" : ""}`}>
        {/* INFO BOX */}
        <div className="contact-box info-box">
          <div className="lottie-icon">
            <Lottie animationData={emailAnimation} loop />
          </div>

          <h3>Get in Touch</h3>
          <a href="mailto:ayushsrivastava1854@gmail.com" className="email-link">
            ayushsrivastava1854@gmail.com
          </a>

          <br /><br /><br />

          <h4 className="social-heading">Social Platforms</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/ayushsrivastava_01" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/ayush-srivastava01" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://telegram.me/ayushsrivastava_01" target="_blank" rel="noreferrer">
              <FaTelegram />
            </a>
            <a href="https://github.com/ayushsrivastava-01" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.threads.net/@ayushsrivastava_01" target="_blank" rel="noreferrer">
              <FaThreads />
            </a>
          </div>
        </div>

        {/* FORM BOX */}
        <div className="contact-box form-box">
          <h3>Send a Message</h3>

          {formSubmitted ? (
            <div className="thank-you-message">
              <Lottie animationData={successAnimation} loop={false} style={{ height: 150, margin: "0 auto 1rem" }} />
              <p>Thank you! Your message has been sent successfully ☑️</p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />

              {/* Honeypot field */}
              <p style={{ display: "none" }}>
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>

              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>

              <div className="form-group">
                <textarea name="message" rows="4" placeholder="Your Message" required></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
