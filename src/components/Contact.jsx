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
  const [hoveredSocial, setHoveredSocial] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  // Error state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  // Touched state
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  // Validation functions
  const validateName = (name) => {
    if (!name) return "Full name is required";
    if (name.trim().length < 2) return "Name must contain at least 2 characters";
    if (name.trim().length > 50) return "Name cannot exceed 50 characters";
    if (/[0-9]/.test(name)) return "Name should not contain numeric characters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email address is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "protonmail.com"];
    const domain = email.split("@")[1];
    if (domain && !validDomains.includes(domain.toLowerCase())) {
      return `Email domain must be one of: ${validDomains.join(", ")}`;
    }
    return "";
  };

  const validateMessage = (message) => {
    if (!message) return "Message cannot be empty";
    if (message.trim().length < 10) return "Message must contain at least 10 characters";
    if (message.length > 1000) return "Message cannot exceed 1000 characters";
    if (message.trim() === "") return "Please enter a meaningful message";
    
    const spamKeywords = ["http://", "https://", "www.", ".com", "buy now", "click here", "make money", "earn fast"];
    const hasSpam = spamKeywords.some(keyword => message.toLowerCase().includes(keyword));
    if (hasSpam) return "Message contains promotional content. Please remove.";
    return "";
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    let error = "";
    if (name === "name") error = validateName(value);
    if (name === "email") error = validateEmail(value);
    if (name === "message") error = validateMessage(value);
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    let error = "";
    if (name === "name") error = validateName(formData.name);
    if (name === "email") error = validateEmail(formData.email);
    if (name === "message") error = validateMessage(formData.message);
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({ name: true, email: true, message: true });
    
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);
    
    setErrors({
      name: nameError,
      email: emailError,
      message: messageError
    });
    
    if (nameError || emailError || messageError) {
      const firstError = document.querySelector(".error-message");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/ayushsrivastava_01", color: "#E4405F" },
    { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/ayush-srivastava01", color: "#0A66C2" },
    { name: "Telegram", icon: FaTelegram, url: "https://telegram.me/ayushsrivastava_01", color: "#26A5E4" },
    { name: "GitHub", icon: FaGithub, url: "https://github.com/ayushsrivastava-01", color: "#333333" },
    { name: "Threads", icon: FaThreads, url: "https://www.threads.net/@ayushsrivastava_01", color: "#000000" },
  ];

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
          {"Begin a conversation — I look forward to hearing from you."}
        </p>
      </div>

      {/* Grid */}
      <div className={`contact-container ${animate ? "show" : ""}`}>

        {/* LEFT: Info Card */}
        <div className="contact-box info-box">
          <div className="lottie-icon-top">
            <Lottie animationData={emailAnimation} loop={true} />
          </div>

          <h3 className="get-in-touch">Get in touch</h3>
          <p className="touch-text">Discuss your project or opportunity</p>

          <a href="mailto:ayushsrivastava1854@gmail.com" className="email-row">
            <div className="email-icon-wrap">
              <svg viewBox="0 0 24 24" className="email-svg">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <span className="email-text">ayushsrivastava1854@gmail.com</span>
          </a>

          <div className="info-divider"></div>

          <div className="social-icons">
            {socialLinks.map((social) => (
              <div
                key={social.name}
                className="social-tooltip-wrapper"
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <a href={social.url} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <social.icon />
                </a>
                {hoveredSocial === social.name && (
                  <span className="social-tooltip" style={{ background: social.color }}>
                    {social.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="response-time">
            <span className="response-dot"></span>
            Response expected within 24 hours
          </div>
        </div>

        {/* RIGHT: Form Card */}
        <div className="contact-box form-box">
          <h3 className="form-title">Send a Message</h3>

          {formSubmitted ? (
            <div className="thank-you-message">
              <Lottie animationData={successAnimation} loop={false} style={{ height: 120, margin: "0 auto 1rem" }} />
              <h4>Message Sent Successfully</h4>
              <p>Thank you for reaching out. I will respond promptly.</p>
              <p className="success-note">A confirmation has been sent to your email address.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <div style={{ display: "none" }}><input name="bot-field" /></div>

              <div className="form-row">
                <div className="form-group">
                  <label className="field-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`field-input ${touched.name && errors.name ? "error-input" : ""} ${touched.name && !errors.name && formData.name ? "valid-input" : ""}`}
                    placeholder="Enter your full name"
                  />
                  {touched.name && errors.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                  {!errors.name && formData.name && touched.name && (
                    <div className="valid-message">✓</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="field-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`field-input ${touched.email && errors.email ? "error-input" : ""} ${touched.email && !errors.email && formData.email ? "valid-input" : ""}`}
                    placeholder="your@email.com"
                  />
                  {touched.email && errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                  {!errors.email && formData.email && touched.email && (
                    <div className="valid-message">✓</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="field-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`field-input field-textarea ${touched.message && errors.message ? "error-input" : ""} ${touched.message && !errors.message && formData.message ? "valid-input" : ""}`}
                  rows={5}
                  placeholder="Please describe your query or project in detail..."
                />
                {touched.message && errors.message && (
                  <div className="error-message">{errors.message}</div>
                )}
                {!errors.message && formData.message && touched.message && (
                  <div className="valid-message">✓</div>
                )}
              </div>

              <div className="form-footer">
                <div className="char-counter">
                  <span className={`char-count ${formData.message.length > 900 ? "char-warn" : ""} ${formData.message.length > 1000 ? "char-error" : ""}`}>
                    {formData.message.length} / 1000 characters
                  </span>
                  {formData.message.length > 900 && formData.message.length <= 1000 && (
                    <span className="char-warning-text">⚠ Approaching character limit</span>
                  )}
                  {formData.message.length > 1000 && (
                    <span className="char-error-text">✗ Character limit exceeded</span>
                  )}
                </div>
              </div>

              <button type="submit" className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  "Submit Message"
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