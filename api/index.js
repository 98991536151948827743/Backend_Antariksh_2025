import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import serverless from 'serverless-http';

import { connectToMongo } from '../database/mongoConnection.js';
import authRouter from '../route/auth.route.js';
import contactRouter from '../route/contact.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: '*', // Allow all origins
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Quotes API',
    timestamp: new Date().toISOString(),
  });
});

// Routers
app.use('/api/auth', authRouter);
app.use('/api/services', contactRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err.stack || err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message || err,
  });
});

// Connect to MongoDB before handling requests
connectToMongo()
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

// Export for Vercel serverless function
export default serverless(app);
