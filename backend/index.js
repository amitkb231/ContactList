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
    origin: ["https://localhost:3000"], // Replace with your actual frontend domain
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// HTTPS Configuration
const fs = require('fs');
const https = require('https');

const privateKey = fs.readFileSync('C:/Users/Amit/cert.key'); // Replace with your certificate key path
const certificate = fs.readFileSync('C:/Users/Amit/cert.crt'); // Replace with your certificate path

const httpsServer = https.createServer({
  key: privateKey,
  cert: certificate
}, app);

// Mount routes
app.use( "/api/contacts",userDataRoute); // Apply authMiddleware to userDataRoute
app.use("/api/auth",userRoute)

const port = process.env.PORT || 8000; // Use environment variable or default port

httpsServer.listen(port, () => console.log(`Server listening on Port ${port} (HTTPS)`));
