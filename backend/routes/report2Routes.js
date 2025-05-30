const express = require("express");
const router = express.Router();
const controller = require("../controllers/report2Controller");

router.get("/find/:registrationNo", controller.find);
router.post("/", controller.create);
router.post("/update/:rowIndex", controller.update);

module.exports = router;
