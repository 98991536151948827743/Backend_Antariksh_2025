import mongoose from "mongoose";
import { DB_NAME } from "./Constants.js";

let dbConnection = null;

export const connectToMongo = async () => {
  try {
    // Already connected?
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return;
    }

    const uri = `${process.env.MONGO_URI}/${DB_NAME}`;
    console.log("Connecting to MongoDB...");

    // Options for serverless
    const options = {
      maxPoolSize: 1, // Keep a single connection for serverless
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false, // keep this, it's allowed
    };

    dbConnection = await mongoose.connect(uri, options);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
