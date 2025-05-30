require("dotenv").config(); // Load env vars
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET; 

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).send("Token missing");

  try {
    const user = jwt.verify(token, SECRET);
    if (user.role !== "admin") return res.status(403).send("Not authorized");
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};
