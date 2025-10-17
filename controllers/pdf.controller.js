// controllers/pdf.controller.js
import Pdf from "../model/Pdf.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ===================== UPLOAD PDF =====================
export const uploadPdf = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required." });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    // Upload to Cloudinary (store in 'pdf_uploads' folder)
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", 
      folder: "pdf_uploads",
    });

    // Create new document in MongoDB
    const newPdf = await Pdf.create({
      title,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });

    // Remove local file after upload
    fs.unlinkSync(req.file.path);

    return res.status(201).json({
      success: true,
      message: "PDF uploaded successfully",
      data: newPdf,
    });
  } catch (error) {
    console.error("❌ Error uploading PDF:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ===================== GET ALL PDFs =====================
export const getAllPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({ active: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: pdfs });
  } catch (error) {
    console.error("❌ Error fetching PDFs:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
