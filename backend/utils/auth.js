const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check if the Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Extract the token (remove "Bearer " prefix)
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the decoded user ID to the request object for further use
    req.userId = decoded.id;
    next();
  } catch (error) {
    // Handle invalid or expired tokens
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
