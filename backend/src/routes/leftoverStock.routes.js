const express = require("express");
const router = express.Router();

const {
  createOrUpdateLeftoverStock,
  getLeftoverStock,
} = require("../controllers/leftoverStock.controller");

router.post("/", createOrUpdateLeftoverStock);
router.get("/vendor/:vendorId/date/:date", getLeftoverStock);

module.exports = router;
