const express = require("express");
const {
  createIcecream,
  getUserIcecreams,
  deleteUserIcecream,
  updateUserIcecream,
} = require("../controllers/icecream.controller");

const router = express.Router();

router.post("/create", createIcecream);
router.get("/user/:userId", getUserIcecreams);
router.delete("/:userId", deleteUserIcecream);
router.put("/:userId",updateUserIcecream);

module.exports = router;
