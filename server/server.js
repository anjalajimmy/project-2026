import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(process.env.PORT || 5000, () => {
      console.log("GREENZA backend running on port 5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

// Use your existing signup collection
const User = mongoose.model("User", userSchema, "signup");

// Temporary OTP storage
const otpStore = new Map();

// Send OTP
app.post("/api/auth/send-otp", (req, res) => {
  const { phone } = req.body;

  if (!/^\d{10}$/.test(phone || "")) {
    return res.status(400).json({
      message: "Invalid phone number."
    });
  }

  const otp = crypto.randomInt(100000, 1000000).toString();

  otpStore.set(phone, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  });

  // Development testing only
  console.log(`OTP for ${phone}: ${otp}`);

  res.json({
    message: "OTP generated successfully. Check backend terminal."
  });
});

// Signup API
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { username, password, email, phone, otp } = req.body;

    if (!username || !password || !email || !phone || !otp) {
      return res.status(400).json({
        message: "Please fill all fields."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters."
      });
    }

    // Verify OTP
    const savedOtp = otpStore.get(phone);

    if (!savedOtp || Date.now() > savedOtp.expiresAt) {
      return res.status(400).json({
        message: "OTP expired or not requested."
      });
    }

    if (savedOtp.otp !== otp) {
      return res.status(400).json({
        message: "Incorrect OTP."
      });
    }

    // Check existing account
    const existingUser = await User.findOne({
      $or: [
        { username },
        { email },
        { phone }
      ]
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Account already exists."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phone
    });

    await newUser.save();

    otpStore.delete(phone);

    res.status(201).json({
      message: "GREENZA account created successfully!"
    });

  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Signup failed."
    });
  }
});