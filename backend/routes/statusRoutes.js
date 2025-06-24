const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");
const authMiddleware = require("../middleware/authMiddleware");

// Admin routes
router.get("/reports",
  statusController.getAllReports
);

router.put("/reports/:reportId/status",
  statusController.updateStatus
);

// User routes
router.get("/user-reports",
  statusController.getUserReports
);


module.exports = router;