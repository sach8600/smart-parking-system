import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", city: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.signup(formData);
      if (res.success) {
        setMessage("✅ Sign-up successful! Redirecting to Sign In...");
        setIsSuccess(true);
        setTimeout(() => navigate("/signin"), 1500);
      } else {
        setIsSuccess(false);
        setMessage(res.message || "❌ Failed to sign up.");
      }
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setMessage(err.response?.data?.message || "❌ Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {message && <p className={`signup-message ${isSuccess ? "success" : "error"}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} required/>
        <input type="email" placeholder="Email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} required/>
        <input type="password" placeholder="Password" value={formData.password} onChange={(e)=>setFormData({...formData, password:e.target.value})} required/>
        <input type="text" placeholder="City" value={formData.city} onChange={(e)=>setFormData({...formData, city:e.target.value})} required/>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
