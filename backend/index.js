const express = require('express');
const { google } = require('googleapis');
require('dotenv').config(); 
const keys = JSON.parse(fs.readFileSync("/etc/secrets/service-account.json", "utf8"));
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
app.options("*", cors(corsOptions)); 



app.use(express.json());

// ✅ Import Routes
// const report1Routes = require("./routes/report1Routes");
// const report2Routes = require("./routes/report2Routes");
// const report3Routes = require("./routes/report3Routes");
// const report4Routes = require("./routes/report4Routes");
// const report5Routes = require("./routes/report5Routes");
// const historyRoutes = require("./routes/historyRoutes");
// const authRoutes = require("./routes/authRoutes");

// app.use("/report1", report1Routes);
// app.use("/report2", report2Routes);
// app.use("/report3", report3Routes);
// app.use("/report4", report4Routes);
// app.use("/report5", report5Routes);
// app.use("/history", historyRoutes);
// app.use("/auth", authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
