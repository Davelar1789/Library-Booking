import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/VerifyEmail.modules.css";
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [email, setEmail] = useState(""); // Temporary for testing, replace with props later
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);

  const navigate = useNavigate();

  const sendCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-verification-code", { email });
      if (response.status === 200) {
        toast.success("Verification code sent to your email");
        setSent(true);
      }
    } catch (error) {
      toast.error("Failed to send verification code");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-code", { email, code });
      if (response.status === 200) {
        toast.success("Email verified successfully!");
        navigate('/login'); // Navigate to /login route
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };
  
  return (
    <div className="verify-email-page">
      <ToastContainer />
      <h2 className="verify-email-title">Verify E-mail</h2>
      <p className="verify-email-subtitle">
        Enter the 4 digits sent to you at {email || "your email"}
      </p>

      <div className="code-inputs">
        {[...Array(4)].map((_, idx) => (
          <input
            key={idx}
            className="code-input"
            type="text"
            maxLength="1"
            value={code[idx] || ""}
            onChange={(e) => {
              const newCode = code.split("");
              newCode[idx] = e.target.value;
              setCode(newCode.join(""));
            }}
          />
        ))}
      </div>

      {!sent ? (
        <p className="resend-text">
          Didn't receive a code? <span className="resend-link" onClick={sendCode}>Resend</span>
        </p>
      ) : null}

      <button className="verify-button" onClick={verifyCode}>
        Verify
      </button>
    </div>
  );
};

export default VerifyEmail;
