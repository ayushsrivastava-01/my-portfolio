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

    // ---------------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------------

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

    // ---------------------------------------------------------
    // GEMINI - FIXED MODEL NAME
    // ---------------------------------------------------------

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
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

    // ---------------------------------------------------------
    // VERY IMPORTANT: DON'T SILENTLY FALLBACK
    // ---------------------------------------------------------

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
          name: cleanName,
        },
      ],

      subject: `Re: Your message to Ayush Srivastava`,

      htmlContent: `
        <!DOCTYPE html>

        <html>

        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

        <body style="
          margin:0;
          padding:40px 20px;
          background:#0a0a14;
          font-family:Arial, sans-serif;
          color:#e8e8f0;
        ">

          <div style="
            max-width:560px;
            margin:auto;
            background:#12121f;
            border-radius:16px;
            padding:35px;
          ">

            <h2 style="
              color:#ffffff;
              margin-top:0;
            ">
              Hi ${cleanName},
            </h2>

            <div style="
              color:#c8c8e0;
              font-size:15px;
              line-height:1.8;
              white-space:pre-line;
            ">
              ${aiReply}
            </div>

            <div style="
              height:1px;
              background:rgba(255,255,255,0.08);
              margin:25px 0;
            "></div>

            <p style="
              color:#77778f;
              font-size:13px;
              margin-bottom:0;
            ">
              Regards,<br>
              <strong style="color:#e8e8f0;">
                Ayush Srivastava
              </strong>
            </p>

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
        </head>

        <body style="
          margin:0;
          padding:40px 20px;
          background:#0a0a14;
          font-family:Arial, sans-serif;
        ">

          <div style="
            max-width:560px;
            margin:auto;
            background:#12121f;
            border-radius:16px;
            padding:35px;
            color:#e8e8f0;
          ">

            <h2 style="color:#ffffff;">
              🔔 New Portfolio Message
            </h2>

            <p>
              <strong>Name:</strong>
              ${cleanName}
            </p>

            <p>
              <strong>Email:</strong>
              <a
                href="mailto:${cleanEmail}"
                style="color:#9b7ff4;"
              >
                ${cleanEmail}
              </a>
            </p>

            <div style="
              margin-top:20px;
              padding:18px;
              border-left:3px solid #ff4a57;
              background:rgba(255,74,87,0.05);
            ">

              <strong>Visitor Message:</strong>

              <p style="
                color:#c8c8e0;
                line-height:1.7;
                white-space:pre-line;
              ">
                ${cleanMessage}
              </p>

            </div>

            <div style="
              margin-top:20px;
              padding:18px;
              border-left:3px solid #7c4dff;
              background:rgba(124,77,255,0.05);
            ">

              <strong>AI Reply Sent to Visitor:</strong>

              <p style="
                color:#c8c8e0;
                line-height:1.7;
                white-space:pre-line;
              ">
                ${aiReply}
              </p>

            </div>

            <div style="
              margin-top:25px;
              text-align:center;
            ">

              <a
                href="mailto:${cleanEmail}"
                style="
                  display:inline-block;
                  background:#7c4dff;
                  color:white;
                  padding:11px 25px;
                  border-radius:8px;
                  text-decoration:none;
                  font-weight:600;
                "
              >
                Reply to ${cleanName}
              </a>

            </div>

          </div>

        </body>

        </html>
      `,
    });

    // ---------------------------------------------------------
    // CHECK BREVO RESPONSES
    // ---------------------------------------------------------

    if (!userEmailResponse.ok) {
      const errorText = await userEmailResponse.text();

      console.error("❌ USER EMAIL FAILED:");
      console.error(errorText);

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

      console.error("❌ ADMIN EMAIL FAILED:");
      console.error(errorText);

      return {
        statusCode: 502,
        body: JSON.stringify({
          success: false,
          error: "Visitor reply was sent but admin notification failed.",
        }),
      };
    }

    // ---------------------------------------------------------
    // SUCCESS
    // ---------------------------------------------------------

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