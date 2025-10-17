// routes/pdf.routes.js
import express from "express";
import { uploadPdf, getAllPdfs } from "../controllers/pdf.controller.js";
import upload from "../middleware/multer.js";


const router = express.Router();

// Hardcoded credentials
// const ADMIN_USERNAME = "admin123";
// const ADMIN_PASSWORD = "secret@123";

// Middleware for hardcoded login check
// const verifyAdmin = (req, res, next) => {
//   const { username, password } = req.headers;
//   if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
//     next();
//   } else {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }
// };

// Upload route (protected) with error handling
router.post(
  "/upload",
//   verifyAdmin,
  (req, res, next) => {
    upload.single("pdf")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Multer-specific errors
        return res.status(400).json({ success: false, message: err.message });
      } else if (err) {
        // Other errors
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  uploadPdf
);

// Get all PDFs (public)
router.get("/all", async (req, res, next) => {
  try {
    await getAllPdfs(req, res);
  } catch (err) {
    next(err);
  }
});

// Health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "PDF service is running",
    timestamp: new Date().toISOString(),
  });
});

// Global error handler for this router
router.use((err, req, res, next) => {
  console.error("🚨 Router Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

export default router;
