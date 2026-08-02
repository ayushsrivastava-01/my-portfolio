// ✅ No require needed - Node 18+ has built-in fetch
// ✅ ES Module syntax - export const handler

export const handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const { name, email, message } = formData;

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
            <title>Thank You</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                background: #0a0a14;
                padding: 40px 20px;
                line-height: 1.6;
              }
              
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
                padding: 40px 40px 30px;
                text-align: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.04);
                position: relative;
              }
              
              .header::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #7c4dff, #ff6b6b, #7c4dff);
                background-size: 200% 100%;
                animation: glow 4s ease-in-out infinite;
              }
              
              @keyframes glow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
              
              .header-logo {
                width: 72px;
                height: 72px;
                border-radius: 50%;
                border: 2px solid rgba(124, 77, 255, 0.2);
                padding: 4px;
                margin-bottom: 16px;
                background: rgba(124, 77, 255, 0.05);
              }
              
              .header-logo img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
              }
              
              .header h1 {
                color: #ffffff;
                font-size: 26px;
                font-weight: 700;
                letter-spacing: -0.5px;
              }
              
              .header p {
                color: rgba(255, 255, 255, 0.4);
                font-size: 14px;
                margin-top: 6px;
              }
              
              /* ── Body ── */
              .body {
                padding: 35px 40px 30px;
              }
              
              .greeting {
                font-size: 18px;
                font-weight: 600;
                color: #e8e8f0;
                margin-bottom: 14px;
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
                margin-bottom: 12px;
              }
              
              .text strong {
                color: #e8e8f0;
              }
              
              /* ── Message Box ── */
              .message-box {
                background: rgba(124, 77, 255, 0.04);
                border: 1px solid rgba(124, 77, 255, 0.08);
                border-radius: 12px;
                padding: 18px 22px;
                margin: 18px 0 22px;
                border-left: 3px solid #7c4dff;
              }
              
              .message-label {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #7c4dff;
                font-weight: 600;
                display: block;
                margin-bottom: 6px;
              }
              
              .message-box p {
                color: #c8c8e0;
                font-style: italic;
                font-size: 15px;
                line-height: 1.7;
                margin: 0;
              }
              
              /* ── Timeline ── */
              .timeline {
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.04);
                border-radius: 12px;
                padding: 16px 20px;
                margin: 18px 0 22px;
                display: flex;
                align-items: center;
                gap: 14px;
              }
              
              .timeline-icon {
                width: 36px;
                height: 36px;
                background: rgba(124, 77, 255, 0.08);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              }
              
              .timeline-icon svg {
                width: 18px;
                height: 18px;
                fill: #9b7ff4;
              }
              
              .timeline-content .label {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                color: #55556a;
                font-weight: 600;
              }
              
              .timeline-content .value {
                font-size: 14px;
                color: #c8c8e0;
              }
              
              .timeline-content .value strong {
                color: #3ecf8e;
              }
              
              /* ── Divider ── */
              .divider {
                height: 1px;
                background: rgba(255, 255, 255, 0.04);
                margin: 22px 0;
              }
              
              /* ── Social ── */
              .social-section {
                margin-top: 4px;
              }
              
              .social-label {
                font-size: 12px;
                color: #55556a;
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
                gap: 8px;
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
              
              .social-link svg {
                width: 16px;
                height: 16px;
                fill: currentColor;
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
                padding: 28px 40px 32px;
                text-align: center;
                border-top: 1px solid rgba(255, 255, 255, 0.04);
              }
              
              .footer-name {
                font-size: 18px;
                font-weight: 700;
                color: #e8e8f0;
              }
              
              .footer-title {
                font-size: 14px;
                color: #55556a;
                margin-top: 2px;
              }
              
              .footer-divider {
                width: 40px;
                height: 2px;
                background: linear-gradient(90deg, #7c4dff, #ff6b6b);
                margin: 12px auto;
                border-radius: 2px;
              }
              
              .footer-regards {
                color: #8a8aaa;
                font-size: 15px;
                font-weight: 500;
                margin: 8px 0 6px;
              }
              
              .footer-email {
                font-size: 14px;
                color: #55556a;
                margin-top: 4px;
              }
              
              .footer-email svg {
                width: 16px;
                height: 16px;
                fill: #55556a;
                vertical-align: middle;
                margin-right: 6px;
              }
              
              .footer-email a {
                color: #9b7ff4;
                text-decoration: none;
              }
              
              .footer-email a:hover {
                text-decoration: underline;
              }
              
              .badge {
                display: inline-block;
                background: rgba(62, 207, 142, 0.06);
                border: 1px solid rgba(62, 207, 142, 0.1);
                border-radius: 100px;
                padding: 6px 18px;
                font-size: 13px;
                color: #3ecf8e;
                font-weight: 500;
                margin-top: 14px;
              }
              
              .badge svg {
                width: 14px;
                height: 14px;
                fill: #3ecf8e;
                vertical-align: middle;
                margin-right: 6px;
              }
              
              @media (max-width: 480px) {
                .header { padding: 28px 20px 24px; }
                .header h1 { font-size: 22px; }
                .header-logo { width: 60px; height: 60px; }
                .body { padding: 24px 20px 20px; }
                .footer { padding: 20px; }
                .social-link { padding: 6px 14px; font-size: 12px; }
                .timeline { flex-direction: column; text-align: center; gap: 8px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <!-- Header -->
              <div class="header">
                <div class="header-logo">
                  <img src="https://ayushsrivastava.netlify.app/icon.png" alt="Ayush Srivastava">
                </div>
                <h1>Thanks for Reaching Out</h1>
                <p>I'll get back to you within 24 hours</p>
              </div>
              
              <!-- Body -->
              <div class="body">
                <div class="greeting">Hi <span>${name}</span>,</div>
                
                <p class="text">
                  Thank you for reaching out to me. I have received your message and will respond to you within <strong>24 hours</strong>.
                </p>
                
                <div class="message-box">
                  <span class="message-label">Your Query</span>
                  <p>${message}</p>
                </div>
                
                <div class="timeline">
                  <div class="timeline-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                    </svg>
                  </div>
                  <div class="timeline-content">
                    <div class="label">Next Steps</div>
                    <div class="value">I'll review your message and reply within <strong>24 hours</strong></div>
                  </div>
                </div>
                
                <div class="divider"></div>
                
                <div class="social-section">
                  <span class="social-label">Connect with me</span>
                  <div class="social-links">
                    <a href="https://www.instagram.com/ayushsrivastava_01" class="social-link insta">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                      </svg>
                      Instagram
                    </a>
                    <a href="https://www.linkedin.com/in/ayush-srivastava01" class="social-link linkedin">
                      <svg viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                    <a href="https://github.com/ayushsrivastava-01" class="social-link github">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.399s2.04.132 3 .399c2.292-1.552 3.3-1.23 3.3-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.694.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
              
              <!-- Footer -->
              <div class="footer">
                <div class="footer-name">Ayush Srivastava</div>
                <div class="footer-title">Full Stack Developer</div>
                <div class="footer-divider"></div>
                <div class="footer-regards">Regards,</div>
                <div class="footer-email">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <a href="mailto:srivastava999ayush@gmail.com">srivastava999ayush@gmail.com</a>
                </div>
                <div class="badge">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  Response within 24 hours
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