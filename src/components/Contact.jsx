import React, { useEffect, useState } from "react";
import "./css/Contact.css";
import successAnimation from "../assets/success.json";
import emailAnimation from "../assets/contact.json";
import { FaInstagram, FaLinkedin, FaTelegram, FaGithub } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import Lottie from "lottie-react";

const Contact = () => {
  const [animate, setAnimate] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const validateForm = (data) => {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push("Please enter a valid name (at least 2 characters)");
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.push("Message should be at least 10 characters long");
    }

    if (data.message && data.message.length > 1000) {
      errors.push("Message should not exceed 1000 characters");
    }

    if (data.message && data.message.trim() === "") {
      errors.push("Please enter a meaningful message");
    }

    const spamKeywords = [
      "http://", "https://", "www.", ".com",
      "buy now", "click here", "make money", "earn fast",
    ];

    const hasSpam = spamKeywords.some(
      (keyword) =>
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

    const formValues = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      message: formData.get("message") || "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = [
      "gmail.com", "yahoo.com", "outlook.com",
      "hotmail.com", "icloud.com", "protonmail.com",
    ];

    const emailDomain = formValues.email.split("@")[1];

    if (!emailRegex.test(formValues.email) || !validDomains.includes(emailDomain)) {
      alert("Please use a valid email address (Gmail, Yahoo, Outlook, Hotmail, iCloud, ProtonMail)");
      setLoading(false);
      return;
    }

    if (!validateForm(formValues)) {
      setLoading(false);
      return;
    }

    try {
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
        setCharCount(0);
        setTimeout(() => setFormSubmitted(false), 5000);
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

      {/* Header */}
      <div className={`contact-header ${animate ? "show" : ""}`}>
        <div className="contact-label">
          <span className="label-dot"></span>
          Contact
          <span className="label-dot"></span>
        </div>
        <h2 className="contact-heading">
          {"Let's "}
          <em>Connect</em>
        </h2>
        <p className="contact-subheading">
          {"I'm just one message away — drop me a line anytime."}
        </p>
      </div>

      {/* Grid */}
      <div className={`contact-container ${animate ? "show" : ""}`}>

        {/* LEFT: Info Card */}
        <div className="contact-box info-box">
          <div className="avatar-wrap">AS</div>
          <div className="info-name">Ayush Srivastava</div>
          <div className="info-tagline">Developer & Creator</div>

          <a href="mailto:ayushsrivastava1854@gmail.com" className="email-row">
            <div className="email-icon-wrap">
              <svg viewBox="0 0 24 24" className="email-svg">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <span className="email-text">ayushsrivastava1854@gmail.com</span>
          </a>

          <div className="info-divider"></div>
          <div className="social-section-label">Find me on</div>

          <div className="social-icons">
            <a
              href="https://www.instagram.com/ayushsrivastava_01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-btn"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-srivastava01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-btn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://telegram.me/ayushsrivastava_01"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="social-btn"
            >
              <FaTelegram />
            </a>
            <a
              href="https://github.com/ayushsrivastava-01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-btn"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.threads.net/@ayushsrivastava_01"
              target="_blank"
              rel="noreferrer"
              aria-label="Threads"
              className="social-btn"
            >
              <FaThreads />
            </a>
          </div>

          <div className="lottie-icon">
            <Lottie animationData={emailAnimation} loop={true} />
          </div>

          <div className="response-time">
            <span className="response-dot"></span>
            Usually responds within 24 hours
          </div>
        </div>

        {/* RIGHT: Form Card */}
        <div className="contact-box form-box">
          <h3 className="form-title">Send a Message</h3>

          {formSubmitted ? (
            <div className="thank-you-message">
              <Lottie
                animationData={successAnimation}
                loop={false}
                style={{ height: 120, margin: "0 auto 1rem" }}
              />
              <h4>Message Sent Successfully!</h4>
              <p>Thank you for reaching out. I will get back to you soon!</p>
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

              <div style={{ display: "none" }}>
                <input name="bot-field" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="field-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="field-input"
                    placeholder="Your name"
                    required
                    minLength={2}
                    maxLength={50}
                  />
                </div>
                <div className="form-group">
                  <label className="field-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="field-input"
                    placeholder="you@example.com"
                    required
                    pattern="^[^\s@]+@(gmail|yahoo|outlook|hotmail|icloud|protonmail)\.com$"
                    title="Please use Gmail, Yahoo, Outlook, Hotmail, iCloud, or ProtonMail"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="field-label">Message</label>
                <textarea
                  name="message"
                  className="field-input field-textarea"
                  rows={5}
                  placeholder="What's on your mind?"
                  required
                  minLength={10}
                  maxLength={1000}
                  onChange={(e) => setCharCount(e.target.value.length)}
                />
              </div>

              <div className="form-footer">
                <p className="privacy-note">
                  Your info is safe with me
                </p>
                <span className={`char-count ${charCount > 900 ? "char-warn" : ""}`}>
                  {charCount}/1000
                </span>
              </div>

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
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;