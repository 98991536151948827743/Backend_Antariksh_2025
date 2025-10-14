import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  issue: { type: String, enum: ['technical','billing','general','support','feedback','other'], default:'general' },
  deviceInfo: Object, // store full frontend info
  locationInfo: Object, // store IP + precise location
  requestInfo: Object, // headers + metadata
  status: { type: String, enum: ['new','in-progress','resolved','closed'], default:'new' },
  submittedAt: { type: Date, default: Date.now },
  respondedAt: Date
}, { timestamps:true });

contactSchema.index({ email:1 });
contactSchema.index({ status:1 });
contactSchema.index({ submittedAt:-1 });
contactSchema.index({ email: 1, "requestInfo.ip": 1, createdAt: -1 });


export default mongoose.model("Contact", contactSchema);
