import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/BookaRoom.modules.css"; // Import CSS

const BookARoom = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms");
        setRooms(response.data.rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedRoom || !date || !time) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "/api/book-room",
        { roomId: selectedRoom, date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessage("Room booked successfully!");
        setSelectedRoom("");
        setDate("");
        setTime("");
      } else {
        setMessage("Booking failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-room-container">
      <h2>Book a Room</h2>
      <form onSubmit={handleBooking} className="form">
        <label htmlFor="room">Select a Room:</label>
        <select
          id="room"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="select"
        >
          <option value="">-- Choose a Room --</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>

        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />

        <label htmlFor="time">Select Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input"
        />

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default BookARoom;
