// models/Pdf.model.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PdfSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A title is required"],
      trim: true,
      maxlength: [200, "Title too long"],
    },

    // Cloudinary URL to the uploaded pdf file (secure_url)
    url: {
      type: String,
      required: [true, "File URL is required"],
      trim: true,
    },

    // Cloudinary public_id (useful for deletion)
    public_id: {
      type: String,
      required: [true, "public_id is required"],
      trim: true,
    },

    // optional additional metadata
    originalName: {
      type: String,
      trim: true,
    },
    mimeType: {
      type: String,
      trim: true,
    },
    size: {
      type: Number, // bytes
      min: 0,
    },

    // Optional: who uploaded it (if later you add user collection)
    // uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },

    // a simple boolean to mark active/archived
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Index on title for text search (optional)
PdfSchema.index({ title: "text", originalName: "text" });

// safe JSON output: remove __v
PdfSchema.set("toJSON", {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Pdf = model("Pdf", PdfSchema);

export default Pdf;
