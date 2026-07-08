const express = require("express");
const router = express.Router();

const {
  createOrUpdateInitialStock,
  getInitialStock,
} = require("../controllers/initialStock.controller");

router.post("/", createOrUpdateInitialStock);
router.get("/vendor/:vendorId/date/:date", getInitialStock);

module.exports = router;
