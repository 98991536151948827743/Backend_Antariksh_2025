
const generateContactThankYouEmail = (name = "Explorer") => {
  const subject = "📩 Thanks for Contacting Antariksh!";

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 650px; margin:auto; padding:30px; background:#0b0c1b; color:#ffffff; border-radius:14px;">
      
      <!-- Header -->
      <h2 style="text-align:center; font-size:28px; margin-bottom:15px; color:#00e0ff;">
        🙏 Thanks for Reaching Out, ${name}!
      </h2>
      
      <!-- Greeting -->
      <p style="font-size:16px; color:#cfd8dc; margin-bottom:20px;">
        Hello <strong>${name}</strong>,<br/>
        We’ve received your message and our team will get back to you as soon as possible.
      </p>


<!-- CTA Box -->
<div style="text-align:center; margin:30px 0;">
  <a href="https://www.antariskhnitkkr.live/" target="_blank" style="text-decoration:none;">
    <div style="
      display:inline-block;
      padding:18px 36px;
      background: linear-gradient(135deg, #00e0ff, #0072ff);
      color:#fff;
      font-size:18px;
      font-weight:bold;
      border-radius:12px;
      box-shadow:0 6px 20px rgba(0,0,0,0.6);
      transition: transform 0.2s ease;
    ">
      🌌 Explore More at Antariksh
    </div>
  </a>
</div>

      <!-- Footer -->
      <p style="margin-top:30px; font-size:12px; color:#607d8b; text-align:center;">
        © 2025 Antariksh. All rights reserved.
      </p>
    </div>
  `;

  return { subject, html };
};

export default generateContactThankYouEmail;