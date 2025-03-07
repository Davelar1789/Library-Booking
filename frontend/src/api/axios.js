import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://library-booking-c5ct.onrender.com",
  withCredentials: true, // Required for sending cookies with requests
});

// Add an interceptor to handle expired or unauthorized tokens
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login if user is unauthorized
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export default api;
