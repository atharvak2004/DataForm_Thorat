const express = require('express');
const { google } = require('googleapis');
require('dotenv').config(); 
const keys = require('./service-account.json');
const app = express();
const cors = require("cors");

const allowedOrigin = process.env.CLIENT_URL || "https://valuecarexpert-66oxvj99n-atharvak2004s-projects.vercel.app";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


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
