import { portfolioKnowledge } from "./portfolioKnowledge.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        error: "Method Not Allowed",
      }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Name, email and message are required.",
        }),
      };
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // 🔥 SIRF FIRST NAME EXTRACT
    const firstName = cleanName.split(' ')[0];

    // ---------------------------------------------------------
    // GEMINI - ✅ CORRECT MODEL
    // ---------------------------------------------------------

    // Available models: gemini-2.0-flash-exp, gemini-1.5-flash, gemini-pro
    const model = "gemini-2.0-flash-exp"; // ✅ Latest working model

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: portfolioKnowledge,
              },
            ],
          },

          contents: [
            {
              role: "user",

              parts: [
                {
                  text: `
A visitor has contacted Ayush through his portfolio.

Visitor name:
${cleanName}

Visitor's question/message:
${cleanMessage}

IMPORTANT:
Answer the visitor's actual question directly.

Do not simply acknowledge the message.

Do not say "I received your message".

Do not say "Ayush will get back to you".

Use the portfolio knowledge provided in the system instructions.

If the question is about Ayush's skills, technologies, projects or Spring Boot experience, answer specifically using that information.

If the information is not available in the knowledge base, honestly say that the information is not available and suggest contacting Ayush directly through his portfolio.

Keep the response concise, natural, friendly and professional.

Return ONLY the email reply text.
                  `,
                },
              ],
            },
          ],

          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    const geminiData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error(
        "❌ GEMINI API ERROR:",
        JSON.stringify(geminiData, null, 2)
      );

      return {
        statusCode: 502,
        body: JSON.stringify({
          success: false,
          error: "AI response generation failed.",
          details:
            geminiData?.error?.message || "Unknown Gemini API error",
        }),
      };
    }

    const aiReply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!aiReply) {
      console.error(
        "❌ GEMINI RETURNED NO TEXT:",
        JSON.stringify(geminiData, null, 2)
      );

      return {
        statusCode: 502,
        body: JSON.stringify({
          success: false,
          error: "Gemini returned an empty response.",
        }),
      };
    }

    console.log("✅ AI REPLY GENERATED:");
    console.log(aiReply);

    // ---------------------------------------------------------
    // BREVO HELPER
    // ---------------------------------------------------------

    const sendBrevoEmail = async (payload) => {
      return fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },

        body: JSON.stringify(payload),
      });
    };

    // ---------------------------------------------------------
    // 1. SEND AI-GENERATED REPLY TO VISITOR
    // ---------------------------------------------------------

    const userEmailResponse = await sendBrevoEmail({
      sender: {
        name: "Ayush Srivastava",
        email: "srivastava999ayush@gmail.com",
      },

      to: [
        {
          email: cleanEmail,
          name: firstName,
        },
      ],

      subject: `Thanks for reaching out, ${firstName}`,

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
              padding: 35px 40px;
              border: 2px solid rgba(124, 77, 255, 0.12);
              box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            }
            .header-center {
              text-align: center;
              margin-bottom: 22px;
            }
            .header-center h1 {
              color: #ffffff;
              font-size: 22px;
              font-weight: 700;
              letter-spacing: -0.5px;
            }
            .header-center .sub {
              color: rgba(255,255,255,0.3);
              font-size: 13px;
              margin-top: 4px;
            }
            .greeting {
              color: #e8e8f0;
              font-size: 15px;
              font-weight: 500;
              margin-bottom: 10px;
              text-align: left;
            }
            .greeting span {
              color: #9b7ff4;
            }
            .query-box {
              background: rgba(255, 74, 87, 0.04);
              border-left: 3px solid #ff4a57;
              padding: 12px 16px;
              margin: 10px 0 14px;
              border-radius: 0 8px 8px 0;
              text-align: left;
            }
            .query-label {
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: #ff4a57;
              font-weight: 600;
              display: block;
              margin-bottom: 4px;
            }
            .query-box p {
              color: #c8c8e0;
              font-size: 13px;
              line-height: 1.6;
              margin: 0;
              font-style: italic;
            }
            .reply-box {
              background: rgba(124, 77, 255, 0.04);
              border-left: 3px solid #7c4dff;
              padding: 12px 16px;
              margin: 10px 0 18px;
              border-radius: 0 8px 8px 0;
              text-align: left;
            }
            .reply-label {
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: #7c4dff;
              font-weight: 600;
              display: block;
              margin-bottom: 4px;
            }
            .reply-box p {
              color: #c8c8e0;
              font-size: 13px;
              line-height: 1.6;
              margin: 0;
            }
            .divider {
              height: 1px;
              background: rgba(255,255,255,0.04);
              margin: 18px 0;
            }
            .footer {
              margin-top: 18px;
              padding-top: 12px;
              border-top: 2px solid rgba(124, 77, 255, 0.08);
              text-align: left;
            }
            .footer-regards {
              color: #8a8aaa;
              font-size: 13px;
              margin-bottom: 2px;
            }
            .footer-name {
              color: #e8e8f0;
              font-size: 15px;
              font-weight: 700;
            }
            .footer-disclaimer {
              margin-top: 12px;
              padding-top: 10px;
              border-top: 1px solid rgba(255,255,255,0.04);
              text-align: center;
              font-size: 11px;
              color: #55556a;
              line-height: 1.5;
            }
            @media (max-width: 480px) {
              .container { padding: 24px 20px; }
              .header-center h1 { font-size: 20px; }
              .header-center .sub { font-size: 12px; }
              .greeting { font-size: 14px; }
              .query-box p, .reply-box p { font-size: 12px; }
              .footer-regards { font-size: 12px; }
              .footer-name { font-size: 14px; }
              .footer-disclaimer { font-size: 10px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header-center">
              <h1>~ Message Received ~</h1>
              <div class="sub">Here's my response to your query</div>
            </div>
            
            <div class="greeting">Hi <span>${firstName}</span>,</div>
            
            <div class="query-box">
              <span class="query-label">📝 Your Query</span>
              <p>${cleanMessage}</p>
            </div>
            
            <div class="reply-box">
              <span class="reply-label">💬 My Response</span>
              <p>${aiReply}</p>
            </div>
            
            <div class="divider"></div>
            
            <div class="footer">
              <div class="footer-regards">Regards,</div>
              <div class="footer-name">Ayush Srivastava</div>
              
              <div class="footer-disclaimer">
                ◉ This is an automated reply generated by AI.<br>
                If you have any further questions, feel free to reply to this email.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,

      replyTo: {
        name: "Ayush Srivastava",
        email: "srivastava999ayush@gmail.com",
      },
    });

    // ---------------------------------------------------------
    // 2. SEND NOTIFICATION ONLY TO AYUSH
    // ---------------------------------------------------------

    const adminEmailResponse = await sendBrevoEmail({
      sender: {
        name: "Portfolio Contact Form",
        email: "srivastava999ayush@gmail.com",
      },

      to: [
        {
          email: "srivastava999ayush@gmail.com",
          name: "Ayush",
        },
      ],

      subject: `🔔 New Portfolio Message from ${cleanName}`,

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
              padding: 35px 40px;
              border: 2px solid rgba(255, 74, 87, 0.15);
              box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            }
            .header-center {
              text-align: center;
              margin-bottom: 24px;
              padding-bottom: 16px;
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
              font-size: 22px;
              font-weight: 700;
            }
            .detail-box {
              background: rgba(255,255,255,0.02);
              border: 1px solid rgba(255,255,255,0.04);
              border-radius: 10px;
              padding: 12px 16px;
              margin: 10px 0;
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
              padding: 12px 16px;
              margin: 12px 0 16px;
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
            .ai-box {
              background: rgba(124, 77, 255, 0.04);
              border-left: 3px solid #7c4dff;
              padding: 12px 16px;
              margin: 12px 0 16px;
              border-radius: 0 8px 8px 0;
              text-align: left;
            }
            .ai-label {
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: #7c4dff;
              font-weight: 600;
              display: block;
              margin-bottom: 4px;
            }
            .ai-box p {
              color: #c8c8e0;
              font-size: 14px;
              line-height: 1.6;
              margin: 0;
            }
            .divider {
              height: 1px;
              background: rgba(255,255,255,0.04);
              margin: 16px 0;
            }
            .action-box {
              background: rgba(124,77,255,0.06);
              border: 1px solid rgba(124,77,255,0.1);
              border-radius: 10px;
              padding: 14px 18px;
              text-align: center;
              margin: 12px 0 4px;
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
              margin-top: 20px;
              padding-top: 16px;
              border-top: 2px solid rgba(255, 74, 87, 0.08);
              text-align: center;
              color: #55556a;
              font-size: 13px;
            }
            .footer strong {
              color: #e8e8f0;
            }
            @media (max-width: 480px) {
              .container { padding: 20px; }
              .header-center h1 { font-size: 18px; }
              .action-btn { padding: 8px 18px; font-size: 13px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header-center">
              <span class="badge">🔔 New Submission</span>
              <h1>Someone Just Reached Out!</h1>
            </div>
            
            <div class="detail-box">
              <span class="detail-label">👤 Name</span>
              <div class="detail-value">${cleanName}</div>
            </div>
            
            <div class="detail-box">
              <span class="detail-label">📧 Email</span>
              <div class="detail-value">
                <a href="mailto:${cleanEmail}">${cleanEmail}</a>
              </div>
            </div>
            
            <div class="message-box">
              <span class="message-label">💬 Visitor Message</span>
              <p>${cleanMessage}</p>
            </div>
            
            <div class="ai-box">
              <span class="ai-label">🤖 AI Reply Sent</span>
              <p>${aiReply}</p>
            </div>
            
            <div class="divider"></div>
            
            <div class="action-box">
              <a href="mailto:${cleanEmail}" class="action-btn">✉️ Reply to ${cleanName}</a>
            </div>
            
            <div class="footer">
              <div>This is an automated notification from your portfolio.</div>
              <div style="margin-top:4px; color:#3a3a5a; font-size:12px;">
                📬 Sent from <strong>ayushsri.netlify.app</strong>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (!userEmailResponse.ok) {
      const errorText = await userEmailResponse.text();
      console.error("❌ USER EMAIL FAILED:", errorText);
      return {
        statusCode: 502,
        body: JSON.stringify({
          success: false,
          error: "AI reply was generated but visitor email could not be sent.",
        }),
      };
    }

    if (!adminEmailResponse.ok) {
      const errorText = await adminEmailResponse.text();
      console.error("❌ ADMIN EMAIL FAILED:", errorText);
      return {
        statusCode: 502,
        body: JSON.stringify({
          success: false,
          error: "Visitor reply was sent but admin notification failed.",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "AI-generated reply sent successfully.",
      }),
    };
  } catch (error) {
    console.error("❌ FUNCTION ERROR:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Internal server error.",
      }),
    };
  }
};