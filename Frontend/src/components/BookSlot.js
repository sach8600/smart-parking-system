import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parking } from "../api";
import "./BookSlot.css";

const BookSlot = () => {
  const [name, setName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [parkingHours, setParkingHours] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const dto = { name, vehicleNo, parkingHours: Number(parkingHours), mobileNo };
      const res = await parking.book(dto);
      if (res.success) {
        setMessage("✅ Slot booked successfully!");
        setTimeout(() => navigate("/home"), 1200);
      } else {
        setMessage(res.message || "❌ Booking failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "❌ Booking failed. Try again.");
    }
  };

  return (
    <div className="book-slot-container">
      <h2>Book Your Parking Slot</h2>
      {message && <p className={`message ${message.includes("✅") ? "success" : "error"}`}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input type="text" placeholder="Vehicle Number" value={vehicleNo} onChange={(e)=>setVehicleNo(e.target.value)} required />
        <input type="number" placeholder="Parking Hours" value={parkingHours} onChange={(e)=>setParkingHours(e.target.value)} required />
        <input type="tel" placeholder="Mobile Number" value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)} required />
        <button type="submit">Book Slot</button>
      </form>
    </div>
  );
};

export default BookSlot;
