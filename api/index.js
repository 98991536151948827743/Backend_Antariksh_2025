import serverless from 'serverless-http';
import app from '../app.js';
import { connectToMongo } from '../database/mongoConnection.js';

let isConnected = false;

export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectToMongo();
      isConnected = true;
    }
    const fn = serverless(app);
    return fn(req, res);
  } catch (err) {
    console.error("Error in serverless handler:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
