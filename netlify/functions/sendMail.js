// ✅ No require needed - Node 18+ has built-in fetch
// ✅ ES Module syntax - export const handler

export const handler = async function(event, context) {
  // Sirf POST requests handle karo
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    // Form data parse karo
    const formData = JSON.parse(event.body);
    const { name, email, message } = formData;

    // 📧 1️⃣ User ko auto-reply email (Premium Design)
    const userEmailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: 'Ayush Srivastava',
          email: 'srivastava999ayush@gmail.com'
        },
        to: [
          {
            email: email,
            name: name
          }
        ],
        subject: `✨ Thanks for reaching out, ${name}! I'll get back to you soon.`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You Email</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
              
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: #0a0a14;
                color: #e8e8f0;
                line-height: 1.6;
                padding: 40px 20px;
              }
              
              .container {
                max-width: 580px;
                margin: 0 auto;
                background: linear-gradient(145deg, #111122, #0d0d1a);
                border-radius: 24px;
                border: 1px solid rgba(255, 255, 255, 0.06);
                box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(124, 77, 255, 0.05);
                overflow: hidden;
                padding: 0;
              }
              
              .header-gradient {
                background: linear-gradient(135deg, #7c4dff, #ff4a57);
                padding: 40px 40px 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
              }
              
              .header-gradient::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%);
                animation: shimmer 8s ease-in-out infinite;
              }
              
              @keyframes shimmer {
                0%, 100% { transform: translate(-30%, -30%); }
                50% { transform: translate(30%, 30%); }
              }
              
              .header-content {
                position: relative;
                z-index: 1;
              }
              
              .wave-emoji {
                font-size: 48px;
                display: block;
                margin-bottom: 12px;
                animation: wave 2.5s ease-in-out infinite;
              }
              
              @keyframes wave {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(15deg); }
                75% { transform: rotate(-10deg); }
              }
              
              .header-title {
                font-size: 28px;
                font-weight: 800;
                color: #fff;
                letter-spacing: -0.5px;
                margin-bottom: 6px;
              }
              
              .header-subtitle {
                font-size: 15px;
                font-weight: 400;
                color: rgba(255, 255, 255, 0.8);
                letter-spacing: 0.3px;
              }
              
              .body-content {
                padding: 35px 40px 30px;
              }
              
              .greeting {
                font-size: 18px;
                font-weight: 600;
                color: #fff;
                margin-bottom: 16px;
              }
              
              .greeting span {
                background: linear-gradient(135deg, #9b7ff4, #ff6b7a);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
              }
              
              .text-content {
                color: #b8b8d0;
                font-size: 15px;
                font-weight: 400;
                line-height: 1.8;
                margin-bottom: 20px;
              }
              
              .text-content strong {
                color: #fff;
                font-weight: 600;
              }
              
              .message-card {
                background: rgba(124, 77, 255, 0.06);
                border: 1px solid rgba(124, 77, 255, 0.12);
                border-radius: 16px;
                padding: 20px 24px;
                margin: 24px 0;
                position: relative;
              }
              
              .message-card::before {
                content: '"';
                position: absolute;
                top: -8px;
                left: 12px;
                font-size: 40px;
                color: rgba(124, 77, 255, 0.2);
                font-family: Georgia, serif;
              }
              
              .message-label {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #7c4dff;
                font-weight: 600;
                margin-bottom: 8px;
              }
              
              .message-text {
                color: #d8d8f0;
                font-size: 15px;
                font-style: italic;
                line-height: 1.7;
                padding-left: 8px;
              }
              
              .timeline-box {
                background: rgba(255, 255, 255, 0.03);
                border-radius: 12px;
                padding: 16px 20px;
                margin: 20px 0;
                display: flex;
                align-items: center;
                gap: 14px;
                border: 1px solid rgba(255, 255, 255, 0.04);
              }
              
              .timeline-icon {
                font-size: 24px;
              }
              
              .timeline-content {
                flex: 1;
              }
              
              .timeline-title {
                font-size: 13px;
                font-weight: 600;
                color: #fff;
                margin-bottom: 2px;
              }
              
              .timeline-desc {
                font-size: 13px;
                color: #7a7a90;
              }
              
              .timeline-desc strong {
                color: #3ecf8e;
                font-weight: 600;
              }
              
              .divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
                margin: 24px 0;
              }
              
              .social-section {
                text-align: center;
                margin: 20px 0 8px;
              }
              
              .social-label {
                font-size: 12px;
                color: #55556a;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 14px;
                display: block;
              }
              
              .social-links {
                display: flex;
                justify-content: center;
                gap: 12px;
                flex-wrap: wrap;
              }
              
              .social-link {
                display: inline-block;
                padding: 8px 18px;
                border-radius: 100px;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.06);
                color: #b8b8d0;
                text-decoration: none;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.3s ease;
              }
              
              .social-link:hover {
                background: rgba(124, 77, 255, 0.12);
                border-color: rgba(124, 77, 255, 0.25);
                color: #fff;
                transform: translateY(-2px);
              }
              
              .social-link.insta:hover { background: rgba(228, 64, 95, 0.15); border-color: #E4405F; color: #E4405F; }
              .social-link.linkedin:hover { background: rgba(10, 102, 194, 0.15); border-color: #0A66C2; color: #0A66C2; }
              .social-link.github:hover { background: rgba(255, 255, 255, 0.08); border-color: #fff; color: #fff; }
              
              .footer-section {
                background: rgba(255, 255, 255, 0.02);
                padding: 24px 40px 28px;
                text-align: center;
                border-top: 1px solid rgba(255, 255, 255, 0.04);
              }
              
              .footer-name {
                font-size: 18px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 4px;
              }
              
              .footer-title {
                font-size: 13px;
                color: #7a7a90;
                margin-bottom: 12px;
              }
              
              .footer-divider {
                width: 40px;
                height: 2px;
                background: linear-gradient(90deg, #7c4dff, #ff4a57);
                margin: 12px auto;
                border-radius: 2px;
              }
              
              .footer-email {
                font-size: 13px;
                color: #7a7a90;
              }
              
              .footer-email a {
                color: #9b7ff4;
                text-decoration: none;
                font-weight: 500;
              }
              
              .footer-email a:hover {
                text-decoration: underline;
              }
              
              .response-badge {
                display: inline-block;
                background: rgba(62, 207, 142, 0.12);
                border: 1px solid rgba(62, 207, 142, 0.2);
                border-radius: 100px;
                padding: 4px 16px;
                font-size: 12px;
                color: #3ecf8e;
                font-weight: 500;
                margin-top: 12px;
              }
              
              .response-badge::before {
                content: '●';
                margin-right: 6px;
                animation: pulse-dot 2s ease-in-out infinite;
              }
              
              @keyframes pulse-dot {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
              }
              
              @media (max-width: 480px) {
                .header-gradient { padding: 30px 20px 24px; }
                .header-title { font-size: 22px; }
                .body-content { padding: 24px 20px 20px; }
                .footer-section { padding: 20px; }
                .social-link { padding: 6px 14px; font-size: 12px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <!-- Header -->
              <div class="header-gradient">
                <div class="header-content">
                  <span class="wave-emoji">👋</span>
                  <h1 class="header-title">You're Awesome!</h1>
                  <p class="header-subtitle">Your message has been received with ❤️</p>
                </div>
              </div>
              
              <!-- Body -->
              <div class="body-content">
                <p class="greeting">Hey <span>${name}</span>,</p>
                
                <p class="text-content">
                  Thank you for reaching out through my portfolio. I truly appreciate you taking the time to connect with me.
                </p>
                
                <p class="text-content">
                  I've received your message and I'm excited to read it. I'll make sure to get back to you within <strong>24 hours</strong> with a thoughtful response.
                </p>
                
                <!-- Message Card -->
                <div class="message-card">
                  <div class="message-label">📝 Your Message</div>
                  <p class="message-text">"${message}"</p>
                </div>
                
                <!-- Timeline -->
                <div class="timeline-box">
                  <span class="timeline-icon">⏳</span>
                  <div class="timeline-content">
                    <div class="timeline-title">What happens next?</div>
                    <div class="timeline-desc">
                      I'll review your message and reply within <strong>24 hours</strong>
                    </div>
                  </div>
                </div>
                
                <div class="divider"></div>
                
                <!-- Social Links -->
                <div class="social-section">
                  <span class="social-label">🌟 Connect With Me</span>
                  <div class="social-links">
                    <a href="https://www.instagram.com/ayushsrivastava_01" class="social-link insta">📸 Instagram</a>
                    <a href="https://www.linkedin.com/in/ayush-srivastava01" class="social-link linkedin">💼 LinkedIn</a>
                    <a href="https://github.com/ayushsrivastava-01" class="social-link github">🐙 GitHub</a>
                  </div>
                </div>
              </div>
              
              <!-- Footer -->
              <div class="footer-section">
                <div class="footer-name">Ayush Srivastava</div>
                <div class="footer-title">Full Stack Developer</div>
                <div class="footer-divider"></div>
                <div class="footer-email">
                  📧 <a href="mailto:srivastava999ayush@gmail.com">srivastava999ayush@gmail.com</a>
                </div>
                <div class="response-badge">✅ Response within 24 hours</div>
              </div>
            </div>
          </body>
          </html>
        `,
        replyTo: {
          name: 'Ayush Srivastava',
          email: 'srivastava999ayush@gmail.com'
        }
      })
    });

    // 📧 2️⃣ Tujhe notification email (Admin - Premium)
    const adminEmailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: 'Portfolio Contact Form',
          email: 'srivastava999ayush@gmail.com'
        },
        to: [
          {
            email: 'srivastava999ayush@gmail.com',
            name: 'Ayush'
          }
        ],
        subject: `🔔 New Portfolio Message from ${name}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Inter', -apple-system, sans-serif; background: #0a0a14; color: #e8e8f0; padding: 40px 20px; }
              .container { max-width: 560px; margin: 0 auto; background: #111122; border-radius: 20px; border: 1px solid rgba(255,255,255,0.06); padding: 40px; }
              .header { text-align: center; margin-bottom: 30px; }
              .header h1 { font-size: 24px; font-weight: 700; background: linear-gradient(135deg, #7c4dff, #ff4a57); -webkit-background-clip: text; background-clip: text; color: transparent; }
              .badge { display: inline-block; background: #ff4a57; color: #fff; padding: 4px 14px; border-radius: 100px; font-size: 12px; font-weight: 600; }
              .detail-box { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px 20px; margin: 12px 0; border-left: 3px solid #7c4dff; }
              .detail-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #7a7a90; }
              .detail-value { font-size: 16px; color: #fff; margin-top: 4px; }
              .message-box { background: rgba(124,77,255,0.06); border: 1px solid rgba(124,77,255,0.1); border-radius: 12px; padding: 16px 20px; margin: 16px 0; }
              .message-box p { color: #b8b8d0; font-style: italic; margin: 0; }
              .action-btn { display: inline-block; background: #7c4dff; color: #fff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; color: #55556a; font-size: 13px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <span class="badge">📩 NEW SUBMISSION</span>
                <h1>🔥 Someone just reached out!</h1>
                <p style="color: #7a7a90; margin-top: 8px;">Check out the details below</p>
              </div>
              
              <div class="detail-box">
                <div class="detail-label">👤 Name</div>
                <div class="detail-value">${name}</div>
              </div>
              
              <div class="detail-box">
                <div class="detail-label">📧 Email</div>
                <div class="detail-value"><a href="mailto:${email}" style="color: #9b7ff4; text-decoration: none;">${email}</a></div>
              </div>
              
              <div class="message-box">
                <div class="detail-label">💬 Message</div>
                <p>"${message}"</p>
              </div>
              
              <div style="text-align: center;">
                <a href="mailto:${email}" class="action-btn">✉️ Reply to ${name}</a>
              </div>
              
              <div class="footer">
                <p>This is an automated notification from your portfolio.</p>
                <p style="font-size: 12px;">srivastava999ayush@gmail.com</p>
              </div>
            </div>
          </body>
          </html>
        `
      })
    });

    // Check responses
    const userOk = userEmailResponse.ok;
    const adminOk = adminEmailResponse.ok;

    if (!userOk || !adminOk) {
      const userError = userOk ? 'OK' : await userEmailResponse.text();
      const adminError = adminOk ? 'OK' : await adminEmailResponse.text();
      
      console.error('User Email Status:', userOk);
      console.error('Admin Email Status:', adminOk);
      
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false,
          error: 'Email sending partially failed', 
          details: { userOk, adminOk }
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Both emails sent successfully' 
      })
    };

  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Internal server error', 
        details: error.message 
      })
    };
  }
};