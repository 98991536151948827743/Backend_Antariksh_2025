import crypto from 'crypto';

const generateOtpEmail = (name = "Explorer") => {
  const otp = crypto.randomInt(100000, 999999).toString();

  const subject = '🔐 Your Antariksh OTP – Verify Your Account';

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 25px; border-radius: 12px; background: #0b0c1b; color: #ffffff;">
      
      <h2 style="color: #00e0ff; text-align: center; font-size: 28px; margin-bottom: 15px;">
        🌌 Welcome to Antariksh! 🌌
      </h2>
      
      <p style="font-size: 16px; color: #cfd8dc; margin-bottom: 15px;">
        Hello <strong>${name}</strong>,<br/>
        Thank you for joining our community of space enthusiasts!
      </p>
      
      <p style="font-size: 16px; color: #cfd8dc; margin-bottom: 25px;">
        To complete your signup and secure your account, please use the One-Time Password (OTP) below:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <h1 style="
          color: #ffffff; 
          background: linear-gradient(135deg, #00e0ff, #0072ff); 
          display: inline-block; 
          padding: 20px 45px; 
          border-radius: 12px; 
          letter-spacing: 4px; 
          font-weight: bold; 
          font-size: 32px; 
          text-align: center; 
          box-shadow: 0 6px 20px rgba(0,0,0,0.6);
        ">
          ${otp}
        </h1>
      </div>

      <p style="font-size: 14px; color: #b0bec5; text-align: center;">
        Enter this OTP in the verification page to activate your account. <br/>
        It is valid for the next 10 minutes.
      </p>

      <hr style="margin: 25px 0; border: none; border-top: 1px dashed #37474f;">

      <p style="font-size: 13px; color: #90a4ae; text-align: center; line-height: 1.5;">
        💡 Security Tip: Never share your OTP with anyone. Antariksh team will never ask for it via email, calls, or messages.
      </p>

      <div style="margin-top: 25px; text-align: center; font-size: 13px; color: #b0bec5;">
        <p>
          Have suggestions? 👉 
          <a href="https://yourwebsite.com/feedback" target="_blank" style="color: #00e0ff; text-decoration: none;">
            Give Feedback
          </a>
        </p>
        <p>
          Facing issues? 👉 
          <a href="https://yourwebsite.com/support" target="_blank" style="color: #ff5252; text-decoration: none;">
            Contact Support
          </a>
        </p>
      </div>

      <p style="margin-top: 25px; font-size: 12px; color: #607d8b; text-align: center;">
        © 2025 Antariksh. All rights reserved.
      </p>

    </div>
  `;

  return { otp, subject, html };
};

export default generateOtpEmail;