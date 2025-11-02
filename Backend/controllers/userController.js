import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword, role });
    const savedUser = await user.save();

    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Simulate stack push for login activity
    user.activityStack.push(`Logged in at ${new Date().toLocaleString()}`);
    if (user.activityStack.length > 5) user.activityStack.shift(); // maintain only last 5 actions
    await user.save();

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserActivity = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ recentActivity: user.activityStack });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};