const sgMail = require("@sendgrid/mail");

// Set SendGrid API key from Netlify environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing fields" }),
      };
    }

    // ✅ AUTO-REPLY TO USER
    const autoReply = {
      to: email,
      from: "srivastava999ayush@gmail.com", // ⚠️ VERIFIED sender in SendGrid
      subject: "Thanks for contacting me – Message received",
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thanks for reaching out! 🙌</p>
        <p>I’ve received your message and will get back to you very soon.</p>
        <br/>
        <p><strong>Your message:</strong></p>
        <blockquote>${message}</blockquote>
        <br/>
        <p>Regards,<br/>Ayush Srivastava</p>
      `,
    };

    // ✅ NOTIFICATION EMAIL TO YOU
    const notifyMe = {
      to: "srivastava999ayush@gmail.com",
      from: "srivastava999ayush@gmail.com", // VERIFIED sender
      subject: "📩 New message from portfolio",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send emails sequentially
    await sgMail.send(autoReply);
    await sgMail.send(notifyMe);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("SendGrid Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email sending failed" }),
    };
  }
};
