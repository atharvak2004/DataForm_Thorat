const express = require('express');
const { google } = require('googleapis');
require('dotenv').config(); 
const keys = require('./service-account.json');
const app = express();
const cors = require("cors");

const allowedOrigin = process.env.CLIENT_URL || "https://valuecarexpert-4ddw8lx8s-atharvak2004s-projects.vercel.app";

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 👈 Handle preflight



app.use(express.json());

// ✅ Import Routes
const report1Routes = require("./routes/report1Routes");
const report2Routes = require("./routes/report2Routes");
const report3Routes = require("./routes/report3Routes");
const report4Routes = require("./routes/report4Routes");
const report5Routes = require("./routes/report5Routes");
const historyRoutes = require("./routes/historyRoutes");
const authRoutes = require("./routes/authRoutes");

console.log("Mounting report1Routes at /report1");
app.use("/report1", report1Routes);

console.log("Mounting report2Routes at /report2");
app.use("/report2", report2Routes);

console.log("Mounting report3Routes at /report3");
app.use("/report3", report3Routes);

console.log("Mounting report4Routes at /report4");
app.use("/report4", report4Routes);

console.log("Mounting report5Routes at /report5");
app.use("/report5", report5Routes);

console.log("Mounting historyRoutes at /history");
app.use("/history", historyRoutes);

console.log("Mounting authRoutes at /auth");
app.use("/auth", authRoutes);


// ✅ Use PORT from .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
