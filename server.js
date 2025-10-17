import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 

import { connectToMongo } from './database/mongoConnection.js';
import authRouter from './route/auth.route.js';
import contactRouter from './route/contact.route.js';
// import pdfRouter from './route/pdf.route.js';

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
// app.use("/api/pdf", pdfRouter); 

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message || err,
  });
});


// Connect to MongoDB and start server
// connectToMongo().then(() => {
//   app.listen(PORT, () => {
//     console.log(`✅ Server running on http://localhost:${PORT}`);
//     console.log(`Health check: http://localhost:${PORT}/api`);
//   });
// });

connectToMongo()

export default app;
