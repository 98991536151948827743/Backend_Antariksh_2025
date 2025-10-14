import { Router } from "express";
import { submitContact } from "../controllers/authcontroller/contact.controller.js";
import { validateContact } from "../middleware/contactValidator.middleware.js";
import { strictEmailValidator} from "../middleware/email.validator.middleware.js";

const router = Router();

// ---------------- CONTACT ROUTES ---------------- //
router.post("/contact",validateContact,strictEmailValidator, submitContact);

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