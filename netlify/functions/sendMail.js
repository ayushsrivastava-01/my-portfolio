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
        subject: `Re: Your message to Ayush Srivastava`,
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
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                background: #f0f2f5;
                padding: 40px 20px;
                line-height: 1.6;
              }
              
              /* ── Container ── */
              .container {
                max-width: 560px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
              }
              
              /* ── Header ── */
              .header {
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                padding: 32px 40px 28px;
                text-align: center;
                position: relative;
              }
              
              .header::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #7c4dff, #ff6b6b, #7c4dff);
                background-size: 200% 100%;
                animation: shimmer 3s ease-in-out infinite;
              }
              
              @keyframes shimmer {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
              
              .header-icon {
                font-size: 42px;
                margin-bottom: 6px;
                display: block;
              }
              
              .header h1 {
                color: #ffffff;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: -0.5px;
              }
              
              .header p {
                color: rgba(255, 255, 255, 0.6);
                font-size: 14px;
                font-weight: 400;
                margin-top: 4px;
              }
              
              /* ── Body ── */
              .body {
                padding: 32px 40px 28px;
              }
              
              .greeting {
                font-size: 17px;
                font-weight: 600;
                color: #1a1a2e;
                margin-bottom: 12px;
              }
              
              .greeting span {
                color: #7c4dff;
              }
              
              .text {
                color: #4a4a6a;
                font-size: 15px;
                line-height: 1.8;
                margin-bottom: 10px;
              }
              
              .text strong {
                color: #1a1a2e;
                font-weight: 600;
              }
              
              /* ── Message Box ── */
              .message-box {
                background: #f8f7ff;
                border: 1px solid #e8e6ff;
                border-radius: 12px;
                padding: 16px 20px;
                margin: 16px 0 20px;
                position: relative;
              }
              
              .message-box::before {
                content: '"';
                position: absolute;
                top: 4px;
                left: 12px;
                font-size: 32px;
                color: #d5cfff;
                font-family: Georgia, serif;
                line-height: 1;
              }
              
              .message-box p {
                color: #2a2a4a;
                font-style: italic;
                font-size: 14px;
                line-height: 1.7;
                margin: 0;
                padding-left: 16px;
              }
              
              /* ── Timeline Box ── */
              .timeline {
                background: #f8faff;
                border: 1px solid #e8edff;
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
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #8888bb;
                font-weight: 600;
              }
              
              .timeline-content .value {
                font-size: 14px;
                color: #1a1a2e;
                font-weight: 500;
              }
              
              .timeline-content .value strong {
                color: #7c4dff;
              }
              
              /* ── Divider ── */
              .divider {
                height: 1px;
                background: #eef0f5;
                margin: 20px 0;
              }
              
              /* ── Social Section ── */
              .social-section {
                margin-top: 4px;
              }
              
              .social-label {
                font-size: 13px;
                color: #8888aa;
                font-weight: 500;
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
                background: #f5f5ff;
                border: 1px solid #e8e6ff;
                color: #4a4a6a;
                text-decoration: none;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.25s ease;
              }
              
              .social-link:hover {
                background: #7c4dff;
                border-color: #7c4dff;
                color: #ffffff;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(124, 77, 255, 0.25);
              }
              
              .social-link.insta:hover { background: #E4405F; border-color: #E4405F; }
              .social-link.linkedin:hover { background: #0A66C2; border-color: #0A66C2; }
              .social-link.github:hover { background: #1a1a2e; border-color: #1a1a2e; }
              
              /* ── Footer ── */
              .footer {
                background: #fafafe;
                padding: 24px 40px 28px;
                text-align: center;
                border-top: 1px solid #eef0f5;
              }
              
              .footer-name {
                font-size: 17px;
                font-weight: 700;
                color: #1a1a2e;
              }
              
              .footer-title {
                font-size: 13px;
                color: #8888aa;
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
                color: #8888aa;
                margin-top: 4px;
              }
              
              .footer-email a {
                color: #7c4dff;
                text-decoration: none;
                font-weight: 500;
              }
              
              .footer-email a:hover {
                text-decoration: underline;
              }
              
              /* ── Responsive ── */
              @media (max-width: 480px) {
                .header { padding: 24px 20px 20px; }
                .header h1 { font-size: 20px; }
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
                <span class="header-icon">📬</span>
                <h1>Message Received</h1>
                <p>I'll get back to you within 24 hours</p>
              </div>
              
              <!-- Body -->
              <div class="body">
                <div class="greeting">Hi <span>${name}</span>,</div>
                
                <p class="text">
                  Thank you for reaching out to me. I have received your message and will respond to you within <strong>24 hours</strong>.
                </p>
                
                <!-- Message Box -->
                <div class="message-box">
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