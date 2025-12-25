import { useState, useEffect, useRef } from 'react';
import './css/Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false); // Changed to false initially
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      text: "👋 Welcome to Ayush's Portfolio! I'm your AI assistant. Ask me about his projects, skills, experience, or anything else!", 
      sender: 'bot',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    },
    { 
      text: "💡 Quick Tip: Try asking 'Tell me about Ayush' or 'Show me your projects' to get started!", 
      sender: 'bot',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [typing, setTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // Start with notification hidden
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const notificationTimerRef = useRef(null);
  const interactionTimerRef = useRef(null);

  const API_KEY = "API_KEY";

  // Show notification after 3 seconds of page load
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    // Auto-hide notification after 8 seconds
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

  // Track user interaction with page
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        
        // Show notification when user interacts with page
        if (!isOpen) {
          setShowNotification(true);
          
          // Clear any existing timer
          if (interactionTimerRef.current) {
            clearTimeout(interactionTimerRef.current);
          }
          
          // Hide notification after 6 seconds
          interactionTimerRef.current = setTimeout(() => {
            setShowNotification(false);
          }, 6000);
        }
      }
    };

    // Add event listeners for user interaction
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

  // Close notification when chatbot is opened
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

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll on new message
  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  // Portfolio-specific smart responses
  const getSmartResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('welcome')) {
      return "Hello! I'm here to help you explore Ayush Srivastava's portfolio. He's a passionate full-stack developer. What would you like to know?";
    }
    
    if (msg.includes('about') || msg.includes('who')) {
      return "Ayush Srivastava is a Full-Stack Developer passionate about building clean, efficient web experiences. He blends creativity with functionality and enjoys turning complex problems into elegant solutions.";
    }
    
    if (msg.includes('project') || msg.includes('work')) {
      return "**Notable Projects:**\n• Real Estate Webapp (React + Node.js)\n• Weather App with real-time updates\n• Portfolio Website\n• Number System Converter\n• Travel Booking System\n• Educational Platform\n\nCheck Projects section for live demos!";
    }
    
    if (msg.includes('skill') || msg.includes('tech')) {
      return "**Technical Skills:**\nFrontend: React, JavaScript, HTML5, CSS3, Tailwind\nBackend: Node.js, Express.js, PHP, Java\nDatabase: MySQL, MongoDB, SQLite\nTools: Git, VS Code, Docker, AWS basics";
    }
    
    if (msg.includes('experience')) {
      return "Ayush has 2+ years of full-stack development experience. He has completed internships at Edureka and HackerRank, and holds multiple certifications.";
    }

    
    if (msg.includes('education') || msg.includes('degree') || msg.includes('college') || msg.includes('background')) {
      return "**Education:**\nCompleted BCA (Bachelor of Computer Applications) from MSITM Degree College, Gonda in 2025.";
    }
    
    if (msg.includes('contact') || msg.includes('email') || msg.includes('hire')) {
      return "**Contact Ayush:**\n• Email: ayushsrivastava1854@gmail.com\n• LinkedIn: linkedin.com/in/ayush-srivastava01\n• GitHub: github.com/ayushsrivastava-01\n\nUse Contact page for direct messages!";
    }
    
    if (msg.includes('certificate') || msg.includes('certification')) {
      return "Ayush has 16+ certificates including:\n• Generative AI Mastermind (Outskill)\n• Web Development Internship (Edureka)\n• Software Engineer Intern (HackerRank)\n• Problem Solving (HackerRank)\n\nCheck Certificates section for details!";
    }
    
    if (msg.includes('resume') || msg.includes('cv')) {
      return "Download Ayush's resume from Resume section. Includes education, experience, skills, and projects.";
    }
    
    if (msg.includes('github') || msg.includes('code')) {
      return "GitHub: github.com/ayushsrivastava-01\nHe has 12+ repositories including full-stack projects.";
    }
    
    if (msg.includes('react') || msg.includes('javascript') || msg.includes('node')) {
      const tech = msg.includes('react') ? 'React' : msg.includes('node') ? 'Node.js' : 'JavaScript';
      return `Yes! Ayush has strong experience with ${tech}. He's built multiple applications using ${tech}.`;
    }
    
    // Default fallback response
    return "I'm sorry, I specialize in Ayush's portfolio information. Could you ask something about his projects, skills, or experience instead?";
  };

  // Call OpenAI API
  const callOpenAI = async (userMessage) => {
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
              content: `You are Ayush Srivastava's portfolio assistant.
              Ayush is a full-stack developer specializing in React, Node.js, JavaScript.
              Portfolio: ayushsri.netlify.app
              Key info:
              - Name: Ayush Srivastava
              - Role: Full-Stack Developer
              - Skills: React, JavaScript, Node.js, Express, MongoDB, MySQL, HTML/CSS
              - Projects: Real Estate Webapp, Weather App, Portfolio, Number Converter
              - Certificates: 16+ from HackerRank, Edureka, Outskill
              - Experience: 2+ years, internships at Edureka & HackerRank
              - Education: Completed BCA from MSITM Degree College, Gonda
              - Contact: ayushsrivastava1854@gmail.com
              
              Respond professionally but friendly in English. Keep answers concise.
              If the question is NOT related to Ayush's portfolio, say:
              "I'm sorry, I specialize in Ayush's portfolio information. Could you ask something about his projects, skills, or experience instead?"
              
              Never say "I don't know". Always redirect to portfolio topics.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI Error:', error);
      return getSmartResponse(userMessage);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message with time
    const userMsg = input;
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    setMessages(prev => [...prev, { 
      text: userMsg, 
      sender: 'user',
      time: time 
    }]);
    setInput('');
    setTyping(true);
    
    // Get response
    const response = await callOpenAI(userMsg);
    const responseTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Add bot response with slight delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: response, 
        sender: 'bot',
        time: responseTime 
      }]);
      setTyping(false);
    }, 600);
  };

  // Professional AI Brain Icon
  const ChatIcon = () => (
    <div className="ai-assistant-icon">
      <div className="ai-brain">
        <div className="brain-left"></div>
        <div className="brain-right"></div>
        <div className="ai-sparkle s1"></div>
        <div className="ai-sparkle s2"></div>
        <div className="ai-sparkle s3"></div>
      </div>
      <div className="icon-ring"></div>
    </div>
  );

  // Single quick question with dropdown
  const quickQuestions = [
    { text: "Tell me about Ayush", emoji: "👨‍💻" },
    { text: "Show projects", emoji: "🚀" },
    { text: "What skills?", emoji: "💻" },
    { text: "Education background?", emoji: "🎓" },
    { text: "Experience?", emoji: "📈" },
    { text: "Certificates?", emoji: "📜" },
    { text: "How to contact?", emoji: "📧" },
    { text: "GitHub profile?", emoji: "🐙" }
  ];

  const [showQuickQuestions, setShowQuickQuestions] = useState(false);

  // Close notification manually
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
      {/* Attention-Grabbing Notification */}
      {showNotification && !isOpen && (
        <div className="chatbot-notification">
          <div className="notification-content">
            <div className="notification-icon">
              <ChatIcon />
            </div>
            <div className="notification-text">
              <strong>👋 Need help exploring?</strong>
              <p>Ask AI Assistant about Ayush's projects & skills!</p>
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

      {/* Floating Chat Button */}
      <button 
        className={`chatbot-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={handleToggleChatbot}
        aria-label="Chat Assistant"
      >
        {isOpen ? (
          <span className="close-icon">✕</span>
        ) : (
          <>
            <ChatIcon />
            <span className="btn-text">Ask AI</span>
          </>
        )}
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="header-left">
              <div className="header-icon">
                <ChatIcon />
              </div>
              <div>
                <h3>Ayush's Portfolio Assistant</h3>
                <p>Ask about Ayush's work</p>
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

          {/* Messages */}
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
            
            {/* Typing indicator */}
            {typing && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions - Single with dropdown */}
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

          {/* Input Area */}
          <div className="input-section">
            <div className="input-wrapper">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Ayush's portfolio..."
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