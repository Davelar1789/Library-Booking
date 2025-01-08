const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    members: [{ type: String, required: true }], // Array of member names
    groupLeader: { type: String, required: true }, // Leader's name
    email: { type: String, required: true },
    meetingDate: { type: Date, required: true },
    tableNumber: { type: Number, required: true }, // Either 1 or 2
    status: { type: String, default: 'Pending' }, // 'Pending', 'Approved', 'Rejected'
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
