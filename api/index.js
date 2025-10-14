import serverless from 'serverless-http';
import app from '../server.js'; // Your main Express app
import { connectToMongo } from '../database/mongoConnection.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectToMongo(); // Only connect to MongoDB once per cold start
    isConnected = true;
  }

  const handler = serverless(app);
  return handler(req, res);
}
