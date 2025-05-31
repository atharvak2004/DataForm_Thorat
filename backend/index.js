const express = require('express');
const fs = require('fs');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Configure allowed origins
const allowedOrigins = [
  "https://valuecarexpert.vercel.app",
  "http://localhost:3000"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Fixed: Load Google service account credentials safely
let keys;
try {
  keys = JSON.parse(fs.readFileSync(process.env.GOOGLE_CREDENTIALS_PATH || "./service-account.json", "utf8"));
  console.log("Google credentials loaded successfully");
} catch (err) {
  console.error("Failed to load Google credentials:", err);
  // Fallback to environment variable if available
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    try {
      keys = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
      console.log("Google credentials loaded from environment variable");
    } catch (parseErr) {
      console.error("Failed to parse Google credentials from environment:", parseErr);
      process.exit(1);
    }
  } else {
    console.error("No Google credentials available");
    process.exit(1);
  }
}

// Import all routes
const report1Routes = require("./routes/report1Routes");
const report2Routes = require("./routes/report2Routes");
const report3Routes = require("./routes/report3Routes");
const report4Routes = require("./routes/report4Routes");
const report5Routes = require("./routes/report5Routes");
const historyRoutes = require("./routes/historyRoutes");
const authRoutes = require("./routes/authRoutes");

// Mount routes
app.use("/report1", report1Routes);
app.use("/report2", report2Routes);
app.use("/report3", report3Routes);
app.use("/report4", report4Routes);
app.use("/report5", report5Routes);
app.use("/history", historyRoutes);
app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});