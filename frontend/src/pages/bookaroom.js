import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/BookaRoom.modules.css"; // Import CSS
import Sidebar from "../components/Sidebar"; // Import the Sidebar component

const BookARoom = () => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([""]); // Array for multiple members
  const [groupLeader, setGroupLeader] = useState("");
  const [email, setEmail] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get("/api/auth/user-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setUser(response.data.data);
        setGroupLeader(response.data.data.name); // Autofill leader's name
        setEmail(response.data.data.email); // Autofill leader's email
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!groupName || members.length === 0 || !groupLeader || !email || !meetingDate || !tableNumber) {
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
        "/api/bookings/book-room",
        { groupName, members, groupLeader, email, meetingDate, tableNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessage("Room booked successfully!");
        setGroupName("");
        setMembers([""]);
        setMeetingDate("");
        setTableNumber("");
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

  // Add more member input fields
  const addMemberField = () => {
    setMembers([...members, ""]);
  };

  // Update member names
  const updateMember = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  return (
    <div className="book-room-page">
      <Sidebar user={user} onLogout={handleLogout} />

      <div className="book-room-container">
        <h2>Book a Room</h2>
        <form onSubmit={handleBooking} className="form">

          <label>Group Name:</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="input"
          />

          <label>Group Leader:</label>
          <input type="text" value={groupLeader} readOnly className="input" />

          <label>Email:</label>
          <input type="email" value={email} readOnly className="input" />

          <label>Members:</label>
          {members.map((member, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Member ${index + 1}`}
              value={member}
              onChange={(e) => updateMember(index, e.target.value)}
              className="input"
            />
          ))}
          <button type="button" onClick={addMemberField} className="button">
            Add Member
          </button>

          <label>Meeting Date:</label>
          <input
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            className="input"
          />

          <label>Table Number (1 or 2):</label>
          <select
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="select"
          >
            <option value="">-- Choose a Table --</option>
            <option value="1">Table 1</option>
            <option value="2">Table 2</option>
          </select>

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default BookARoom;
