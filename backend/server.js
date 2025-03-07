const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const profileRoutes = require("./routes/profileRoutes");
const path = require('path');


dotenv.config();
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://library-booker2.vercel.app/", // Replace with your frontend URL
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions)); // Use CORS with the above configuration
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
