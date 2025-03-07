// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUp";
import VerifyPage from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import BookRoom from "./pages/bookaroom";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book-room" element={<BookRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
