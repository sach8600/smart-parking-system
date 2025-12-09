import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api";
import { useAuth } from "../context/AuthContext";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await auth.signin({ email: email.toLowerCase(), password });
      if (res.success) {
        // res.data should contain { userId, email, name } as per backend
        const userData = res.data || {};
        // Save user in context
        login({ id: userData.userId, name: userData.name, email: userData.email });
        setIsSuccess(true);
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/home"), 800);
      } else {
        setIsSuccess(false);
        setMessage(res.message || "Invalid credentials");
        if (res.message && res.message.toLowerCase().includes("account not available")) {
          // optional redirect to signup
          setTimeout(() => navigate("/signup"), 2000);
        }
      }
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setMessage(err.response?.data?.message || "❌ Account not found. Please Sign Up!");
      if (err.response?.status === 404) setTimeout(() => navigate("/signup"), 2000);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {message && <p className={`signin-message ${isSuccess ? "success" : "error"}`}>{message}</p>}

      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signin-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signin-input"
          required
        />

        <button type="submit" className="signin-button">Sign In</button>
      </form>

      <p className="forgot-password-link">
        <a href="/forgot-password">Forgot Password?</a>
      </p>

      <p>Don't have an account?</p>
      <button className="sign-up-button" onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
};

export default SignIn;
