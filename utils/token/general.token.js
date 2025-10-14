import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretfallbackkey";

export const generateToken = (payload, expiresIn = "1h") => {
  try {
    if (!payload || typeof payload !== "object") {
      return { success: false, error: "Payload must be an object" };
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
    return { success: true, token };
  } catch (error) {
    console.error("Token generation failed:", error.message);
    return { success: false, error: "Failed to generate token" };
  }
};

export const verifyToken = (token) => {
  try {
    if (!token) {
      return { success: false, error: "Token is required" };
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return { success: true, decoded };
  } catch (error) {
    console.error("Token verification failed:", error.message);

    if (error.name === "TokenExpiredError") {
      return { success: false, error: "Token expired" };
    } else if (error.name === "JsonWebTokenError") {
      return { success: false, error: "Invalid token" };
    } else {
      return { success: false, error: "Token verification error" };
    }
  }
};
