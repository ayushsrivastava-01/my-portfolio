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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  // Encode form data for Netlify
  const encode = (data) =>
    Object.keys(data)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const botField = formData.get("bot-field");

    // Honeypot check
    if (botField) {
      console.log("Spam detected!");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const domain = email.split("@")[1];

    if (!emailRegex.test(email) || !validDomains.includes(domain)) {
      alert("Please use a valid email address (Gmail, Yahoo, Outlook, Hotmail)");
      setLoading(false);
      return;
    }

    try {
      // ✅ Proper Netlify POST submission
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          name,
          email,
          message,
          "bot-field": botField,
        }),
      });

      setFormSubmitted(true);
      e.target.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
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
