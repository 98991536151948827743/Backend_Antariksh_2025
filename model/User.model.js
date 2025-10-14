import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      default: "Explorer",
      trim: true,
    },
    otp: {
      type: String,
      required: [true, "OTP is required"],
    },
    otpExpiresAt: {
      type: Date,
      required: [true, "OTP expiry time is required"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    lastOtpSent: {
      type: Date,
      default: null,
    },
    dailyCount: {
      type: Number,
      default: 0,
    },
    dailyCountDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// TTL index: automatically delete unverified users after OTP expiry
userSchema.index({ otpExpiresAt: 1 }, { expireAfterSeconds: 0 });

const ModelUser = mongoose.model("User", userSchema);
export default ModelUser;
