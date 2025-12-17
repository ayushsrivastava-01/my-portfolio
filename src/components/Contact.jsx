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

  // Encode function for Netlify Forms
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  // Enhanced form validation function
  const validateForm = (data) => {
    const errors = [];

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      errors.push("Please enter a valid name (at least 2 characters)");
    }

    // Message validation
    if (!data.message || data.message.trim().length < 10) {
      errors.push("Message should be at least 10 characters long");
    }

    if (data.message && data.message.length > 1000) {
      errors.push("Message should not exceed 1000 characters");
    }

    // Check for only spaces
    if (data.message && data.message.trim() === "") {
      errors.push("Please enter a meaningful message");
    }

    // Basic spam filter
    const spamKeywords = [
      "http://",
      "https://",
      "www.",
      ".com",
      "buy now",
      "click here",
      "make money",
      "earn fast",
    ];
    
    const hasSpam = spamKeywords.some((keyword) =>
      data.message.toLowerCase().includes(keyword) ||
      data.name.toLowerCase().includes(keyword)
    );

    if (hasSpam) {
      errors.push("Please remove promotional or spam content from your message");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    // Extract form data
    const formValues = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      message: formData.get("message") || "",
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      "protonmail.com",
    ];
    
    const emailDomain = formValues.email.split("@")[1];

    if (!emailRegex.test(formValues.email) || !validDomains.includes(emailDomain)) {
      alert(
        "Please use a valid email address (Gmail, Yahoo, Outlook, Hotmail, iCloud, ProtonMail)"
      );
      setLoading(false);
      return;
    }

    // Additional form validation
    if (!validateForm(formValues)) {
      setLoading(false);
      return;
    }

    try {
      // Netlify Forms submission
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": form.getAttribute("name"),
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          message: formValues.message.trim(),
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        form.reset();
        
        // Reset form submission after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-section">
      <div className={`contact-header ${animate ? "show" : ""}`}>
        <h2 className="contact-heading">Let's Connect</h2>
        <p className="contact-subheading">
          Feel free to reach out — I'm just one click away from you !!!
        </p>
      </div>

      <div className={`contact-container ${animate ? "show" : ""}`}>
        {/* 📧 INFO BOX */}
        <div className="contact-box info-box">
          <div className="lottie-icon">
            <Lottie animationData={emailAnimation} loop />
          </div>

          <h3>Get in Touch</h3>

          <a
            href="mailto:ayushsrivastava1854@gmail.com"
            className="email-link"
          >
            ayushsrivastava1854@gmail.com
          </a>

          <br />
          <br />
          <br />

          <h4 className="social-heading">Social Platforms</h4>

          <div className="social-icons">
            <a
              href="https://www.instagram.com/ayushsrivastava_01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/in/ayush-srivastava01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://telegram.me/ayushsrivastava_01"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <FaTelegram />
            </a>

            <a
              href="https://github.com/ayushsrivastava-01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.threads.net/@ayushsrivastava_01"
              target="_blank"
              rel="noreferrer"
              aria-label="Threads"
            >
              <FaThreads />
            </a>
          </div>

          <div className="response-time">
            <p>⏱️ Response Time: Usually within 24 hours</p>
          </div>
        </div>

        {/* 💌 FORM BOX */}
        <div className="contact-box form-box">
          <h3>Send a Message</h3>

          {formSubmitted ? (
            <div className="thank-you-message">
              <Lottie
                animationData={successAnimation}
                loop={false}
                style={{ height: 150, margin: "0 auto 1rem" }}
              />
              <h4>Message Sent Successfully! ✅</h4>
              <p>Thank you for reaching out. I'll get back to you soon!</p>
              <p className="success-note">
                You should receive a confirmation email shortly.
              </p>
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

              {/* Honeypot field for spam protection */}
              <p className="hidden-field">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  minLength={2}
                  maxLength={50}
                  title="Please enter at least 2 characters"
                />
                <span className="field-info">Min. 2 characters</span>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  required
                  pattern="^[^\s@]+@(gmail|yahoo|outlook|hotmail|icloud|protonmail)\.com$"
                  title="Please use Gmail, Yahoo, Outlook, Hotmail, iCloud, or ProtonMail"
                />
                <span className="field-info">Only valid email domains</span>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message *"
                  required
                  minLength={10}
                  maxLength={1000}
                  title="Please write at least 10 characters"
                ></textarea>
                <span className="field-info">Min. 10 characters, Max. 1000</span>
              </div>

              <div className="form-footer">
                <p className="required-note">* Required fields</p>
                <button
                  type="submit"
                  className={`submit-btn ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>

              <p className="privacy-note">
                Your information is safe with me. I don't share your data with anyone.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;