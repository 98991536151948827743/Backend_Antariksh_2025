import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 

import { connectToMongo } from './database/mongoConnection.js';
import authRouter from './route/auth.route.js';
import contactRouter from './route/contact.route.js';
import sendOtpToUser from './nodemailer/SendOTP.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(
  cors({
    origin: '*',      // Allow all origins
    credentials: true, // Note: credentials won't work with '*' origin
  })
);

app.use(express.json());
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Quotes API');
});

// Routers
app.use("/api/auth", authRouter); 
app.use("/api/services", contactRouter);      


// Connect to MongoDB and start server
connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api`);
  });
});

export default app;
