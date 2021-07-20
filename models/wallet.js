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

    if (!user_id) {
      throw new BadRequestError(`Missing ${user_id} in request body.`);
    }


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

  static async makePublicTransaction(transaction){
    return {
      transactions:transaction,
    }
  }
  
  
  static async editWallet(order){
    const requiredFields = ["user_id", "buying_id", "selling_id", "quantity", "type"]

    requiredFields.forEach((property) => {
      if (!order.hasOwnProperty(property)) {
        console.log(property)
        throw new BadRequestError(`Missing ${property} in request body.`);
      }
    })
    let user_id= order.user_id
    let  buying_id= order.buying_id
    let  selling_id= order.selling_id
    let quantity = order.quantity
    let type= order.type
    
    let buying_quantity=quantity
    let selling_quantity=quantity
    //First db.query edits the wallet Table
    const editQuery =
    ` 
    UPDATE wallet
    SET ${buying_id} = $2, ${selling_id} =$3
    WHERE user_id = $1;
    `;
    await db.query(editQuery, [user_id, buying_quantity, selling_quantity]);

    const transactionResult = await db.query(
      ` INSERT INTO transactions (user_id, buying_id, buying_quantity, selling_id, selling_quantity  )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, user_id, buying_id, buying_quantity, selling_id, selling_quantity;
      `,
      [user_id, buying_id, buying_quantity, selling_id, selling_quantity]
    );
    

    const transaction = transactionResult.rows[0];
    console.log("Wallet class->makeTransaction", Wallet.makePublicTransaction(transaction))
    return transaction;
  }


  static async getTransactionHistory(user_id) {
    if (!user_id) {
      throw new BadRequestError(`Missing ${user_id} in request body.`);
    }

    const resultQuery =
    ` 
    SELECT * FROM transactions
    WHERE user_id = $1;
    `;
    const transactionResult = await db.query(resultQuery, [user_id]);
    return transactionResult;
  }



}

module.exports = Wallet;
