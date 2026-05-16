import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Check if admin exists
export const checkSetup = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ setupRequired: userCount === 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register (only if no users exist)
export const register = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return res.status(403).json({ message: "Setup already complete! Please login." });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Admin account created successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password!" });

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};