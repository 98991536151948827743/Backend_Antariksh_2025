// api/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRouter from "../route/auth.route.js";
import contactRouter from "../route/contact.route.js";
import { connectToMongo } from "../database/mongoConnection.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true })); // set origin true or a specific domain in prod
app.use(express.json());
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
 * NOTE about Mongo: Do NOT call connectToMongo() and then immediately export the handler
 * without ensuring connectToMongo returns quickly. We'll call connectToMongo() below
 * and allow it to cache the connection. serverless-http will reuse warm containers.
 */
connectToMongo()
  .then(() => console.log("✅ MongoDB connection (attempted)"))
  .catch((err) => console.error("MongoDB connection error (initial):", err));

// Export serverless handler for Vercel
// const handler = serverless(app);
// export default handler;

export default app;