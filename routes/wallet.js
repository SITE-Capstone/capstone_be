const express = require("express");
const User = require("../models/user");
const security = require("../middleware/security");
const Wallet = require("../models/wallet");
const router = express.Router();

// list the cards for the coins in wallet
router.get("/", async (req, res, next) => {
  try {
    // fetch wallet for user
    const { id } = res.locals.user;
    const walletCards = await Wallet.fetchWalletByUserId(id);
    return res.status(200).json({ Wallet: walletCards });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
