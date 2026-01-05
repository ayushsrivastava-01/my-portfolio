import { useState, useEffect, useRef } from 'react';
import './css/Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      text: "👋 Welcome! I'm Ayush's portfolio assistant. Ask me about:\n• Projects & Skills 🚀\n• Experience & Education 📚\n• Certifications & Contact 📧\n• Technical expertise 💻", 
      sender: 'bot',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [typing, setTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [connectionQuality, setConnectionQuality] = useState('excellent');
  const [lastActive, setLastActive] = useState('Just now');
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const notificationTimerRef = useRef(null);
  const interactionTimerRef = useRef(null);
  const greetingTimerRef = useRef(null);
  const onlineStatusTimerRef = useRef(null);

  // Portfolio Data (same as before)
  const portfolioData = {
    name: "Ayush Srivastava",
    role: "Full-Stack Developer",
    about: "Passionate full-stack developer with 2+ years of experience building clean, efficient web applications.",
    skills: {
      frontend: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
      backend: ["Node.js", "Express.js", "PHP", "Java", "Python"],
      database: ["MySQL", "SQLite", "Firebase"],
      tools: ["Git", "VS Code", "Docker", "AWS Basics", "Postman", "Figma"],
      soft: ["Problem Solving", "Communication", "Teamwork", "Adaptability"]
    },
    projects: [
      {
        name: "Real Estate Webapp",
        tech: ["React", "Node.js", "MySQL"],
        description: "Full-stack property listing platform"
      },
      {
        name: "Weather Application",
        tech: ["React", "API Integration"],
        description: "Real-time weather updates"
      },
      {
        name: "Portfolio Website",
        tech: ["React", "CSS3", "JavaScript"],
        description: "Interactive portfolio"
      },
      {
        name: "Number System Converter",
        tech: ["JavaScript", "HTML5", "CSS3"],
        description: "Binary/Decimal/Octal/Hex converter"
      },
      {
        name: "Travel Booking System",
        tech: ["PHP", "MySQL", "JavaScript"],
        description: "Booking platform"
      }
    ],
    experience: [
      {
        role: "Web Development Intern",
        company: "Edureka",
        duration: "3 months"
      },
      {
        role: "Software Engineer Intern",
        company: "HackerRank",
        duration: "2 months"
      }
    ],
    education: {
      degree: "BCA (Bachelor of Computer Applications)",
      college: "MSITM Degree College, Gonda",
      year: "2025"
    },
    certifications: [
      "Generative AI Mastermind - Outskill",
      "Web Development Internship - Edureka",
      "Software Engineer Intern - HackerRank"
    ],
    contact: {
      email: "ayushsrivastava1854@gmail.com",
      linkedin: "linkedin.com/in/ayush-srivastava01",
      github: "github.com/ayushsrivastava-01",
      portfolio: "ayushsri.netlify.app"
    }
  };

  // Abusive words detection
  const abusiveWords = [
    'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick', 'pussy', 
    'ass', 'bhenchod', 'madarchod', 'chutiya', 'gandu', 'lawde', 'lund',
    'motherfucker', 'fucker', 'bullshit', 'damn', 'hell', 'idiot', 'stupid',
    'retard', 'moron', 'dumb', 'fat', 'ugly', 'loser', 'wtf', 'omg'
  ];

  // Enhanced greetings
  const greetings = [
    "Namaste! 🙏 How can I assist you with Ayush's portfolio today?",
    "Hello there! 🌟 What would you like to know about Ayush's work?",
    "Hi! 👋 Ready to explore Ayush's portfolio? Ask me anything!",
    "Greetings! ✨ I'm here to help you discover Ayush's skills and projects.",
    "Welcome! 😊 Feel free to ask about Ayush's experience, skills, or projects."
  ];

  // Quick questions
  const quickQuestions = [
    { text: "What projects have you built?", emoji: "🚀" },
    { text: "Show me your skills", emoji: "💻" },
    { text: "Tell me about your experience", emoji: "👨‍💻" },
    { text: "Education background?", emoji: "🎓" },
    { text: "Contact information", emoji: "📧" },
    { text: "GitHub link?", emoji: "🐙" },
    { text: "React experience?", emoji: "⚛️" },
    { text: "Certifications?", emoji: "📜" }
  ];

  // Online status simulation
  useEffect(() => {
    const updateOnlineStatus = () => {
      // Simulate occasional offline status (1% chance)
      const isActuallyOnline = Math.random() > 0.01;
      setIsOnline(isActuallyOnline);
      
      // Update connection quality
      const qualities = ['excellent', 'good', 'average'];
      const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
      setConnectionQuality(randomQuality);
      
      // Update last active time
      const times = ['Just now', 'A moment ago', 'Recently active'];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      setLastActive(randomTime);
    };

    // Initial status
    updateOnlineStatus();

    // Update status every 10-30 seconds
    const scheduleUpdate = () => {
      const delay = 10000 + Math.random() * 20000; // 10-30 seconds
      onlineStatusTimerRef.current = setTimeout(() => {
        updateOnlineStatus();
        scheduleUpdate();
      }, delay);
    };

    scheduleUpdate();

    return () => {
      if (onlineStatusTimerRef.current) {
        clearTimeout(onlineStatusTimerRef.current);
      }
    };
  }, []);

  // Show notification after 3 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    notificationTimerRef.current = setTimeout(() => {
      setShowNotification(false);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  // Auto-close greeting after 5 seconds
  useEffect(() => {
    if (showGreeting) {
      greetingTimerRef.current = setTimeout(() => {
        setShowGreeting(false);
      }, 5000);
    }
    
    return () => {
      if (greetingTimerRef.current) {
        clearTimeout(greetingTimerRef.current);
      }
    };
  }, [showGreeting]);

  // Track user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (!isOpen) {
          setShowNotification(true);
          if (interactionTimerRef.current) {
            clearTimeout(interactionTimerRef.current);
          }
          interactionTimerRef.current = setTimeout(() => {
            setShowNotification(false);
          }, 6000);
        }
      }
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);
    window.addEventListener('mousemove', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('mousemove', handleUserInteraction);
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
      }
    };
  }, [hasInteracted, isOpen]);

  const handleToggleChatbot = () => {
    setIsOpen(!isOpen);
    if (showNotification) {
      setShowNotification(false);
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
      }
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const containsAbusiveLanguage = (message) => {
    const lowerMsg = message.toLowerCase();
    return abusiveWords.some(word => lowerMsg.includes(word));
  };

  const getSmartResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();
    
    // Check for abusive language
    if (containsAbusiveLanguage(msg)) {
      return "I'm here to help you learn about Ayush's professional portfolio. Please maintain respectful communication. 😊\n\nYou can ask about:\n• Projects & Skills\n• Experience & Education\n• Contact information";
    }
    
    // Handle very short/nonsense inputs
    if (msg.length <= 2 && !/hi|ok|no|by|hi|hey/.test(msg)) {
      return "I noticed your message was quite short. Could you ask something specific about Ayush's portfolio? For example:\n• 'Tell me about your projects'\n• 'What are your technical skills?'\n• 'How can I contact you?'";
    }
    
    // Handle goodbye/farewell
    if (/bye|goodbye|see you|farewell|cya|exit|quit|close|good night|goodnight/.test(msg)) {
      const farewells = [
        "Goodbye! 👋 Feel free to return anytime to learn more about Ayush's portfolio.",
        "See you later! 😊 Have a great day!",
        "Take care! 🌟 Don't hesitate to come back if you have more questions.",
        "Goodbye! 🙏 Wishing you all the best.",
        "Farewell! ✨ Stay curious and keep learning!"
      ];
      return farewells[Math.floor(Math.random() * farewells.length)];
    }
    
    // Handle thanks
    if (/thanks|thank you|appreciate|thx|thankyou|ty|grateful/.test(msg)) {
      const thanksResponses = [
        "You're welcome! 😊 Is there anything else you'd like to know about Ayush's portfolio?",
        "My pleasure! 🌟 Happy to help you explore Ayush's work.",
        "Glad I could help! 🙏 Feel free to ask more questions.",
        "You're most welcome! ✨ What else interests you?",
        "Happy to assist! 😄 Let me know if you need more information."
      ];
      return thanksResponses[Math.floor(Math.random() * thanksResponses.length)];
    }
    
    // Handle greetings
    if (/hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste|hola|bonjour/.test(msg)) {
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      return randomGreeting;
    }
    
    // Handle "what" questions
    if (/what (can|should|do) (you|i) (do|ask|say|learn)/.test(msg)) {
      return "You can ask me about:\n📁 **Projects** - Real Estate app, Weather app, etc.\n💻 **Skills** - React, Node.js, JavaScript, etc.\n👨‍💻 **Experience** - Internships at Edureka & HackerRank\n🎓 **Education** - BCA degree details\n📜 **Certifications** - Professional certifications\n📧 **Contact** - Email, LinkedIn, GitHub\n\nWhat interests you most?";
    }
    
    // Handle "who" questions
    if (/who (are you|is ayush|is this|made you)/.test(msg)) {
      return `I'm the AI assistant for **${portfolioData.name}**, a ${portfolioData.role}. I help visitors explore his portfolio, projects, and skills.\n\n${portfolioData.about}\n\nBuilt with React by Ayush himself!`;
    }
    
    // Handle "how" questions
    if (/how (are you|old|many|to contact|can i|do i)/.test(msg)) {
      if (/how (are you|you doing|do you feel)/.test(msg)) {
        const moodResponses = [
          "I'm doing great, thanks for asking! 😊 Ready to help you explore Ayush's portfolio.",
          "Feeling fantastic! 🌟 Excited to share Ayush's work with you.",
          "I'm wonderful! 🙏 Let's dive into Ayush's portfolio together.",
          "All good here! ✨ How can I assist you today?",
          "I'm excellent! 😄 Ready to answer your questions."
        ];
        return moodResponses[Math.floor(Math.random() * moodResponses.length)];
      }
      if (/how many (projects|skills|certs|certifications|experiences)/.test(msg)) {
        if (/projects/.test(msg)) return `Ayush has built **${portfolioData.projects.length} major projects**, including a Real Estate Webapp and Weather Application.`;
        if (/skills/.test(msg)) return `He has skills in **${portfolioData.skills.frontend.length + portfolioData.skills.backend.length + portfolioData.skills.database.length} technologies** across frontend, backend, and databases.`;
        if (/certs/.test(msg) || /certifications/.test(msg)) return `He holds **${portfolioData.certifications.length}+ professional certifications** including Generative AI Mastermind and HackerRank certifications.`;
        if (/experiences/.test(msg)) return `He has **${portfolioData.experience.length} professional experiences** including internships at Edureka and HackerRank.`;
      }
      if (/how to contact/.test(msg)) return `You can contact Ayush via:\n📧 **Email:** ${portfolioData.contact.email}\n💼 **LinkedIn:** ${portfolioData.contact.linkedin}\n🐙 **GitHub:** ${portfolioData.contact.github}`;
      if (/how can i/.test(msg)) return "You can explore Ayush's portfolio by asking about specific topics. Try:\n• 'Show me your React projects'\n• 'Tell me about your education'\n• 'What are your certifications?'";
    }
    
    // Handle project-related queries
    if (/project|work|build|create|portfolio|github|code|repository|app|application/.test(msg)) {
      const projectsList = portfolioData.projects.map(p => 
        `• **${p.name}** - ${p.description} (${p.tech.join(', ')})`
      ).join('\n');
      
      return `**Ayush's Projects:**\n${projectsList}\n\n**GitHub:** ${portfolioData.contact.github}\n\nWant details on any specific project?`;
    }
    
    // Handle skills queries
    if (/skill|tech|technology|stack|language|framework|expertise/.test(msg)) {
      return `**Technical Skills:**\n\n**Frontend:** ${portfolioData.skills.frontend.join(', ')}\n**Backend:** ${portfolioData.skills.backend.join(', ')}\n**Databases:** ${portfolioData.skills.database.join(', ')}\n**Tools:** ${portfolioData.skills.tools.join(', ')}\n**Soft Skills:** ${portfolioData.skills.soft.join(', ')}`;
    }
    
    // Handle experience queries
    if (/experience|work|job|internship|professional|career|background/.test(msg)) {
      const expList = portfolioData.experience.map(exp => 
        `• **${exp.role}** at ${exp.company} (${exp.duration})`
      ).join('\n');
      
      return `**Professional Experience:**\n${expList}\n\n**Total:** 2+ years in web development`;
    }
    
    // Handle education queries
    if (/education|degree|college|study|graduate|background|academic/.test(msg)) {
      return `**Education:**\n• **Degree:** ${portfolioData.education.degree}\n• **College:** ${portfolioData.education.college}\n• **Year:** ${portfolioData.education.year}`;
    }
    
    // Handle contact queries
    if (/contact|email|hire|reach|linkedin|github|connect|message|get in touch|social media/.test(msg)) {
      return `**Contact Ayush:**\n📧 **Email:** ${portfolioData.contact.email}\n💼 **LinkedIn:** ${portfolioData.contact.linkedin}\n🐙 **GitHub:** ${portfolioData.contact.github}\n🌐 **Portfolio:** ${portfolioData.contact.portfolio}`;
    }
    
    // Handle certification queries
    if (/certif|certificate|qualification|cert|course|training|learning/.test(msg)) {
      return `**Certifications:**\n${portfolioData.certifications.map(c => `• ${c}`).join('\n')}\n\n**Total:** ${portfolioData.certifications.length}+ professional certifications`;
    }
    
    // Handle specific technology queries
    if (/(react|javascript|node|python|java|php|html|css|sql|mysql|tailwind|express)/.test(msg)) {
      const tech = msg.match(/(react|javascript|node|python|java|php|html|css|sql|mysql|tailwind|express)/i)?.[0] || 'these technologies';
      const techUpper = tech.charAt(0).toUpperCase() + tech.slice(1);
      
      // Check if this tech is in skills
      const allSkills = [
        ...portfolioData.skills.frontend,
        ...portfolioData.skills.backend,
        ...portfolioData.skills.database
      ];
      
      if (allSkills.map(s => s.toLowerCase()).includes(tech)) {
        return `**${techUpper} Experience:** ✅\nAyush has hands-on experience with ${techUpper} in multiple projects. For example:\n• Real Estate Webapp uses ${tech === 'react' || tech === 'node' || tech === 'mysql' ? techUpper : 'relevant technologies'}\n• Has certifications involving ${techUpper}\n• Regular practice with ${techUpper} development`;
      }
    }
    
    // Handle compliments
    if (/good|great|awesome|amazing|wonderful|excellent|impressive|smart|intelligent|nice|cool/.test(msg)) {
      const compliments = [
        "Thank you! 😊 Ayush works hard to build great projects.",
        "Much appreciated! 🌟 Ayush is passionate about his work.",
        "Thanks for the kind words! 🙏 I'll pass them along.",
        "Glad you think so! ✨ Ayush is always learning and improving.",
        "Thank you! 😄 Ayush would be happy to hear that."
      ];
      return compliments[Math.floor(Math.random() * compliments.length)];
    }
    
    // Handle "yes/no/maybe" responses
    if (/^yes$|^no$|^maybe$|^ok$|^okay$|^sure$|^alright$/i.test(msg)) {
      return "Great! What specific aspect of Ayush's portfolio would you like to explore? For example:\n• 'Tell me about React projects'\n• 'Show me your skills'\n• 'What's your experience?'";
    }
    
    // Handle random single letters/characters
    if (/^[a-z]$/i.test(msg)) {
      return "I see you typed a single letter. If you're testing, try asking about:\n• 'P' for Projects\n• 'S' for Skills\n• 'E' for Experience\n• 'C' for Contact\nOr type a full question about Ayush's portfolio!";
    }
    
    // Handle "I love you" or similar
    if (/i love you|love you|i like you|marry me/.test(msg)) {
      return "That's sweet! 😊 I'm an AI assistant here to help you explore Ayush's portfolio. Let's focus on professional topics!";
    }
    
    // Default response for unclear queries
    const suggestions = [
      "Try: 'Show me your React projects'",
      "Ask: 'What are your technical skills?'",
      "Type: 'Tell me about your experience'",
      "Say: 'How can I contact you?'",
      "Question: 'What certifications do you have?'",
      "Try: 'Tell me about your education'",
      "Ask: 'Show me your GitHub projects'"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    return `I'm not sure what you're asking about. ${randomSuggestion}\n\nOr you can choose from the quick questions below! 👇`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Update last active time
    setLastActive('Just now');
    
    const userMsg = input;
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    setMessages(prev => [...prev, { 
      text: userMsg, 
      sender: 'user',
      time: time 
    }]);
    setInput('');
    setTyping(true);
    
    // Small delay for realism
    setTimeout(async () => {
      const response = getSmartResponse(userMsg);
      const responseTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      
      setMessages(prev => [...prev, { 
        text: response, 
        sender: 'bot',
        time: responseTime 
      }]);
      setTyping(false);
      
      // Update last active after response
      setLastActive('Just now');
    }, 500);
  };

  const handleRefresh = () => {
    setMessages([
      { 
        text: "👋 Welcome! I'm Ayush's portfolio assistant. Ask me about:\n• Projects & Skills 🚀\n• Experience & Education 📚\n• Certifications & Contact 📧\n• Technical expertise 💻", 
        sender: 'bot',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }
    ]);
    setShowGreeting(true);
    
    // Auto-close greeting after 5 seconds
    if (greetingTimerRef.current) {
      clearTimeout(greetingTimerRef.current);
    }
    greetingTimerRef.current = setTimeout(() => {
      setShowGreeting(false);
    }, 5000);
  };

  return (
    <div className="portfolio-chatbot">
      {/* Greeting Popup */}
      {showGreeting && isOpen && (
        <div className="greeting-popup">
          <div className="greeting-content">
            <div className="greeting-icon">👋</div>
            <div className="greeting-text">
              <strong>Hello there!</strong>
              <p>I'm Ayush's AI assistant. Ask me anything about his portfolio!</p>
            </div>
            <button 
              className="greeting-close" 
              onClick={() => setShowGreeting(false)}
              aria-label="Close greeting"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {showNotification && !isOpen && (
        <div className="chatbot-notification">
          <div className="notification-content">
            <div className="notification-icon">
              <div className="ai-assistant-icon">
                <div className="ai-brain">
                  <div className="brain-left"></div>
                  <div className="brain-right"></div>
                </div>
              </div>
            </div>
            <div className="notification-text">
              <strong>💬 Ask about Ayush's work</strong>
              <p>Projects, Skills, Experience & more</p>
            </div>
            <button 
              className="notification-close" 
              onClick={closeNotification}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
          <div className="notification-arrow"></div>
        </div>
      )}

      <button 
        className={`chatbot-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={handleToggleChatbot}
        aria-label="Chat Assistant"
      >
        {isOpen ? (
          <span className="close-icon">✕</span>
        ) : (
          <>
            <div className="ai-assistant-icon">
              <div className="ai-brain">
                <div className="brain-left"></div>
                <div className="brain-right"></div>
              </div>
            </div>
            <span className="btn-text">Ask AI</span>
          </>
        )}
      </button>
      
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-left">
              <div className="header-icon">
                <div className="ai-assistant-icon">
                  <div className="ai-brain">
                    <div className="brain-left"></div>
                    <div className="brain-right"></div>
                  </div>
                </div>
              </div>
              <div>
                <h3>Ayush's Portfolio Assistant</h3>
                {/* ONLINE STATUS INDICATOR RIGHT BELOW THE HEADER TEXT */}
                <div className="header-status">
                  <div className={`status-dot ${isOnline ? 'online' : 'offline'}`}></div>
                  <span className="status-text">
                    {isOnline ? 'Online • AI Assistant Ready' : 'Offline • Still responding'}
                  </span>
                </div>
              </div>
            </div>
            <div className="header-right">
              <button 
                className="refresh-btn"
                onClick={handleRefresh}
                aria-label="Refresh chat"
                title="Start new conversation"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
              </button>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="messages-area" ref={messagesContainerRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="message-line">{line}</p>
                  ))}
                </div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
            
            {typing && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">
                  {isOnline ? 'AI Assistant is typing...' : 'Thinking...'}
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-questions-section">
            <button 
              className="quick-toggle-btn"
              onClick={() => setShowQuickQuestions(!showQuickQuestions)}
            >
              <span>💡 Quick Questions</span>
              <span className="toggle-arrow">{showQuickQuestions ? '▲' : '▼'}</span>
            </button>
            
            {showQuickQuestions && (
              <div className="quick-dropdown">
                <div className="quick-grid">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      className="quick-option"
                      onClick={() => {
                        setInput(q.text);
                        setTimeout(() => handleSend(), 100);
                        setShowQuickQuestions(false);
                      }}
                    >
                      <span className="q-emoji">{q.emoji}</span>
                      <span className="q-text">{q.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="input-section">
            <div className="input-wrapper">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about projects, skills, experience..."
                disabled={typing}
              />
              <button 
                onClick={handleSend}
                disabled={typing || !input.trim()}
                className="send-button"
              >
                {typing ? (
                  <div className="sending-spinner"></div>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                )}
              </button>
            </div>
            <div className="input-hint">
              <small>💡 Tip: Try asking about specific technologies or projects!</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;