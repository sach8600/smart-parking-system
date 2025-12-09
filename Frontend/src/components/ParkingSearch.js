import React, { useEffect, useState } from "react";
import { parking } from "../api";
import "./ParkingSearch.css";
import { useNavigate } from "react-router-dom";

const ParkingSearch = () => {
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);
  const [citiesWithAddress, setCitiesWithAddress] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await parking.getCitiesWithAddress();
      if (res.success) setCitiesWithAddress(res.data || []);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!city) return;
    (async () => {
      const res = await parking.searchByCity(city);
      if (res.success) setResults(res.data || []);
    })();
  }, [city]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);

    const found = citiesWithAddress.find(([c]) => c === selectedCity);
    if (found) setSelectedLocation({ cityName: found[0], address: found[1] });
    else setSelectedLocation(null);
  };

  const getMapUrl = (address) => {
    const encoded = encodeURIComponent(address || "");
    return `https://www.google.com/maps?q=${encoded}&output=embed`;
  };

  return (
    <div className="parking-search-container">
      <h2>Search Parking Slots</h2>

      {/* Map Section */}
      <div className="video-container">
        {selectedLocation ? (
          <iframe
            width="560"
            height="315"
            src={getMapUrl(selectedLocation.address)}
            title="Google Maps"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Select a city to view the map.</p>
        )}
      </div>

      {/* Dropdown */}
      <select value={city} onChange={handleCityChange} className="search-input">
        <option value="">Select a city</option>
        {citiesWithAddress.map(([cityName, address], index) => (
          <option key={index} value={cityName}>
            {cityName} - {address}
          </option>
        ))}
      </select>

      {/* Results */}
      <div className="results-container">
        <h3>Results:</h3>
        {results && results.length > 0 ? (
          <ul className="results-list">
            {results.map((slot) => (
              <li key={slot.id} className="result-item">
                <p><strong>📍 Address:</strong> {slot.address}</p>
                <p><strong>🟢 Availability:</strong> {slot.isAvailable ? "Available" : "Not Available"}</p>
                <p><strong>💰 Price per Hour:</strong> ₹{slot.price}</p>
                <p><strong>🅿️ Total Slots:</strong> {slot.slot}</p>
                <p><strong>📞 Contact:</strong> {slot.contact}</p>

                {/* ⭐ Book Slot Button */}
                <button
                  className="book-slot-btn"
                  onClick={() => navigate("/book-slot")}
                >
                  Book Slot
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No parking slots found for this city.</p>
        )}
      </div>
    </div>
  );
};

export default ParkingSearch;
