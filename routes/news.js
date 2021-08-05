const express = require("express");
const News = require("../models/news");
const router = express.Router();

// list the cards for the coins in wallet
router.get("/", async (req, res, next) => {
  try {
    const articles = await News.fetchAllNews();
    return res.status(200).json({ Articles: articles });
  } catch (err) {
    next(err);
  }
});

router.get("/coin", async (req, res, next) => {
    try {
      const { coin_id } = req.query;
      const articles = await News.fetchCoinNews(coin_id);
      return res.status(200).json({ Articles: articles});
      } catch (err) {
          next(err);
      }
});




module.exports = router;
