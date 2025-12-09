import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Smart Parking</Link>

        <div className="hamburger-menu" onClick={toggleMobileMenu}>
          <div className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></div>
          <div className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></div>
          <div className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></div>
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <li className="nav-item"><Link to="/" className="nav-links" onClick={toggleMobileMenu}>Home</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-links" onClick={toggleMobileMenu}>About</Link></li>
          <li className="nav-item"><Link to="/search" className="nav-links" onClick={toggleMobileMenu}>Search Parking</Link></li>

          {user ? (
            <>
              <li className="nav-item"><span className="nav-links">Hi, {user.name}</span></li>
              <li className="nav-item"><button className="nav-links logout-button" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link to="/signin" className="nav-links" onClick={toggleMobileMenu}>Sign In</Link></li>
              <li className="nav-item"><Link to="/signup" className="nav-links" onClick={toggleMobileMenu}>Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
