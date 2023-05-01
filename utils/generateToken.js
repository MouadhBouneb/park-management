const jwt = require("jsonwebtoken");

exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
exports.authenticateToken = (req, res, next) => {
  // Get the JWT from the request headers
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // Return 401 Unauthorized if no token is found
    return res.status(401).json({ message: "Missing authorization token" });
  }

  try {
    // Verify and decode the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(403).json({ message: "Invalid authorization token" });
    }
    // Add the user id to the request object for future middleware to use
    req.userId = decoded.id;
    next();
  } catch (err) {
    // Return 403 Forbidden if the token is invalid
    return res.status(403).json({ message: "Invalid authorization token" });
  }
};
