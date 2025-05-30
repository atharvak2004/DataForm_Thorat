const express = require("express");
const router = express.Router();
const controller = require("../controllers/report1Controller");

router.get("/find/:vehicleNo", controller.find);
router.post("/", controller.create);
router.post("/update/:rowIndex", controller.update);

module.exports = router;
