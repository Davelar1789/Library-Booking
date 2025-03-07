// src/pages/HomePage.js
import React from "react";
import "../styles/HomePage.modules.css";
import heroImage from "../assets/hero2.jpeg";
import 'animate.css';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    // Initialize the navigate function
    const navigate = useNavigate();
  
    // Handle Sign Up button click
    const handleSignUpClick = () => {
      navigate('/signup'); // Navigate to the /signup route
    };

    const handleLoginClick = () => {
      navigate("/login");
    };
  
    return (  
    <div className="homepage">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-left">
          <span className="navbar-brand">University of Ghana</span>
        </div>
        <nav className="navbar-middle">
          <a href="/" className="navbar-tab">Home</a>
          <a href="/booking" className="navbar-tab">Room Booking</a>
          <a href="/contact" className="navbar-tab">Contact Us</a>
          <a href="/availability" className="navbar-tab">Table Availability</a>
        </nav>
        <div className="navbar-right">
        <button className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
        <button className="login-button" onClick={handleLoginClick}>
                Login
              </button>        
              </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">A safe space awaits</h1>
        <img src={heroImage} alt="Hero"  className="hero-image animate__animated animate__fadeInUp"/><div></div>
        <button className="booking-button">Book Now</button>
      </section>

      {/* About Us Section */}
      {/* <section className="about-us">
        <h2>About Us</h2>
        <p>
          This platform provides a seamless and intuitive process to reserve a
          discussion room, minimizing the time and effort of students.
        </p>
        <button className="availability-button">Check Availability</button>
      </section> */}

      {/* Working Hours */}
      {/* <section className="working-hours">
        <h3>Working Hours</h3>
        <ul>
          <li>Monday - Friday: 8:30 - 22:00</li>
          <li>Saturday: 8:00 - 16:00</li>
          <li>Holidays: 9:00 - 17:00</li>
        </ul>
      </section> */}

      {/* Steps to Follow */}
      {/* Steps to Follow */}
<section className="steps">
  <h3>Steps to Follow</h3>
  <div className="steps-container">
    <div className="step">
      <span className="step-number">1</span>
      <p>Create an account to begin the process</p>
    </div>
    <div className="step">
      <span className="step-number">2</span>
      <p>Check availability and fill the forms</p>
    </div>
    <div className="step">
      <span className="step-number">3</span>
      <p>Submit your booking request</p>
    </div>
  </div>
</section>

{/* Footer */}
<footer className="footer">
  <div className="footer-content">
    <div className="footer-links">
      <a href="/">Book a Room</a>
      <a href="/">Check Availability</a>
      <a href="/">Contact Us</a>
    </div>
    <div className="footer-contact">
      <p>📞 +233 55 00 5678</p>
      <p>📧 ug@university.com</p>
    </div>
  </div>
</footer>

    </div>
  );
};

export default HomePage;