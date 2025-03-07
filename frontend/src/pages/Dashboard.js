import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
import "../styles/Dashboard.modules.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get(
          "/api/auth/user-info",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("User Info Response:", response.data);
        setUser(response.data.data);
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUserInfo();
  }, [navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      const dummyBookings = [
        { id: 1, room: "Room A", date: "2025-01-15", time: "10:00 AM - 12:00 PM", status: "Confirmed" },
        { id: 2, room: "Room B", date: "2025-01-20", time: "02:00 PM - 03:30 PM", status: "Pending" },
      ];
      setBookings(dummyBookings);
    };
    fetchBookings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="main">
        {/* Header */}
        <header className="main-header">
          <h1>Welcome Back, {user?.name || "User"}!</h1>
        </header>

        {/* User Info Section */}
        <section className="card">
          <h2>User Information</h2>
          <div className="details">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Status:</strong> {user?.isVerified ? "Verified" : "Not Verified"}</p>
          </div>
        </section>

        {/* Bookings Section */}
        <section className="card">
          <h2>Your Bookings</h2>
          {bookings.length > 0 ? (
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.room}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td className={`status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bookings available.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
