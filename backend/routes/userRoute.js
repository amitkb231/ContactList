const express = require("express");
const router = express.Router();
const User = require("../models/userModel"); // Assuming the path is correct
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For JWT generation and verification

// Function for JWT verification (middleware)
/*const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Forbidden' });
  }
};*/

// Login (POST) - Authenticate user and generate JWT token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received email:", email);
    console.log("Received password:", password);


    // Input validation (optional)
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields (email, password)" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token with secret key and expiry time
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    // Send the token back to the client
    res.status(200).json({ token }); // Send token on successful login
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// Signup (POST) - Create a new user with hashed password
router.post("/signup", async (req, res) => {
  console.log("Received request to create new user:");
  console.log(req.body);

  try {
    const { email, username, password } = req.body;

    // Input validation (optional): You can add validation logic here
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Missing required fields (email, username, password)" });
    }

    const existingUser = await User.findOne({ email }); // Check for existing email
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.log("Plain text password:", password);


     // Generate salt for password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);


    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    const userAdded = await newUser.save(); // Save the new user

    res.status(201).json({ message: "User created successfully" }); // Respond with success message (201 Created)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" }); // Handle errors (500 Internal Server Error)
  }
});

module.exports = router;
