const express = require("express");

const {
  signup,
  login,
  verifyToken,
  getMe,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToken, getMe);

module.exports = router;