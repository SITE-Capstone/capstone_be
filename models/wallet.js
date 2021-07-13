const { BadRequestError } = require("../utils/errors");
const db = require("../db");

class Wallet {
  static makePublicWallet(wallet) {
    return {
      user_id: wallet.user_id,
      usd: wallet.usd,
      btc: wallet.btc,
      eth: wallet.eth,
      ada: wallet.ada,
      dot: wallet.dot,
      xmr: wallet.xmr,
      doge: wallet.doge,
    };
  }

  // Creates a wallet
  static async generateWallet(user_id) {
    const requiredFields = ["user_id"];

      if (!user_id) {
        throw new BadRequestError(`Missing ${user_id} in request body.`);
    }

    const existingWallet = await Wallet.fetchWalletByUserId(user_id);

    if (existingWallet) {
      throw new BadRequestError(`A Wallet already exists with User_ID: ${user_id}`);
    }

    const walletResult = await db.query(
      ` INSERT INTO wallet (user_id)
        VALUES ($1)
        RETURNING user_id, usd, btc, eth, ada, dot, xmr, doge;
      `,
      [user_id]
    );

    const wallet = walletResult.rows[0];
    console.log("Wallet class", Wallet.makePublicWallet(wallet))
    return Wallet.makePublicWallet(wallet);
  }

  // fetches the wallet with the user_id
  static async fetchWalletByUserId(user_id) {
    if (!user_id) {
      throw new BadRequestError("No user_id provided");
    }

    const query = `SELECT * FROM wallet WHERE user_id = $1`;

    const result = await db.query(query, [user_id]);

    const wallet = result.rows[0];

    return wallet;
  }
}


module.exports = Wallet;

