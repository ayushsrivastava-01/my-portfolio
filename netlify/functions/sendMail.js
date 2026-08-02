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

    const firstName = name.trim().split(' ')[0];

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
            name: firstName
          }
        ],
        subject: `Thanks for reaching out, ${name}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                background: #0a0a14;
                padding: 40px 20px;
                line-height: 1.6;
              }
              .container {
                max-width: 520px;
                margin: 0 auto;
                background: #12121f;
                border-radius: 16px;
                padding: 40px 45px;
                border: 2px solid rgba(124, 77, 255, 0.12);
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
              }
              .header-center {
                text-align: center;
                margin-bottom: 24px;
              }
              .header-center h1 {
                color: #ffffff;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: -0.5px;
              }
              .header-center .sub {
                color: rgba(255,255,255,0.3);
                font-size: 14px;
                margin-top: 4px;
              }
              .greeting {
                color: #e8e8f0;
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 12px;
                text-align: left;
              }
              .greeting span {
                color: #9b7ff4;
              }
              .text {
                color: #8a8aaa;
                font-size: 15px;
                line-height: 1.8;
                margin-bottom: 10px;
                text-align: left;
              }
              .text strong {
                color: #e8e8f0;
              }
              .message-box {
                background: rgba(124,77,255,0.04);
                border-left: 3px solid #7c4dff;
                padding: 14px 18px;
                margin: 16px 0 20px;
                border-radius: 0 8px 8px 0;
                text-align: left;
              }
              .message-label {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #7c4dff;
                font-weight: 600;
                display: block;
                margin-bottom: 4px;
              }
              .message-box p {
                color: #c8c8e0;
                font-size: 14px;
                line-height: 1.6;
                margin: 0;
              }
              .next-box {
                background: rgba(62,207,142,0.04);
                border-left: 3px solid #3ecf8e;
                padding: 14px 18px;
                margin: 16px 0 22px;
                border-radius: 0 8px 8px 0;
                text-align: left;
              }
              .next-label {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #3ecf8e;
                font-weight: 600;
                display: block;
                margin-bottom: 4px;
              }
              .next-box p {
                color: #c8c8e0;
                font-size: 14px;
                line-height: 1.6;
                margin: 0;
              }
              .next-box p strong {
                color: #3ecf8e;
              }
              .divider {
                height: 1px;
                background: rgba(255,255,255,0.04);
                margin: 22px 0;
              }
              .social-label {
                color: #8a8aaa;
                font-size: 14px;
                display: block;
                margin-bottom: 14px;
                text-align: left;
              }
              
              /* Social Icons Box - FULL WIDTH */
              .social-box {
                background: rgba(255,255,255,0.02);
                border: 1px solid rgba(255,255,255,0.04);
                border-radius: 12px;
                padding: 12px 16px;
                display: block;
                width: 100%;
                box-sizing: border-box;
              }
              
              .social-links {
                display: flex;
                justify-content: flex-start;
                gap: 12px;
                flex-wrap: wrap;
              }
              .social-btn {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 14px;
                border-radius: 100px;
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.06);
                color: #8a8aaa;
                text-decoration: none;
                font-size: 12px;
                font-weight: 500;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
              }
              .social-btn .icon {
                width: 16px;
                height: 16px;
                flex-shrink: 0;
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .social-btn .text {
                font-size: 12px;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .social-btn:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
              }
              .social-btn:hover .icon {
                transform: scale(1.15) rotate(-5deg);
              }
              .social-btn.insta:hover {
                background: #E4405F;
                border-color: #E4405F;
                color: #ffffff;
                box-shadow: 0 8px 25px rgba(228, 64, 95, 0.35);
              }
              .social-btn.linkedin:hover {
                background: #0A66C2;
                border-color: #0A66C2;
                color: #ffffff;
                box-shadow: 0 8px 25px rgba(10, 102, 194, 0.35);
              }
              .social-btn.github:hover {
                background: #ffffff;
                border-color: #ffffff;
                color: #12121f;
                box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
              }
              .social-btn.threads:hover {
                background: #000000;
                border-color: #000000;
                color: #ffffff;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
              }
              .footer {
                margin-top: 28px;
                padding-top: 20px;
                border-top: 2px solid rgba(124, 77, 255, 0.08);
                text-align: left;
              }
              .footer-regards {
                color: #8a8aaa;
                font-size: 14px;
                margin-bottom: 2px;
              }
              .footer-name {
                color: #e8e8f0;
                font-size: 17px;
                font-weight: 600;
              }
              @media (max-width: 480px) {
                .container { padding: 24px 20px; }
                .header-center h1 { font-size: 20px; }
                .social-box { padding: 8px 10px; }
                .social-btn {
                  padding: 5px 10px;
                  font-size: 11px;
                }
                .social-btn .icon { width: 14px; height: 14px; }
                .social-btn .text { font-size: 11px; }
                .social-links { gap: 8px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header-center">
                <h1>~ Message Received ~</h1>
                <div class="sub">I'll get back to you soon!</div>
              </div>
              
              <div class="greeting">Hi <span>${firstName}</span>,</div>
              
              <p class="text">
                Thank you for reaching out to me. I have received your message.
              </p>
              
              <div class="message-box">
                <span class="message-label">Your Message</span>
                <p>${message}</p>
              </div>
              
              <div class="next-box">
                <span class="next-label">Next Steps</span>
                <p>I'll review your message and reply within <strong>24 hours</strong></p>
              </div>
              
              <div class="divider"></div>
              
              <span class="social-label">✨ In the meantime, feel free to explore my work and connect with me on social media</span>
              
              <!-- Social Icons Box - FULL WIDTH -->
              <div class="social-box">
                <div class="social-links">
                  <a href="https://www.instagram.com/ayushsrivastava_01" class="social-btn insta">
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                    <span class="text">Instagram</span>
                  </a>
                  <a href="https://www.linkedin.com/in/ayush-srivastava01" class="social-btn linkedin">
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span class="text">LinkedIn</span>
                  </a>
                  <a href="https://github.com/ayushsrivastava-01" class="social-btn github">
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.399s2.04.132 3 .399c2.292-1.552 3.3-1.23 3.3-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.694.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    <span class="text">GitHub</span>
                  </a>
                  <a href="https://www.threads.net/@ayushsrivastava_01" class="social-btn threads">
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                    </svg>
                    <span class="text">Threads</span>
                  </a>
                </div>
              </div>
              
              <div class="footer">
                <div class="footer-regards">Regards,</div>
                <div class="footer-name">Ayush Srivastava</div>
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

    // 📧 2️⃣ Admin notification
    const adminEmailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: 'Portfolio Form',
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
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                background: #0a0a14;
                padding: 40px 20px;
                line-height: 1.6;
              }
              .container {
                max-width: 520px;
                margin: 0 auto;
                background: #12121f;
                border-radius: 16px;
                padding: 40px 45px;
                border: 2px solid rgba(255, 74, 87, 0.15);
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
              }
              .header-center {
                text-align: center;
                margin-bottom: 24px;
                padding-bottom: 20px;
                border-bottom: 2px solid rgba(255, 74, 87, 0.08);
              }
              .header-center .badge {
                display: inline-block;
                background: rgba(255, 74, 87, 0.12);
                border: 1px solid rgba(255, 74, 87, 0.2);
                border-radius: 100px;
                padding: 4px 16px;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #ff4a57;
                font-weight: 600;
                margin-bottom: 10px;
              }
              .header-center h1 {
                color: #ffffff;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: -0.5px;
              }
              .header-center .sub {
                color: rgba(255,255,255,0.3);
                font-size: 14px;
                margin-top: 4px;
              }
              .detail-box {
                background: rgba(255,255,255,0.02);
                border: 1px solid rgba(255,255,255,0.04);
                border-radius: 10px;
                padding: 14px 18px;
                margin: 12px 0;
                text-align: left;
              }
              .detail-label {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                color: #55556a;
                font-weight: 600;
                display: block;
                margin-bottom: 2px;
              }
              .detail-value {
                color: #e8e8f0;
                font-size: 15px;
                font-weight: 500;
              }
              .detail-value a {
                color: #9b7ff4;
                text-decoration: none;
              }
              .message-box {
                background: rgba(255, 74, 87, 0.04);
                border-left: 3px solid #ff4a57;
                padding: 14px 18px;
                margin: 16px 0 20px;
                border-radius: 0 8px 8px 0;
                text-align: left;
              }
              .message-label {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #ff4a57;
                font-weight: 600;
                display: block;
                margin-bottom: 4px;
              }
              .message-box p {
                color: #c8c8e0;
                font-size: 14px;
                line-height: 1.6;
                margin: 0;
                font-style: italic;
              }
              .divider {
                height: 1px;
                background: rgba(255,255,255,0.04);
                margin: 20px 0;
              }
              .action-box {
                background: rgba(124,77,255,0.06);
                border: 1px solid rgba(124,77,255,0.1);
                border-radius: 10px;
                padding: 16px 20px;
                text-align: center;
                margin: 16px 0 8px;
              }
              .action-btn {
                display: inline-block;
                background: #7c4dff;
                color: #ffffff;
                padding: 10px 28px;
                border-radius: 8px;
                text-decoration: none;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.3s ease;
              }
              .action-btn:hover {
                background: #6c3ce0;
                transform: translateY(-2px);
                box-shadow: 0 8px 30px rgba(124, 77, 255, 0.3);
              }
              .footer {
                margin-top: 24px;
                padding-top: 20px;
                border-top: 2px solid rgba(255, 74, 87, 0.08);
                text-align: center;
                color: #55556a;
                font-size: 13px;
              }
              .footer strong {
                color: #e8e8f0;
              }
              .footer-time {
                margin-top: 4px;
                color: #3a3a5a;
                font-size: 12px;
              }
              @media (max-width: 480px) {
                .container { padding: 24px 20px; }
                .header-center h1 { font-size: 20px; }
                .action-btn { padding: 8px 20px; font-size: 13px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header-center">
                <span class="badge">🔔 New Submission</span>
                <h1>Someone Just Reached Out!</h1>
                <div class="sub">Check the details below and respond</div>
              </div>
              
              <div class="detail-box">
                <span class="detail-label">👤 Name</span>
                <div class="detail-value">${name}</div>
              </div>
              
              <div class="detail-box">
                <span class="detail-label">📧 Email</span>
                <div class="detail-value">
                  <a href="mailto:${email}">${email}</a>
                </div>
              </div>
              
              <div class="message-box">
                <span class="message-label">💬 Message</span>
                <p>${message}</p>
              </div>
              
              <div class="divider"></div>
              
              <div class="action-box">
                <a href="mailto:${email}" class="action-btn">✉️ Reply to ${name}</a>
              </div>
              
              <div class="footer">
                <div>This is an automated notification from your portfolio.</div>
                <div class="footer-time">📬 Sent from <strong>ayushsri.netlify.app</strong></div>
              </div>
            </div>
          </body>
          </html>
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
        body: JSON.stringify({ success: false, error: 'Email sending failed' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Emails sent successfully' })
    };

  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};