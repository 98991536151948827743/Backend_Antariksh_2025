import { transporter } from './nodemailerSetup.js';
import { generateOtpEmail } from './GenerateOTPMail.js';
import ModelUser from '../model/User.model.js';

const sendOtpToUser = async (email) => {
  try {
    const { otp, subject, html } = generateOtpEmail();
    const now = new Date();

    // Find existing OTP record
    let record = await ModelUser.findOne({ email });

    // If record exists, handle cooldown and daily count
    if (record) {
      // Cooldown: 1 min between requests
      if (record.lastOtpSent && now - record.lastOtpSent < 60 * 1000) {
        return { success: false, message: '⏳ Please wait a minute before requesting another OTP.' };
      }

      // Reset daily count if day has changed
      if (record.dailyCountDate?.toDateString() !== now.toDateString()) {
        record.dailyCount = 0;
        record.dailyCountDate = now;
      }

      // Daily limit: max 10 per day
      if (record.dailyCount >= 10) {
        return { success: false, message: '📛 You have reached the maximum OTP requests for today.' };
      }

      // Update existing record
      record.otp = otp;
      record.otpExpiresAt = new Date(now.getTime() + 10 * 60 * 1000);
      record.lastOtpSent = now;
      record.dailyCount += 1;
    } else {
      // Create new OTP record if it doesn't exist
      record = new ModelUser({
        email,
        otp,
        otpExpiresAt: new Date(now.getTime() + 10 * 60 * 1000),
        lastOtpSent: now,
        dailyCount: 1,
        dailyCountDate: now,
      });
    }

    // Save the OTP record
    await record.save();

    // Send OTP email
    const mailer = transporter();
    await mailer.sendMail({
      from: `"Antariksh" <${mailer.options.auth.user}>`,
      to: email,
      subject,
      html,
    });

    console.log(`📩 OTP sent to ${email} from ${mailer.options.auth.user}`);
    return { success: true, otp, expiresAt: record.expiresAt };
  } catch (err) {
    console.error('❌ OTP sending failed:', err);
    return { success: false, message: 'Failed to send OTP', error: err.message };
  }
};

export default sendOtpToUser;
