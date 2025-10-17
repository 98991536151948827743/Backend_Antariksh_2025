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
    origin: '*',      
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.send('Welcome to the Quotes API'));
app.get('/api/health', (req, res) => res.json({ success: true, timestamp: new Date().toISOString() }));
app.use('/api/auth', authRouter);
app.use('/api/services', contactRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Something went wrong!' });
});

// Connect to Mongo
await connectToMongo(); // top-level await works in Node 18+ on Vercel

export default serverless(app);
