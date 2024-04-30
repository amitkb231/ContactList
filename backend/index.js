const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config(); // Load environment variables

// Import database connection logic
const connectDB = require('./db');

// Connect to MongoDB database (moved to separate db.js file)
connectDB();

// Define routes
const userDataRoute = require("./routes/userDataRoute");
//const authMiddleware = require("./middleware/auth"); // Import the auth middleware
const userRoute = require("./routes/userRoute")
// Apply middleware
app.use(express.json()); // Parse incoming JSON data

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

const cookieParser = require('cookie-parser'); 
app.use(cookieParser());

// Mount routes
app.use( "/api/contacts",userDataRoute); // Apply authMiddleware to userDataRoute
app.use("/api/auth",userRoute)

const port = process.env.PORT || 8000; // Use environment variable or default port

app.listen(port, () => console.log(`Server listening on Port ${port}`));
