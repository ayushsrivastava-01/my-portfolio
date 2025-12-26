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

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const notificationTimerRef = useRef(null);
  const interactionTimerRef = useRef(null);

  const API_KEY = "API_KEY";

  // Portfolio Data
  const portfolioData = {
    name: "Ayush Srivastava",
    role: "Full-Stack Developer",
    about: "Passionate full-stack developer with 2+ years of experience building clean, efficient web applications.",
    skills: {
      frontend: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
      backend: ["Node.js", "Express.js", "PHP", "Java", "Python"],
      database: ["MySQL", "MongoDB", "SQLite", "Firebase"],
      tools: ["Git", "VS Code", "Docker", "AWS Basics", "Postman", "Figma"],
      soft: ["Problem Solving", "Communication", "Teamwork", "Adaptability"]
    },
    projects: [
      {
        name: "Real Estate Webapp",
        tech: ["React", "Node.js", "MongoDB"],
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  // ENHANCED SMART RESPONSE SYSTEM WITH BETTER INPUT HANDLING
  const getSmartResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();
    
    // Handle very short/nonsense inputs
    if (msg.length <= 2 && !/hi|ok|no|by|hi|hey/.test(msg)) {
      return "I noticed your message was quite short. Could you ask something specific about Ayush's portfolio? For example:\n• 'Tell me about your projects'\n• 'What are your technical skills?'\n• 'How can I contact you?'";
    }
    
    // Handle goodbye/farewell
    if (/bye|goodbye|see you|farewell|cya|exit|quit|close/.test(msg)) {
      return "Goodbye! 👋 Feel free to return anytime to learn more about Ayush's portfolio. Have a great day!";
    }
    
    // Handle thanks
    if (/thanks|thank you|appreciate|thx/.test(msg)) {
      return "You're welcome! 😊 Is there anything else you'd like to know about Ayush's portfolio?";
    }
    
    // Handle greetings
    if (/hi|hello|hey|greetings|good morning|good afternoon|good evening/.test(msg)) {
      return `Hello! 👋 I'm here to help you explore Ayush Srivastava's portfolio. He's a ${portfolioData.role} with ${portfolioData.experience.length}+ years of experience.\n\nWhat would you like to know about?`;
    }
    
    // Handle "what" questions
    if (/what (can|should|do) (you|i) (do|ask|say)/.test(msg)) {
      return "You can ask me about:\n📁 **Projects** - Real Estate app, Weather app, etc.\n💻 **Skills** - React, Node.js, JavaScript, etc.\n👨‍💻 **Experience** - Internships at Edureka & HackerRank\n🎓 **Education** - BCA degree details\n📜 **Certifications** - 16+ professional certs\n📧 **Contact** - Email, LinkedIn, GitHub\n\nWhat interests you most?";
    }
    
    // Handle "who" questions
    if (/who (are you|is ayush|is this)/.test(msg)) {
      return `I'm the AI assistant for **${portfolioData.name}**, a ${portfolioData.role}. I help visitors explore his portfolio, projects, and skills.\n\n${portfolioData.about}`;
    }
    
    // Handle "how" questions
    if (/how (are you|old|many|to contact)/.test(msg)) {
      if (/how (are you|you doing)/.test(msg)) {
        return "I'm doing great, thanks for asking! 😊 Ready to help you explore Ayush's portfolio.";
      }
      if (/how many (projects|skills|certs)/.test(msg)) {
        if (/projects/.test(msg)) return `Ayush has built **${portfolioData.projects.length} major projects**, including a Real Estate Webapp and Weather Application.`;
        if (/skills/.test(msg)) return `He has skills in **${portfolioData.skills.frontend.length + portfolioData.skills.backend.length + portfolioData.skills.database.length} technologies** across frontend, backend, and databases.`;
        if (/certs/.test(msg)) return `He holds **${portfolioData.certifications.length}+ professional certifications** including Generative AI Mastermind and HackerRank certifications.`;
      }
    }
    
    // Handle project-related queries
    if (/project|work|build|create|portfolio|github|code|repository/.test(msg)) {
      const projectsList = portfolioData.projects.map(p => 
        `• **${p.name}** - ${p.description} (${p.tech.join(', ')})`
      ).join('\n');
      
      return `**Ayush's Projects:**\n${projectsList}\n\n**GitHub:** ${portfolioData.contact.github}\n\nWant details on any specific project?`;
    }
    
    // Handle skills queries
    if (/skill|tech|technology|stack|language|framework/.test(msg)) {
      return `**Technical Skills:**\n\n**Frontend:** ${portfolioData.skills.frontend.join(', ')}\n**Backend:** ${portfolioData.skills.backend.join(', ')}\n**Databases:** ${portfolioData.skills.database.join(', ')}\n**Tools:** ${portfolioData.skills.tools.join(', ')}\n**Soft Skills:** ${portfolioData.skills.soft.join(', ')}`;
    }
    
    // Handle experience queries
    if (/experience|work|job|internship|professional/.test(msg)) {
      const expList = portfolioData.experience.map(exp => 
        `• **${exp.role}** at ${exp.company} (${exp.duration})`
      ).join('\n');
      
      return `**Professional Experience:**\n${expList}\n\n**Total:** 2+ years in web development`;
    }
    
    // Handle education queries
    if (/education|degree|college|study|graduate|background/.test(msg)) {
      return `**Education:**\n• **Degree:** ${portfolioData.education.degree}\n• **College:** ${portfolioData.education.college}\n• **Year:** ${portfolioData.education.year}`;
    }
    
    // Handle contact queries
    if (/contact|email|hire|reach|linkedin|github|connect|message/.test(msg)) {
      return `**Contact Ayush:**\n📧 **Email:** ${portfolioData.contact.email}\n💼 **LinkedIn:** ${portfolioData.contact.linkedin}\n🐙 **GitHub:** ${portfolioData.contact.github}\n🌐 **Portfolio:** ${portfolioData.contact.portfolio}`;
    }
    
    // Handle certification queries
    if (/certif|certificate|qualification|cert|course/.test(msg)) {
      return `**Certifications:**\n${portfolioData.certifications.map(c => `• ${c}`).join('\n')}\n\n**Total:** ${portfolioData.certifications.length}+ professional certifications`;
    }
    
    // Handle specific technology queries
    if (/(react|javascript|node|python|java|php|html|css|sql|mongodb|mysql)/.test(msg)) {
      const tech = msg.match(/(react|javascript|node|python|java|php|html|css|sql|mongodb|mysql)/i)?.[0] || 'these technologies';
      const techUpper = tech.charAt(0).toUpperCase() + tech.slice(1);
      
      // Check if this tech is in skills
      const allSkills = [
        ...portfolioData.skills.frontend,
        ...portfolioData.skills.backend,
        ...portfolioData.skills.database
      ];
      
      if (allSkills.map(s => s.toLowerCase()).includes(tech)) {
        return `**${techUpper} Experience:** ✅\nAyush has hands-on experience with ${techUpper} in multiple projects. For example:\n• Real Estate Webapp uses ${tech === 'react' || tech === 'node' || tech === 'mongodb' ? techUpper : 'relevant technologies'}\n• Has certifications involving ${techUpper}\n• Regular practice with ${techUpper} development`;
      }
    }
    
    // Handle "yes/no/maybe" responses
    if (/^yes$|^no$|^maybe$|^ok$|^okay$|^sure$/i.test(msg)) {
      return "Great! What specific aspect of Ayush's portfolio would you like to explore? For example:\n• 'Tell me about React projects'\n• 'Show me your skills'\n• 'What's your experience?'";
    }
    
    // Handle random single letters/characters
    if (/^[a-z]$/i.test(msg)) {
      return "I see you typed a single letter. If you're testing, try asking about:\n• 'P' for Projects\n• 'S' for Skills\n• 'E' for Experience\n• 'C' for Contact\nOr type a full question about Ayush's portfolio!";
    }
    
    // Default response for unclear queries
    const suggestions = [
      "Try: 'Show me your React projects'",
      "Ask: 'What are your technical skills?'",
      "Type: 'Tell me about your experience'",
      "Say: 'How can I contact you?'",
      "Question: 'What certifications do you have?'"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    return `I'm not sure what you're asking about. ${randomSuggestion}\n\nOr you can choose from the quick questions below! 👇`;
  };

  // Improved OpenAI API call
  const callOpenAI = async (userMessage) => {
    // Always use smart response for now to avoid API issues
    return getSmartResponse(userMessage);
    
    // If you want to use OpenAI, uncomment below and add your API key
    /*
    if (!API_KEY || API_KEY === "API_KEY") {
      return getSmartResponse(userMessage);
    }
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant for Ayush Srivastava's portfolio website.
              
              KEY INFORMATION:
              - Ayush is a Full-Stack Developer
              - Skills: React, JavaScript, Node.js, Express, MongoDB, MySQL, HTML/CSS
              - Projects: Real Estate Webapp, Weather App, Portfolio, Number Converter, Travel Booking
              - Experience: Internships at Edureka & HackerRank (2+ years total)
              - Education: BCA from MSITM Degree College (2025)
              - Certifications: 16+ including Generative AI, Web Development
              - Contact: ayushsrivastava1854@gmail.com, linkedin.com/in/ayush-srivastava01
              
              RESPONSE RULES:
              1. Keep responses concise (2-4 sentences max)
              2. Use simple, clear language
              3. If user says nonsense or single letters, ask what they want to know
              4. For "bye" or "exit", say goodbye
              5. Always stay on topic about Ayush's portfolio
              6. Use bullet points only for lists
              7. Don't be too formal - be friendly
              8. If unsure, ask what they want to know about Ayush`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 100,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      return getSmartResponse(userMessage);
    }
    */
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
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
      const response = await callOpenAI(userMsg);
      const responseTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      
      setMessages(prev => [...prev, { 
        text: response, 
        sender: 'bot',
        time: responseTime 
      }]);
      setTyping(false);
    }, 500);
  };

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

  const [showQuickQuestions, setShowQuickQuestions] = useState(false);

  const closeNotification = () => {
    setShowNotification(false);
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
  };

  return (
    <div className="portfolio-chatbot">
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
                <p>Ask me anything about his work</p>
              </div>
            </div>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
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
                <span>Thinking...</span>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;