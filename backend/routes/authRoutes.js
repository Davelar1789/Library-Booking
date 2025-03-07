const express = require("express");
const { signup, login } = require("../controllers/authController");
const { sendVerificationCode, verifyCode } = require("../controllers/verifyController");
const verifyToken = require("../middleware/authMiddleware"); // Import middleware
const User = require("../models/User");

const router = express.Router();

// Route to get current user information
router.get("/user-info", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Use the user ID to fetch user details
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-code", verifyCode);

module.exports = router;
