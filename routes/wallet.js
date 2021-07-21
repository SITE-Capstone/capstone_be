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

router.put("/exchange", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
      //Defining the parameters
      //TYPE 0= buying Crypto <- Selling dollar
      //TYPE 1= selling Crypto -> Buying dollar

      const { buying_id, selling_id, quantity, type, price} = req.body
      const { username } = res.locals.user;
      const user = await User.fetchUserByUsername(username);
      const { id } = user;
      const order = {
        user_id:id,
        buying_id: buying_id,
        selling_id: selling_id,
        quantity: quantity,
        type:type,
        price:price
      }
      //Model Functions
      const transaction = await Wallet.editWallet(order);
      const publicTransaction = await Wallet.makePublicTransaction(transaction);
      
      return res.status(200).json({ transaction: publicTransaction });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
