
export const generateConfirmationEmail = (name = "Explorer") => {
  const subject = "🎉 Subscription Confirmed – Welcome to Antariksh!";

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 650px; margin:auto; padding:30px; background:#0b0c1b; color:#ffffff; border-radius:14px;">
      
      <!-- Header -->
      <h2 style="text-align:center; font-size:30px; margin-bottom:15px; color:#00e0ff;">
        🌌 Welcome to the Antariksh Family! 🌌
      </h2>
      
      <!-- Greeting -->
      <p style="font-size:16px; color:#cfd8dc; margin-bottom:20px;">
        Hello <strong>${name}</strong>,<br/>
        We are thrilled to have you on board! Your email has been successfully verified.
      </p>

      <!-- Main Message -->
      <p style="font-size:16px; color:#cfd8dc; margin-bottom:25px;">
        As a member of the Antariksh newsletter, you will now receive the latest updates on space explorations, upcoming observation sessions, quizzes, and insights from our Web & Tech team.
      </p>

      <!-- CTA Box -->
      <div style="text-align:center; margin:30px 0;">
        <div style="
          display:inline-block;
          padding:22px 40px;
          background: linear-gradient(135deg, #00e0ff, #0072ff);
          color:#fff;
          font-size:20px;
          font-weight:bold;
          border-radius:12px;
          box-shadow:0 8px 24px rgba(0,0,0,0.6);
        ">
          🚀 Explore the Cosmos with Us!
        </div>
      </div>

      <!-- Engagement Section -->
      <p style="font-size:14px; color:#b0bec5; text-align:center; line-height:1.5;">
        Stay tuned for exclusive updates, exciting events, and curated content from our dedicated team. We promise to make your journey into the cosmos enlightening and fun!
      </p>

      <!-- Optional Links -->
      <div style="margin-top:25px; text-align:center; font-size:13px; color:#b0bec5;">
        <p>
          Share your feedback 👉 
          <a href="https://yourwebsite.com/feedback" target="_blank" style="color:#00e0ff; text-decoration:none;">Give Feedback</a>
        </p>
        <p>
          Need help? 👉 
          <a href="https://yourwebsite.com/support" target="_blank" style="color:#ff5252; text-decoration:none;">Contact Support</a>
        </p>
      </div>

      <!-- Footer -->
      <p style="margin-top:30px; font-size:12px; color:#607d8b; text-align:center;">
        © 2025 Antariksh. All rights reserved.
      </p>
    </div>
  `;

  return { subject, html };
};
