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
        subject: `Thanks for reaching out, ${name}! 🙌`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 40px 20px; }
              .container { max-width: 550px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
              h2 { color: #1a1a2e; margin-bottom: 10px; }
              .message-box { background: #f8f8ff; padding: 16px 20px; border-radius: 8px; border-left: 4px solid #7c4dff; margin: 20px 0; }
              .message-box p { color: #333; font-style: italic; margin: 0; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
              .social { margin: 16px 0; }
              .social a { color: #7c4dff; text-decoration: none; margin-right: 16px; }
              .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 20px; font-size: 13px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Hi ${name}! 👋</h2>
              
              <p>Thank you for reaching out through my portfolio. I've received your message and will get back to you within <strong>24 hours</strong>.</p>
              
              <div class="message-box">
                <p>"${message}"</p>
              </div>
              
              <div class="social">
                <a href="https://www.instagram.com/ayushsrivastava_01">📸 Instagram</a>
                <a href="https://www.linkedin.com/in/ayush-srivastava01">💼 LinkedIn</a>
                <a href="https://github.com/ayushsrivastava-01">🐙 GitHub</a>
              </div>
              
              <div class="badge">✅ Response within 24 hours</div>
              
              <div class="footer">
                <strong>Ayush Srivastava</strong><br>
                <span style="color: #999;">Full Stack Developer</span>
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
        subject: `🔔 New Message from ${name}`,
        htmlContent: `
          <h2>New Portfolio Message</h2>
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