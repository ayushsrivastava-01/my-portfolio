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
                margin-bottom: 14px;
                text-align: left;
              }
              .social-links {
                display: flex;
                justify-content: flex-start;
                gap: 24px;
                flex-wrap: wrap;
              }
              .social-links a {
                color: #8a8aaa;
                text-decoration: none;
                font-size: 14px;
                font-weight: 500;
                transition: color 0.3s ease;
              }
              .social-links a:hover {
                color: #9b7ff4;
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
              <div class="social-links">
                <a href="https://www.instagram.com/ayushsrivastava_01">Instagram</a>
                <a href="https://www.linkedin.com/in/ayush-srivastava01">LinkedIn</a>
                <a href="https://github.com/ayushsrivastava-01">GitHub</a>
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
          <h2>New Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f5f5f5; padding: 12px 16px; border-radius: 6px; border-left: 3px solid #7c4dff;">${message}</blockquote>
          <hr>
          <p><a href="mailto:${email}" style="background: #7c4dff; color: white; padding: 8px 20px; border-radius: 4px; text-decoration: none;">Reply to ${name}</a></p>
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