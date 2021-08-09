const express = require("express");
const Statistics = require("../models/statistics");
const router = express.Router();

// list the cards for the coins in wallet
router.get("/", async (req, res, next) => {
  try {
    const statistics = await Statistics.fetchAllStatistics();
    return res.status(200).json({ statistics: statistics });
  } catch (err) {
    next(err);
  }
});

router.get("/coin", async (req, res, next) => {
    try {
      const { coin_id } = req.query;
      const statistics = await Statistics.fetchStatistics(coin_id);
      return res.status(200).json({ statistics: statistics});
      } catch (err) {
          next(err);
      }
});




module.exports = router;
