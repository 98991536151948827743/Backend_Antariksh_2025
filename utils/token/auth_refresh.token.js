import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const generate_Auth_Tokens = (
  payload,
  accessExpiry = "15d",
  refreshExpiry = "30d"

) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "supersecretfallbackkey";
    
    // 🧩 Validate payload
    if (!payload || typeof payload !== "object") {
      return { success: false, error: "Payload must be a valid object" };
    }

    // ✅ Generate tokens
    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: accessExpiry,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: refreshExpiry,
    });

    return { success: true, authToken, refreshToken };
  } catch (error) {
    console.error("❌ Token generation failed:", error.message);
    return { success: false, error: "Token generation failed" };
  }
};
