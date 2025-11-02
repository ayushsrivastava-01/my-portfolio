import React, { useEffect, useState } from "react";
import "./css/Contact.css";
import {
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const Contact = () => {
  const [animate, setAnimate] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    try {
      await fetch("/", {
        method: "POST",
        body: formData,
      });
      setFormSubmitted(true);
      setLoading(false);
      e.target.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="contact-section">
      {/* Hidden form for Netlify */}
      <form name="contact" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
      </form>

      <div className={`contact-header ${animate ? "show" : ""}`}>
        <h2 className="contact-heading">Let's Connect</h2>
        <p className="contact-subheading">
          Feel free to reach out — I’m just one click away from you !!!
        </p>
      </div>

      <div className={`contact-container ${animate ? "show" : ""}`}>
        {/* 📧 Email + Social Box */}
        <div className="contact-box info-box">
          <FaEnvelope className="icon" />
          <h3>Get in Touch</h3>

          <a
            href="mailto:ayushsrivastava1854@gmail.com"
            className="email-link"
          >
            ayushsrivastava1854@gmail.com
          </a><br /><br /><br />

          <h4 className="social-heading">Social Platforms</h4>
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
              href="https://www.threads.net/@ayushsrivastava_01"
              target="_blank"
              rel="noreferrer"
            >
              <FaThreads />
            </a>
          </div>
        </div>

        {/* 💌 Contact Form Box */}
        <div className="contact-box form-box">
          <h3>Send a Message</h3>

          {formSubmitted ? (
            <div className="thank-you-message">
              <p>Thank you! Your message has been sent successfully☑️</p>
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
              <p hidden>
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
