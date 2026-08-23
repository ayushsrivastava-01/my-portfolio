import { portfolioKnowledge } from "./portfolioKnowledge.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // =========================================================
    // 1. ASK GEMINI TO GENERATE A RELEVANT RESPONSE
    // =========================================================

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
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
                  text: `Visitor name: ${cleanName}

Visitor email: ${cleanEmail}

Visitor's message:
${cleanMessage}

Write a concise, friendly and professional email response to this visitor based ONLY on the provided knowledge.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    const geminiData = await geminiResponse.json();

    let aiReply = "";

    if (geminiResponse.ok) {
      aiReply =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    } else {
      console.error("Gemini Error:", geminiData);
    }

    // =========================================================
    // 2. FALLBACK IF GEMINI FAILS
    // =========================================================

    if (!aiReply) {
      aiReply = `Hi ${cleanName},

Thank you for reaching out to Ayush through his portfolio.

I've received your message and Ayush will get back to you soon.

Regards,
Ayush Srivastava`;
    }

    // =========================================================
    // 3. BREVO FUNCTION
    // =========================================================

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

    // =========================================================
    // 4. SEND AI RESPONSE TO VISITOR
    // =========================================================

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

      subject: `Thanks for reaching out, ${cleanName}`,

      htmlContent: `
        <!DOCTYPE html>
        <html>
        <body style="
          margin:0;
          padding:40px 20px;
          background:#0a0a14;
          font-family:Arial,sans-serif;
          color:#e8e8f0;
        ">

          <div style="
            max-width:560px;
            margin:auto;
            background:#12121f;
            border-radius:16px;
            padding:35px;
          ">

            <h2 style="color:#ffffff;">
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

            <hr style="
              border:none;
              border-top:1px solid rgba(255,255,255,.08);
              margin:25px 0;
            ">

            <p style="color:#77778f;font-size:13px;">
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

    // =========================================================
    // 5. SEND NOTIFICATION TO AYUSH
    // =========================================================

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
        <body style="
          margin:0;
          padding:40px 20px;
          background:#0a0a14;
          font-family:Arial,sans-serif;
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
              <strong>Name:</strong> ${cleanName}
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
              border-left:3px solid #7c4dff;
              background:rgba(124,77,255,.05);
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
              border-left:3px solid #3ecf8e;
              background:rgba(62,207,142,.05);
            ">

              <strong>AI Generated Reply:</strong>

              <p style="
                color:#c8c8e0;
                line-height:1.7;
                white-space:pre-line;
              ">
                ${aiReply}
              </p>

            </div>

          </div>

        </body>
        </html>
      `,
    });

    // =========================================================
    // 6. CHECK EMAIL STATUS
    // =========================================================

    const userEmailOk = userEmailResponse.ok;
    const adminEmailOk = adminEmailResponse.ok;

    if (!userEmailOk || !adminEmailOk) {
      const userError = await userEmailResponse.text();
      const adminError = await adminEmailResponse.text();

      console.error("User Brevo Error:", userError);
      console.error("Admin Brevo Error:", adminError);

      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: "Email sending failed",
        }),
      };
    }

    // =========================================================
    // SUCCESS
    // =========================================================

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "AI response generated and emails sent successfully",
      }),
    };
  } catch (error) {
    console.error("Function Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
    };
  }
};