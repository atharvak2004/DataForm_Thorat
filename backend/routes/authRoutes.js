const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/change-password", auth.changePassword);
router.get("/me", auth.getCurrentUser); 

module.exports = router;