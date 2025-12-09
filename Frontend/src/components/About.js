import React, { useEffect, useState } from 'react';
import { misc } from '../api';
import './About.css';

const About = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await misc.about();
                if (res.success) {
                    setMessage(res.data);
                }
            } catch (error) {
                console.error("Error fetching about message:", error);
            }
        };
        fetchAbout();
    }, []);

    return (
        <div className="about-container">
            <h1>About Us</h1>

            <p>
                Smart Parking System is a modern solution designed to make parking easier and faster.
                We help users find, book, and manage parking slots instantly through a simple and
                intelligent platform.
            </p>

            <h2>What We Do</h2>
            <ul>
                <li><strong>Real-Time Availability:</strong> Check free parking slots instantly.</li>
                <li><strong>Smart Search:</strong> Find nearest and cost-effective parking options.</li>
                <li><strong>Secure Booking:</strong> Reserve your slot quickly and safely.</li>
                <li><strong>User-Friendly:</strong> Smooth and intuitive interface for all users.</li>
            </ul>

            <h2>Our Goal</h2>
            <p>
                To reduce parking stress, save time, and improve city mobility through smart,
                technology-driven parking management.
            </p>

            {message && <p className="about-message">{message}</p>}
        </div>
    );
};

export default About;
