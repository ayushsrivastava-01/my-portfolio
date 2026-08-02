const fetch = require('node-fetch');

exports.handler = async function(event, context) {
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

    // 📧 1️⃣ User ko auto-reply email (jo form bhar raha hai)
    const userEmailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: 'Ayush Srivastava',
          email: 'srivastava999ayush@gmail.com'  // ✅ Verified sender
        },
        to: [
          {
            email: email,  // User ka email
            name: name
          }
        ],
        subject: `Thanks for reaching out, ${name}! 🙌`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Arial', sans-serif; background: #07070f; color: #e8e8f0; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 40px; }
              .header { text-align: center; margin-bottom: 30px; }
              h1 { font-family: 'Syne', sans-serif; font-size: 28px; background: linear-gradient(135deg, #fff, #9b7ff4); -webkit-background-clip: text; background-clip: text; color: transparent; }
              .divider { height: 2px; background: linear-gradient(90deg, transparent, #7c4dff, #ff4a57, transparent); margin: 20px 0; }
              .message-box { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 3px solid #7c4dff; }
              .footer { text-align: center; margin-top: 30px; color: #7a7a90; font-size: 14px; }
              .highlight { color: #9b7ff4; }
              .social { margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <div class="header">
                  <h1>Thanks for Connecting! 👋</h1>
                </div>
                
                <p>Hey <strong>${name}</strong>,</p>
                
                <p>Thank you for reaching out through my portfolio. I've received your message and wanted to let you know that I'll get back to you within <strong>24 hours</strong>.</p>
                
                <div class="divider"></div>
                
                <div class="message-box">
                  <p style="color: #9b7ff4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Message</p>
                  <p style="font-style: italic; color: #b8b8d0;">"${message}"</p>
                </div>
                
                <div class="divider"></div>
                
                <p>In the meantime, feel free to connect with me on social media:</p>
                
                <div class="social">
                  <a href="https://www.instagram.com/ayushsrivastava_01" style="color: #E4405F; text-decoration: none; margin: 0 8px;">Instagram</a> |
                  <a href="https://www.linkedin.com/in/ayush-srivastava01" style="color: #0A66C2; text-decoration: none; margin: 0 8px;">LinkedIn</a> |
                  <a href="https://github.com/ayushsrivastava-01" style="color: #fff; text-decoration: none; margin: 0 8px;">GitHub</a>
                </div>
                
                <div class="footer">
                  <p>Best regards,<br>
                  <strong style="color: #fff;">Ayush Srivastava</strong><br>
                  <span style="font-size: 12px;">Portfolio: <a href="https://ayushsrivastava.netlify.app" style="color: #9b7ff4; text-decoration: none;">ayushsrivastava.netlify.app</a></span></p>
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

    // 📧 2️⃣ Tujhe notification email (admin)
    const adminEmailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: 'Portfolio Contact Form',
          email: 'srivastava999ayush@gmail.com'  // ✅ Verified sender
        },
        to: [
          {
            email: 'srivastava999ayush@gmail.com',  // Tera email
            name: 'Ayush'
          }
        ],
        subject: `🔔 New Portfolio Message from ${name}`,
        htmlContent: `
          <h2>🔥 New Form Submission on Your Portfolio</h2>
          
          <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Message</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
            </tr>
          </table>
          
          <div style="background: #f0f0ff; padding: 15px; border-radius: 8px; border-left: 4px solid #7c4dff;">
            <p style="margin: 0;"><strong>Quick Action:</strong></p>
            <p style="margin: 5px 0;">
              <a href="mailto:${email}" style="background: #7c4dff; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none;">Reply to ${name}</a>
            </p>
          </div>
          
          <hr>
          <p style="color: #888; font-size: 12px;">This is an automated notification from your portfolio.</p>
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
      console.error('User Email Error:', userError);
      console.error('Admin Email Error:', adminError);
      
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