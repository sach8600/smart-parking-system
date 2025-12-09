import React, { useState } from "react";
import { auth } from "../api";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.verifyEmail(email);
      if (res.success) {
        // backend returned { exists: true } inside data OR top-level message - handle both:
        const exists = (res.data && res.data.exists) || res.success === true;
        if (exists) {
          setStep(2);
          setMessage("");
          return;
        }
      }
      setMessage("Email not found. Please try again.");
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.resetPassword(email, newPassword);
      if (res.success) {
        setMessage("Password reset successfully. You can now sign in.");
      } else {
        setMessage(res.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      {step === 1 ? (
        <form onSubmit={handleVerifyEmail}>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <button type="submit">Verify Email</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required />
          <button type="submit">Reset Password</button>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
