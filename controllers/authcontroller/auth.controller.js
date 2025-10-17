import ModelUser from '../../model/User.model.js';
import sendOtpToUser from "../../nodemailer/sendOTP.js";
import sendConfirmationEmail from "../../nodemailer/sendConfirmation.js";

export const requestOtp = async (req, res) => {
  const { email  } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: " Email is required." });
  }
  //check if user exists
  const existingUser = await ModelUser.findOne({ email });
  if (existingUser && existingUser.verified) {
    return res.status(400).json({ success: false, message: " Email is already verified." });
  }

  if (existingUser && !existingUser.verified) {
    const response = await sendOtpToUser(email);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(429).json(response);
    }
  }

  // If user doesn't exist, create a new user and send OTP
  try {
    const response = await sendOtpToUser(email);
    //send email in cookie to client
    res.cookie("email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 10 * 60 * 1000, // 10 minutes
    });

    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(429).json(response); // Too many requests
    }
  } catch (error) {
    console.error(" Error in requestOtp:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}

export const verifyOtp = async (req, res) => {
  const { email } = req.cookies;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email cookie is missing." });
  }
  const { otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required." });
  }

  try {
    const user = await ModelUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "No OTP request found for this email." });
    }
    if (user.verified) {
      return res.status(400).json({ success: false, message: " Email is already verified." });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }
    if (new Date() > user.expiresAt) {
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    user.verified = true;
    await user.save();

    // Send confirmation email
    await sendConfirmationEmail(email, user.name);
    res.clearCookie("email");

    return res.status(200).json({ success: true, message: "✅ Email verified successfully." });
  } catch (error) {
    console.error(" Error in verifyOtp:", error);
    return res.status(500).json({ success: false, message: " Internal server error." });
  }
}

export const resendOtp = async (req, res) => {
  const { email } = req.cookies;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
    const user = await ModelUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: " No OTP request found for this email." });
    }
    if (user.verified) {
      return res.status(400).json({ success: false, message: "Email is already verified." });
    }

    const response = await sendOtpToUser(email);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(429).json(response);
    }
  } catch (error) {
    console.error("Error in resendOtp:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}