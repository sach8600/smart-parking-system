🚗 Smart Parking Management System

This is a full-stack parking management application where users can register, log in, search for parking slots in their city, check availability, and book a slot online.
The project is built using React for the frontend and Spring Boot + MySQL for the backend.

⭐ What This Project Does

Lets users create an account and log in securely

Shows available parking slots based on city

Displays address, price, total slots, contact number, and availability

Allows users to book a parking slot

Integrates Google Maps to show location

Provides password reset option

🛠️ Technologies Used
Frontend

React

Axios

React Router

Context API (for login state)

CSS

Backend

Spring Boot

Spring Data JPA

Spring Security (basic)

BCrypt password hashing

MySQL

📡 API Overview
Auth APIs

POST /api/auth/signup — Register a new user

POST /api/auth/signin — Login

POST /api/auth/verify-email — Check if email exists

POST /api/auth/reset-password — Reset password

Parking APIs

GET /api/parking/search?city=Pune — Search parking

GET /api/cities-with-address — Get cities list

POST /api/parking/book — Book slot

🗄 Database Tables
Users

Stores user information and encrypted passwords.

Parking Slots

Stores parking location, price, availability, and contact details.

Bookings

Stores booking information like vehicle number, hours, and mobile number.

▶️ How to Run the Project
Backend (Spring Boot)

Open backend folder in STS

Update MySQL username/password in application.properties

Run the project

Backend runs at:

http://localhost:8080

Frontend (React)

Open frontend folder in VS Code

Install dependencies:

npm install


Start React app:

npm start


Frontend runs at:

http://localhost:3000

🚀 Future Improvements

Online payment integration

Admin dashboard

Real-time slot availability

Mobile app version

Advanced security with JWT

Email/SMS notifications

👨‍💻 Developer

Sachin Surpe
Full Stack Developer — React | Spring Boot | MySQL

💬 Feel free to reach out for collaboration or suggestions!
