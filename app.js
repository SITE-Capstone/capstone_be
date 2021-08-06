const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const security = require("./middleware/security");
const authRoutes = require("./routes/auth");
const tutorialsRoutes = require("./routes/tutorials");
const walletRoutes = require("./routes/wallet");
const priceRoutes = require("./routes/price");
const newsRoutes = require("./routes/news")
const { NotFoundError } = require("./utils/errors");
const scheduler = require("./cron/scheduler");

/* 
uncomment line 15 to run CRON scheduler
*/
scheduler.coinRequestCrons();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use(security.extractUserFromJwt);

// ROUTES
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});
app.get("/test", function (req, res) {
  return res.status(200).json({
    route: "test",
  });
});

app.use("/auth", authRoutes);
app.use("/tutorials", tutorialsRoutes);
app.use("/wallet", walletRoutes);
app.use("/price", priceRoutes);
app.use("/news", newsRoutes);

// Errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});
//Generic Error handler
app.use(function (err, req, res, next) {
  if (!config.IS_TESTING) console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
