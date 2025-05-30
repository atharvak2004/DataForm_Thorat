const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config(); // ⬅️ load .env first
const keys = require('./service-account.json');

const app = express();

// ✅ CORS setup to allow all origins or configure specifically
app.use(cors({
  origin: process.env.CLIENT_URL || '*', // e.g., http://localhost:5173 for Vite
  credentials: true,
}));

app.use(express.json());

// ✅ Import Routes
const report1Routes = require("./routes/report1Routes");
const report2Routes = require("./routes/report2Routes");
const report3Routes = require("./routes/report3Routes");
const report4Routes = require("./routes/report4Routes");
const report5Routes = require("./routes/report5Routes");
const historyRoutes = require("./routes/historyRoutes");
const authRoutes = require("./routes/authRoutes");

// ✅ Mount Routes
app.use("/report1", report1Routes);
app.use("/report2", report2Routes);
app.use("/report3", report3Routes);
app.use("/report4", report4Routes);
app.use("/report5", report5Routes);
app.use("/history", historyRoutes);
app.use("/auth", authRoutes);

// ✅ Use PORT from .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
