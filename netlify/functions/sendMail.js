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

    // 📧 1️⃣ User ko auto-reply email
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
        subject: `Thanks for reaching out, ${name}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You Email</title>
            <style>
              /* ── Reset ── */
              * { margin: 0; padding: 0; box-sizing: border-box; }
              
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                background: #0a0a14;
                padding: 40px 20px;
                line-height: 1.6;
              }
              
              /* ── Container ── */
              .container {
                max-width: 560px;
                margin: 0 auto;
                background: #12121f;
                border-radius: 20px;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.06);
                box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
              }
              
              /* ── Header ── */
              .header {
                background: linear-gradient(135deg, #1a1a2e, #0d0d1a);
                padding: 32px 40px 28px;
                text-align: center;
                position: relative;
                border-bottom: 1px solid rgba(255, 255, 255, 0.04);
              }
              
              .header-icon {
                display: inline-block;
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background: linear-gradient(135deg, rgba(124,77,255,0.15), rgba(124,77,255,0.05));
                border: 2px solid rgba(124,77,255,0.15);
                padding: 12px;
                margin-bottom: 12px;
                overflow: hidden;
              }
              
              .header-icon img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
              }
              
              .header h1 {
                color: #ffffff;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: -0.5px;
              }
              
              .header p {
                color: rgba(255, 255, 255, 0.4);
                font-size: 14px;
                font-weight: 400;
                margin-top: 4px;
              }
              
              .header-glow {
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, #7c4dff, #ff6b6b, #7c4dff, transparent);
                background-size: 200% 100%;
                animation: glowMove 4s ease-in-out infinite;
              }
              
              @keyframes glowMove {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
              
              /* ── Body ── */
              .body {
                padding: 32px 40px 28px;
              }
              
              .greeting {
                font-size: 17px;
                font-weight: 600;
                color: #e8e8f0;
                margin-bottom: 12px;
              }
              
              .greeting span {
                background: linear-gradient(135deg, #9b7ff4, #ff6b7a);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
              }
              
              .text {
                color: #8a8aaa;
                font-size: 15px;
                line-height: 1.8;
                margin-bottom: 10px;
              }
              
              .text strong {
                color: #e8e8f0;
                font-weight: 600;
              }
              
              /* ── Message Box ── */
              .message-box {
                background: rgba(124, 77, 255, 0.04);
                border: 1px solid rgba(124, 77, 255, 0.08);
                border-radius: 12px;
                padding: 16px 20px;
                margin: 16px 0 20px;
                position: relative;
              }
              
              .message-box::before {
                content: '"';
                position: absolute;
                top: 0px;
                left: 12px;
                font-size: 32px;
                color: rgba(124, 77, 255, 0.15);
                font-family: Georgia, serif;
                line-height: 1;
              }
              
              .message-label {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #7c4dff;
                font-weight: 600;
                margin-bottom: 6px;
                display: block;
                padding-left: 4px;
              }
              
              .message-box p {
                color: #c8c8e0;
                font-style: italic;
                font-size: 14px;
                line-height: 1.7;
                margin: 0;
                padding-left: 16px;
              }
              
              /* ── Timeline Box ── */
              .timeline {
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.04);
                border-radius: 12px;
                padding: 16px 20px;
                margin: 16px 0 20px;
                display: flex;
                align-items: center;
                gap: 14px;
              }
              
              .timeline-icon {
                font-size: 22px;
                flex-shrink: 0;
              }
              
              .timeline-content {
                flex: 1;
              }
              
              .timeline-content .label {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                color: #55556a;
                font-weight: 600;
              }
              
              .timeline-content .value {
                font-size: 14px;
                color: #c8c8e0;
                font-weight: 400;
              }
              
              .timeline-content .value strong {
                color: #3ecf8e;
                font-weight: 600;
              }
              
              /* ── Divider ── */
              .divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
                margin: 20px 0;
              }
              
              /* ── Social Section ── */
              .social-section {
                margin-top: 4px;
              }
              
              .social-label {
                font-size: 12px;
                color: #55556a;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                display: block;
                margin-bottom: 12px;
              }
              
              .social-links {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
              }
              
              .social-link {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 8px 18px;
                border-radius: 100px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.06);
                color: #8a8aaa;
                text-decoration: none;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.3s ease;
              }
              
              .social-link:hover {
                background: rgba(124, 77, 255, 0.1);
                border-color: rgba(124, 77, 255, 0.2);
                color: #ffffff;
                transform: translateY(-2px);
              }
              
              .social-link.insta:hover { 
                background: rgba(228, 64, 95, 0.12); 
                border-color: #E4405F; 
                color: #E4405F; 
              }
              .social-link.linkedin:hover { 
                background: rgba(10, 102, 194, 0.12); 
                border-color: #0A66C2; 
                color: #0A66C2; 
              }
              .social-link.github:hover { 
                background: rgba(255, 255, 255, 0.06); 
                border-color: rgba(255, 255, 255, 0.2); 
                color: #ffffff; 
              }
              
              /* ── Footer ── */
              .footer {
                background: rgba(255, 255, 255, 0.01);
                padding: 24px 40px 28px;
                text-align: center;
                border-top: 1px solid rgba(255, 255, 255, 0.04);
              }
              
              .footer-name {
                font-size: 17px;
                font-weight: 700;
                color: #e8e8f0;
              }
              
              .footer-title {
                font-size: 13px;
                color: #55556a;
                margin-top: 2px;
              }
              
              .footer-divider {
                width: 32px;
                height: 2px;
                background: linear-gradient(90deg, #7c4dff, #ff6b6b);
                margin: 10px auto;
                border-radius: 2px;
              }
              
              .footer-email {
                font-size: 13px;
                color: #55556a;
                margin-top: 4px;
              }
              
              .footer-email a {
                color: #9b7ff4;
                text-decoration: none;
                font-weight: 500;
              }
              
              .footer-email a:hover {
                text-decoration: underline;
              }
              
              /* ── Badge ── */
              .badge {
                display: inline-block;
                background: rgba(62, 207, 142, 0.08);
                border: 1px solid rgba(62, 207, 142, 0.12);
                border-radius: 100px;
                padding: 4px 14px;
                font-size: 12px;
                color: #3ecf8e;
                font-weight: 500;
                margin-top: 12px;
              }
              
              .badge::before {
                content: '●';
                margin-right: 6px;
                animation: pulse 2s ease-in-out infinite;
              }
              
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
              }
              
              /* ── Responsive ── */
              @media (max-width: 480px) {
                .header { padding: 24px 20px 20px; }
                .header h1 { font-size: 20px; }
                .header-icon { width: 52px; height: 52px; padding: 10px; }
                .body { padding: 24px 20px 20px; }
                .footer { padding: 20px; }
                .social-link { padding: 6px 14px; font-size: 12px; }
                .timeline { flex-direction: column; text-align: center; gap: 6px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <!-- Header -->
              <div class="header">
                <div class="header-icon">
                  <img src="/icon.png" alt="Ayush Srivastava">
                </div>
                <h1>Thanks for Reaching Out</h1>
                <p>I'll get back to you within 24 hours</p>
                <div class="header-glow"></div>
              </div>
              
              <!-- Body -->
              <div class="body">
                <div class="greeting">Hi <span>${name}</span>,</div>
                
                <p class="text">
                  Thank you for reaching out to me. I have received your message and will respond to you within <strong>24 hours</strong>.
                </p>
                
                <!-- Message Box -->
                <div class="message-box">
                  <span class="message-label">📝 Your Query</span>
                  <p>${message}</p>
                </div>
                
                <!-- Timeline -->
                <div class="timeline">
                  <span class="timeline-icon">⏳</span>
                  <div class="timeline-content">
                    <div class="label">Next Steps</div>
                    <div class="value">I'll review your message and reply within <strong>24 hours</strong></div>
                  </div>
                </div>
                
                <div class="divider"></div>
                
                <!-- Social -->
                <div class="social-section">
                  <span class="social-label">🌐 Connect with me</span>
                  <div class="social-links">
                    <a href="https://www.instagram.com/ayushsrivastava_01" class="social-link insta">📸 Instagram</a>
                    <a href="https://www.linkedin.com/in/ayush-srivastava01" class="social-link linkedin">💼 LinkedIn</a>
                    <a href="https://github.com/ayushsrivastava-01" class="social-link github">🐙 GitHub</a>
                  </div>
                </div>
              </div>
              
              <!-- Footer -->
              <div class="footer">
                <div class="footer-name">Ayush Srivastava</div>
                <div class="footer-title">Full Stack Developer</div>
                <div class="footer-divider"></div>
                <div class="footer-email">
                  📧 <a href="mailto:srivastava999ayush@gmail.com">srivastava999ayush@gmail.com</a>
                </div>
                <div class="badge">✅ Response within 24 hours</div>
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

    // 📧 2️⃣ Tujhe notification email
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
          <h2>🔥 New Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f5f5f5; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #7c4dff;">${message}</blockquote>
          <hr>
          <p><a href="mailto:${email}" style="background: #7c4dff; color: white; padding: 8px 20px; border-radius: 6px; text-decoration: none;">Reply to ${name}</a></p>
        `
      })
    });

    // Check responses
    const userOk = userEmailResponse.ok;
    const adminOk = adminEmailResponse.ok;

    if (!userOk || !adminOk) {
      console.error('User Email Status:', userOk);
      console.error('Admin Email Status:', adminOk);
      
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false,
          error: 'Email sending failed'
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Emails sent successfully' 
      })
    };

  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Internal server error' 
      })
    };
  }
};