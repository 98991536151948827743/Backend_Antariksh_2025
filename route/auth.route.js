import { Router } from "express";
import {
  requestOtp as sendOTP,
  verifyOtp as verifyOTP,
  resendOtp,
} from "../controllers/authcontroller/auth.controller.js";

const router = Router();

// ---------------- AUTH ROUTES ---------------- //
router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOTP);

router.post("/resendOtp", resendOtp);


// ---------------- HEALTH CHECK ---------------- //
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ---------------- ERROR HANDLING ---------------- //
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message || err,
  });
});

export default router;
