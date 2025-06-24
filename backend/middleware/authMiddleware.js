const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

module.exports = {
  authenticate: (req, res, next) => {
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  },

  authorize: (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      next();
    };
  }
};