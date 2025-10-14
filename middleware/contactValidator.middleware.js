import { body, validationResult } from "express-validator";

// Allowed issues
const allowedIssues = ['general','feedback','other'];

// Middleware array
export const validateContact = [
  // ---------- Basic fields ----------
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name too long'),

body('email')
  .isEmail().withMessage('Invalid email format')
  .custom((value) => {
    if (!value.includes('.')) {
      throw new Error('Email must contain a valid domain');
    }
    return true;
  }),

  body('phone')
    .optional()
    .trim()
    .isMobilePhone().withMessage('Invalid phone number'),

  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ max: 150 }).withMessage('Subject too long'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 2000 }).withMessage('Message too long'),

  body('issue')
    .optional()
    .isIn(allowedIssues).withMessage('Invalid issue type'),

  

  // ---------- Custom validation result ----------
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Sanitized object for controller
    req.sanitizedBody = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
      issue: req.body.issue || 'general',
      deviceInfo: req.body.deviceInfo || {}
    };

    next();
  }
];
