const express = require("express");
const router = express.Router();

const { createReport, getReportsByDate, getReportsByDateRange } = require("../controllers/report.controller");

router.post("/", createReport);
router.get("/date/:date", getReportsByDate);
router.get("/range", getReportsByDateRange);

module.exports = router;
