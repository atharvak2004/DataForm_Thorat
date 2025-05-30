const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.post('/change-password', auth.changePassword);

module.exports = router;
