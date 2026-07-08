const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const icecreamRoutes = require("./routes/icecream.routes");
const vendorRoutes=require("./routes/vendor.routes");
const initialStockRoutes=require("./routes/initialStock.routes");
const leftoverStockRoutes=require("./routes/leftoverStock.routes");
const reportRoutes=require("./routes/report.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/icecream", icecreamRoutes);

app.use("/api/vendor",vendorRoutes);

app.use("/api/initial-stock", initialStockRoutes);

app.use("/api/leftover-stock", leftoverStockRoutes);

app.use("/api/report", reportRoutes);

module.exports = app;
