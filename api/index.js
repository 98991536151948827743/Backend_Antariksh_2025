// api/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import serverless from "serverless-http";
import authRouter from "../route/auth.route.js";
import contactRouter from "../route/contact.route.js";
import { connectToMongo } from "../database/mongoConnection.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app', 'https://your-custom-domain.com'] 
    : true, 
  credentials: true 
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Basic root
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to Antariksh Backend!" });
});

// Routers
app.use("/api/auth", authRouter);
app.use("/api/services", contactRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running", timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Something went wrong", error: err?.message || err });
});

/**
 * MongoDB Connection for Vercel
 * Connect to MongoDB and cache the connection for serverless reuse
 */
let mongoConnected = false;

const connectMongoIfNeeded = async () => {
  if (!mongoConnected) {
    try {
      await connectToMongo();
      mongoConnected = true;
      console.log("✅ MongoDB connected successfully");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error);
      // Don't throw error to prevent function from failing
    }
  }
};

// Connect to MongoDB on cold start
connectMongoIfNeeded();

// Export serverless handler for Vercel
const handler = serverless(app, {
  binary: ['image/*', 'application/pdf']
});

export default handler;
