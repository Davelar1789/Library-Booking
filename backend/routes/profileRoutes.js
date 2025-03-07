const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profile.controller");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Get profile
router.get("/profile", verifyToken, getProfile);

// Update profile (with optional profile picture upload)
router.put("/profile", verifyToken, upload.single("profilePicture"), updateProfile);

module.exports = router;
