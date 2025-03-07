const Booking = require("../models/Booking");

// Book a room
const bookRoom = async (req, res) => {
  try {
    const { groupName, members, groupLeader, email, meetingDate, tableNumber } = req.body;

    if (!groupName || !members || !groupLeader || !email || !meetingDate || !tableNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBooking = new Booking({
      groupName,
      members,
      groupLeader,
      email,
      meetingDate,
      tableNumber,
      status: "Pending",
    });

    await newBooking.save();
    res.status(201).json({ success: true, message: "Booking request submitted!", booking: newBooking });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { bookRoom, getBookings };
