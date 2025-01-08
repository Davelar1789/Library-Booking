const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    const { groupName, members, groupLeader, email, meetingDate, tableNumber } = req.body;

    if (members.length < 4) return res.status(400).json({ message: 'Minimum 4 members required' });

    try {
        const booking = await Booking.create({
            groupName,
            members,
            groupLeader,
            email,
            meetingDate,
            tableNumber,
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
