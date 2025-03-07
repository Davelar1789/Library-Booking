import React from "react";
import { FaHome, FaCalendarAlt, FaHotel, FaBed, FaCog, FaQuestionCircle, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.modules.css";

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation(); // Get the current location

  return (
    <div className="sidebar2">
      <h1>
        <Link to="/" className="university-name">
          University of Ghana
        </Link>
      </h1>

      {/* Menu Items */}
      <div className="menu2">
        <ul>
          <li className={location.pathname === "/dashboard" ? "active-tab" : ""}>
            <Link to="/dashboard" className="menu-link">
              <FaHome style={{ marginRight: "10px" }} />
              Dashboard
            </Link>
          </li>
          <li className={location.pathname === "/my-bookings" ? "active-tab" : ""}>
            <Link to="/my-bookings" className="menu-link">
              <FaCalendarAlt style={{ marginRight: "10px" }} />
              My Bookings
            </Link>
          </li>
          <li className={location.pathname === "/book-room" ? "active-tab" : ""}>
            <Link to="/book-room" className="menu-link">
              <FaHotel style={{ marginRight: "10px" }} />
              Book a Room
            </Link>
          </li>
          <li className={location.pathname === "/room-availability" ? "active-tab" : ""}>
            <Link to="/room-availability" className="menu-link">
              <FaBed style={{ marginRight: "10px" }} />
              Room Availability
            </Link>
          </li>
          <li className={location.pathname === "/settings" ? "active-tab" : ""}>
            <Link to="/settings" className="menu-link">
              <FaCog style={{ marginRight: "10px" }} />
              Settings
            </Link>
          </li>
          <li className={location.pathname === "/help" ? "active-tab" : ""}>
            <Link to="/help" className="menu-link">
              <FaQuestionCircle style={{ marginRight: "10px" }} />
              Help
            </Link>
          </li>
        </ul>

        {/* Divider */}
        <hr className="menu-divider" />

        <ul>
          <li className={location.pathname === "/profile" ? "active-tab" : ""}>
            <Link to="/profile" className="menu-link">
              <FaUserAlt style={{ marginRight: "10px" }} />
              My Profile
            </Link>
          </li>
          <li onClick={onLogout} className="logout">
            <FaSignOutAlt style={{ marginRight: "10px" }} />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
