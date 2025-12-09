import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor (optional: handle common errors)
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    // You can add global error handling/logging here
    return Promise.reject(error);
  }
);

export default instance;
