import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

const Home = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className={`overlay ${animate ? "fade-in" : ""}`}>
          <h1 className="hero-heading">LET’S BID GOODBYE TO ALL THE PARKING PROBLEMS!</h1>
          <h2 className="hero-subheading">Smart Parking Application For Advanced Users</h2>
          <p className="hero-description">Show My Parking provides you with a smarter way to park when you’re on the go.</p>

          <div className="nav-buttons">
            <button className="cta-button" onClick={() => navigate("/search")}>Search Parking</button>
            <button className="cta-button" onClick={() => navigate("/about")}>About</button>
        
          </div>
        </div>
      </div>

      <div className={`stats-section ${animate ? "slide-up" : ""}`}>
        <div className="stat-card"><h2>100+</h2><p>Application Downloads</p></div>
        <div className="stat-card"><h2>800+</h2><p>Parking Bookings</p></div>
        <div className="stat-card"><h2>350+</h2><p>Registered Users</p></div>
        <div className="stat-card"><h2>4</h2><p>Awards</p></div>
      </div>
    </div>
  );
};

export default Home;
