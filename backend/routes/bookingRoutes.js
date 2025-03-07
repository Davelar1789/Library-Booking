const express = require("express");
const { bookRoom, getBookings } = require("../controllers/bookingController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book-room", protect, bookRoom); // Booking a room
router.get("/bookings", protect, getBookings); // Fetch all bookings

module.exports = router;
