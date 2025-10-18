import multer from "multer";

// Use memory storage for serverless deployment
// Files will be processed in memory and uploaded to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit for serverless
    files: 1 // Only allow 1 file at a time
  },
});

export default upload;
