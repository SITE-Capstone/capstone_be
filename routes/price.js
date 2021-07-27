const express = require("express");
const Price = require("../models/price");
const router = express.Router();

// list the cards for the coins in wallet
router.get("/", async (req, res, next) => {
  try {
    // fetch wallet for user
    const prices = await Price.fetchAllCurrentPrices();
    return res.status(200).json({ Prices: prices });
  } catch (err) {
    next(err);
  }
});

router.get("/yearly", async (req, res, next) => {
    try {
      const { coin_id } = req.query;
      const data = await Price.fetchYearlyCoinData(coin_id);
      return res.status(200).json({ data: data });
      } catch (err) {
          next(err);
      }
});

router.get("/weekly", async (req, res, next) => {
    try {
      const { coin_id } = req.query;
      const data = await Price.fetchWeeklyCoinData(coin_id);
      return res.status(200).json({ data: data });
      } catch (err) {
          next(err);
      }
});

router.get("/hourly", async (req, res, next) => {
  try {
    const { coin_id } = req.query;
    const data = await Price.fetchHourlyCoinData(coin_id);
    return res.status(200).json({ data: data });
    } catch (err) {
        next(err);
    }
});
router.get("/current", async (req, res, next) => {
    try {
      const { coin_id } = req.query;
      const data = await Price.fetchCurrentPrice(coin_id);
      return res.status(200).json({ data: data });
      } catch (err) {
          next(err);
      }
  });

module.exports = router;
