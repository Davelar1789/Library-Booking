import React, { useState } from "react";
import axios from '../api/axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.modules.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { email, password } = formData;

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("/api/auth/login", {
            email,
            password,
        });

        if (response.status === 200) {
            const { token } = response.data;

            if (!token) {
                throw new Error("Token not received from server.");
            }
              // Show a toast notification
              toast.success("Login successful! Redirecting...", {
                autoClose: 3000,  // Show the toast for 3 seconds
              });

            // Store token in localStorage
            localStorage.setItem("token", token);

             // Set a timeout of 3 seconds to navigate after the toast is shown
             setTimeout(() => {
              navigate("/dashboard");  // Navigate to the dashboard after 3 seconds
          }, 3000);

        }
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
    }
};


  return (
    <div className="login-page">
      {/* React Toast */}
      <ToastContainer />

      {/* University Name */}
      <h1 className="university-name">University of Ghana</h1>

      <div className="middle-stuff">
        {/* Login Header */}
        <h2 className="login-title">Login</h2>

        {/* Form Fields */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button className="login-button2" type="submit">
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="signup-text">
          Don't Have An Account?{" "}
          <a href="/signup" className="link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
