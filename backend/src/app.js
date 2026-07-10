const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const icecreamRoutes = require("./routes/icecream.routes");
const vendorRoutes=require("./routes/vendor.routes");
const initialStockRoutes=require("./routes/initialStock.routes");
const leftoverStockRoutes=require("./routes/leftoverStock.routes");
const reportRoutes=require("./routes/report.routes");

const app = express();

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser());

app.use(session({
  secret: process.env.JWT_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
}));

app.use("/api/auth", authRoutes);

app.use("/api/icecream", icecreamRoutes);
app.use("/api/vendor",vendorRoutes);
app.use("/api/initial-stock", initialStockRoutes);
app.use("/api/leftover-stock", leftoverStockRoutes);
app.use("/api/report", reportRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
