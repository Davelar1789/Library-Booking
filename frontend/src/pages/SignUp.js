import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SignUp.modules.css";
import "../styles/VerifyEmail.modules.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [emailSent, setEmailSent] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("Account created successfully!");
        setIsVerificationStep(true);

        // Automatically send verification code
        await sendVerificationCode();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-verification-code", { email });
      if (response.status === 200) {
        toast.success("Verification code sent to your email");
        setEmailSent(true);
      }
    } catch (error) {
      toast.error("Failed to send verification code");
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const code = verificationCode.join(""); // Join the array into a single string
      const response = await axios.post("http://localhost:5000/api/auth/verify-code", {
        email,
        code,
      });
  
      if (response.status === 200) {
        toast.success("Email verified successfully!");
        setVerificationCode(["", "", "", ""]); // Reset the code input
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      
        // Delay navigation by 3 seconds
        setTimeout(() => {
          navigate('/login'); // Navigate to /login route
        }, 3000);
      }      
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };
  

  return (
    <div className="signup-page">
      <ToastContainer />
      <h1><Link to={"/"} className="university-name">University of Ghana</Link></h1>      
      <div className="middle-stuff">
        {isVerificationStep ? (
          <>
            <h2 className="signup-title">Verify Email</h2>
            <p className="verify-email-subtitle">
              Enter the 4-digit code sent to {email || "your email"}
            </p>
            <form onSubmit={handleVerificationSubmit} className="verification-form">
            <div className="code-inputs">
  {[...Array(4)].map((_, idx) => (
    <input
      key={idx}
      className="code-input"
      type="text"
      maxLength="1"
      value={verificationCode[idx] || ""}
      onChange={(e) => {
        const newCode = [...verificationCode]; // Spread to clone the array
        newCode[idx] = e.target.value; // Update the value at the current index
        setVerificationCode(newCode);
      
        // Automatically move to the next input box
        if (e.target.value && idx < 3) {
          document.getElementById(`code-${idx + 1}`).focus();
        }
      }}
      
      onKeyDown={(e) => {
        // Handle backspace to move to the previous input box
        if (e.key === "Backspace" && idx > 0 && !verificationCode[idx]) {
          document.getElementById(`code-${idx - 1}`).focus();
        }
      }}
      id={`code-${idx}`}
    />
  ))}
</div>
              {!emailSent && (
                <p className="resend-text">
                  Didn't receive a code?{" "}
                  <span className="resend-link" onClick={sendVerificationCode}>
                    Resend
                  </span>
                </p>
              )}
              <button className="verify-button" type="submit">
                Verify
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="signup-title">Sign Up</h2>
            <form className="signup-form" onSubmit={handleSignUpSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Username
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>
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
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="form-input"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div className="form-checkbox">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree with the{" "}
                  <span className="link">terms of service</span> and{" "}
                  <span className="link">privacy policy</span>
                </label>
              </div>
              <button className="signup-button2" type="submit">
                Sign Up
              </button>
              {/* Sign Up with Google */}
          <button className="google-button" type="button">Sign Up with Google</button>
            </form>
             {/* Already have an account */}
             <p className="signin-text">
  Already Have An Account? <Link to="/login" className="link">Sign In</Link>
</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
