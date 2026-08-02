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

    // Sirf first name extract karo
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
                margin-bottom: 16px;
                text-align: left;
              }
              .social-links {
                display: flex;
                justify-content: flex-start;
                gap: 16px;
                flex-wrap: wrap;
              }
              .social-btn {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 10px 24px;
                border-radius: 100px;
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.06);
                color: #8a8aaa;
                text-decoration: none;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .social-btn .icon {
                font-size: 18px;
              }
              .social-btn .text {
                font-size: 14px;
              }
              .social-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.2);
              }
              .social-btn.insta:hover {
                background: #E4405F;
                border-color: #E4405F;
                color: #ffffff;
                box-shadow: 0 8px 25px rgba(228, 64, 95, 0.3);
              }
              .social-btn.linkedin:hover {
                background: #0A66C2;
                border-color: #0A66C2;
                color: #ffffff;
                box-shadow: 0 8px 25px rgba(10, 102, 194, 0.3);
              }
              .social-btn.github:hover {
                background: #ffffff;
                border-color: #ffffff;
                color: #12121f;
                box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
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
                .social-btn {
                  padding: 8px 18px;
                  font-size: 13px;
                }
                .social-btn .icon { font-size: 16px; }
                .social-btn .text { font-size: 13px; }
                .social-links { gap: 12px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header-center">
                <h1>Message Received ✉️</h1>
                <div class="sub">I'll get back to you soon</div>
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
              <div class="social-links">
                <a href="https://www.instagram.com/ayushsrivastava_01" class="social-btn insta">
                  <span class="icon">📸</span>
                  <span class="text">Instagram</span>
                </a>
                <a href="https://www.linkedin.com/in/ayush-srivastava01" class="social-btn linkedin">
                  <span class="icon">💼</span>
                  <span class="text">LinkedIn</span>
                </a>
                <a href="https://github.com/ayushsrivastava-01" class="social-btn github">
                  <span class="icon">🐙</span>
                  <span class="text">GitHub</span>
                </a>
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

    // 📧 2️⃣ TUJHE ADMIN NOTIFICATION - PROFESSIONAL
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
              .detail-value a:hover {
                text-decoration: underline;
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
      body: JSON.stringify({ success: false, error: 'Internal server error' })
    };
  }
};