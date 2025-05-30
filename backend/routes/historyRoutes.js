const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");

router.get("/latest", historyController.getLatestReports);

module.exports = router;
