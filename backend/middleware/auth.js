const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Check if the authorization header exists
        if (!req.headers.authorization) {
            throw new Error('Authorization header is missing');
        }

        // Extract the token from the authorization header
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token:", token); // Log the token
        
        // Verify the token and decode the user information
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded:", decoded); // Log the decoded user information
        
        // Attach the decoded user information to the request object
        req.user = decoded;
        
        
        // Proceed to the next middleware
        next();
    } catch (error) {
        // If verification fails, return a 401 Unauthorized response
        console.error("Auth error:", error); // Log the error
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};
