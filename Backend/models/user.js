import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter a password"]
  },
  role: {
    type: String,
    enum: ["admin",  "customer"],
    default: "customer"
  },
  activityStack: {
    type: [String], // stack structure
    default: []
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
