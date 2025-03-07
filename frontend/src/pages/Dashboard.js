import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.modules.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get("/api/bookings/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter bookings to only show the logged-in user's bookings
        const userBookings = response.data.bookings.filter(
          (booking) => booking.email === user?.email
        );

        setBookings(userBookings);
      } catch (error) {
        setError("Failed to fetch bookings. Please try again.");
        console.error("Fetch Bookings Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} onLogout={handleLogout} />

      <main className="main">
        <header className="main-header">
          <h1>Welcome Back, {user?.name || "User"}!</h1>
        </header>

        <section className="card">
          <h2>User Information</h2>
          <div className="details">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Status:</strong> {user?.isVerified ? "Verified" : "Not Verified"}</p>
          </div>
        </section>

        <section className="card">
          <h2>Your Bookings</h2>

          {loading ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : bookings.length > 0 ? (
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Table Number</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.groupName}</td>
                    <td>{booking.tableNumber}</td>
                    <td>{new Date(booking.meetingDate).toLocaleDateString()}</td>
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
