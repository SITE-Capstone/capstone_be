const { BadRequestError } = require("../utils/errors");
const db = require("../db");

class Wallet {
  static makePublicWallet(wallet) {
    return {
      user_id: wallet.user_id,
      usd: wallet.usd,
      coins: [
        {
          id: 1,
          name: "Bitcoin",
          symbol: "BTC",
          amount: wallet.btc,
          color: "linear-gradient(237.07deg, #484392 -8.06%, #0F0B38 96.63%)",
        },
        {
          id: 2,
          name: "Cardano",
          symbol: "ADA",
          amount: wallet.ada,
          color: "linear-gradient(237.07deg, #439284 -8.06%, #0F0B38 96.63%)",
        },
        {
          id: 3,
          name: "Ethereum",
          symbol: "ETH",
          amount: wallet.eth,
          color: "linear-gradient(216.27deg, #6162D6 -5.62%, #0F0B38 67.37%)",
        },
        {
          id: 4,
          name: "Dogecoin",
          symbol: "DOGE",
          amount: wallet.doge,
          color: "linear-gradient(237.07deg, #EB8338 -8.06%, #0F0B38 96.63%)",
        },
        {
          id: 5,
          name: "Polkadot",
          symbol: "DOT",
          amount: wallet.dot,
          color: "linear-gradient(237.07deg, rgba(146, 67, 138, 0.77) -8.06%, #0F0B38 96.63%)",
        },
        {
          id: 6,
          name: "Monero",
          symbol: "XMR",
          amount: wallet.xmr,
          color: "linear-gradient(237.07deg, #D66168 -8.06%, #0F0B38 96.63%)",
        },
      ],
    };
  }

  // Creates a wallet
  static async generateWallet(user_id) {
    const requiredFields = ["user_id"];

    if (!user_id) {
      throw new BadRequestError(`Missing ${user_id} in request body.`);
    }

    /* COMMENTED OUT BELOW CODE: on creation of new user it had no user_id and broke on existing wallet check. Removed because it we do not need to check if a wallet exists since they are created on register and there is checking in place for register not to allow duplicate accounts.*/

    // const existingWallet = await Wallet.fetchWalletByUserId(user_id);

    // if (existingWallet) {
    //   throw new BadRequestError(`A Wallet already exists with User_ID: ${user_id}`);
    // }

    const walletResult = await db.query(
      ` INSERT INTO wallet (user_id)
        VALUES ($1)
        RETURNING user_id, usd, btc, eth, ada, dot, xmr, doge;
      `,
      [user_id]
    );

    const wallet = walletResult.rows[0];
    console.log("Wallet class", Wallet.makePublicWallet(wallet));
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

    return Wallet.makePublicWallet(wallet);
  }
}

module.exports = Wallet;
