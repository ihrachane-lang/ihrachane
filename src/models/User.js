import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "super_admin"],
    default: "user",
  },
  agreeToTerms: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpire: String,
  resetToken: String,
  resetTokenExpire: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
