const { BadRequestError } = require("../utils/errors");
const db = require("../db");

class Wallet {
  static makePublicWallet(wallet) {
    return {
      user_id: wallet.user_id,
      usd: Number(wallet.usd),
      coins: [
        {
          id: 1,
          name: "Bitcoin",
          symbol: "BTC",
          amount: Number(wallet.btc),
          color: "linear-gradient(237.07deg, #484392 -8.06%, #0F0B38 96.63%)",
        },
        {
          id: 2,
          name: "Cardano",
          symbol: "ADA",
          amount: Number(wallet.ada),
          color: "linear-gradient(237.07deg, #439284 -8.06%, #0F0B38 96.63%)",
        },
        {
          id: 3,
          name: "Ethereum",
          symbol: "ETH",
          amount: Number(wallet.eth),
          color: "linear-gradient(216.27deg, #6162D6 -5.62%, #0F0B38 67.37%)",
        },
        {
          id: 4,
          name: "Dogecoin",
          symbol: "DOGE",
          amount: Number(wallet.doge),
          color: "linear-gradient(237.07deg, #EB8338 -8.06%, #0F0B38 96.63%)",
        },
        {
          id: 5,
          name: "Polkadot",
          symbol: "DOT",
          amount: Number(wallet.dot),
          color: "linear-gradient(237.07deg, rgba(146, 67, 138, 0.77) -8.06%, #0F0B38 96.63%)",
        },
        {
          id: 6,
          name: "Monero",
          symbol: "XMR",
          amount: Number(wallet.xmr),
          color: "linear-gradient(237.07deg, #D66168 -8.06%, #0F0B38 96.63%)",
        },
      ],
    };
  }

  // Creates a wallet
  static async generateWallet(user_id) {
    if (!user_id) {
      throw new BadRequestError(`Missing user_id in request body.`);
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

  static async fetchCurrencyByUserId(user_id, currency_id) {
    if (!user_id) {
      throw new BadRequestError("No user_id provided");
    }
    if (!currency_id) {
      throw new BadRequestError("No currency_id provided");
    }

    const query = `SELECT (${currency_id}) FROM wallet WHERE user_id = $1`;

    const result = await db.query(query, [user_id]);

    const wallet = result.rows[0];

    return wallet;
  }

  static async makePublicTransaction(transaction) {
    return {
      transactions: transaction,
    };
  }

  static async editWallet(order) {
    const requiredFields = ["user_id", "buying_id", "selling_id", "quantity", "type", "price"];
    requiredFields.forEach((property) => {
      if (!order.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`);
      }
    });

    let buying_quantity = order.quantity;
    let selling_quantity = order.quantity;
    if (order.type === 0) {
      selling_quantity = order.quantity * order.price;
    }
    if (order.type === 1) {
      buying_quantity = order.quantity * order.price;
    }
    const currency1 = await this.fetchCurrencyByUserId(order.user_id, order.buying_id);
    const currency2 = await this.fetchCurrencyByUserId(order.user_id, order.selling_id);

    if (order.quantity == 0) {
      throw new BadRequestError(`Please set the amount to be greater than 0`);
    }
    if (Number(currency2[order.selling_id]) <= 0) {
      throw new BadRequestError(`You have ran out of ${order.selling_id}.`);
    }
    if (Number(currency2[order.selling_id]) < selling_quantity) {
      throw new BadRequestError(`Not enough ${order.selling_id} to purchase.`);
    }

    let newWalletAmount1 = Number(currency1[order.buying_id]) + buying_quantity;
    let newWalletAmount2 = Number(currency2[order.selling_id]) - selling_quantity;
    console.log("XXXX", selling_quantity);
    console.log("XXXX", buying_quantity);
    console.log("XXXX", newWalletAmount1);
    console.log("XXXX", newWalletAmount2);
    console.log("XXXX", Number(currency1[order.buying_id]));
    console.log("YYYY", currency2[order.selling_id]);

    //First db.query edits the wallet Table
    const editQuery = ` 
    UPDATE wallet
    SET ${order.buying_id} = $2, ${order.selling_id} =$3
    WHERE user_id = $1;
    `;
    await db.query(editQuery, [order.user_id, newWalletAmount1, newWalletAmount2]);

    const transactionResult = await db.query(
      ` INSERT INTO transactions (user_id, buying_id, buying_quantity, selling_id, selling_quantity  )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, user_id, buying_id, buying_quantity, selling_id, selling_quantity;
      `,
      [order.user_id, order.buying_id, buying_quantity, order.selling_id, selling_quantity]
    );

    const transaction = transactionResult.rows[0];
    console.log("Wallet class->makeTransaction", transaction);
    return transaction;
  }

  static async getTransactionHistory(user_id, buying_id) {
    if (!user_id) {
      throw new BadRequestError(`Missing user_id in request body.`);
    }
    if (!buying_id) {
      throw new BadRequestError(`Missing buying_id in request body.`);
    }

    const resultQuery = ` 
    SELECT * FROM transactions
    WHERE user_id = $1
    AND buying_id = $2
    ORDER BY created_at DESC
    LIMIT 3;
    `;
    const transactionResult = await db.query(resultQuery, [user_id, buying_id]);
    return transactionResult.rows;
  }

  static async getAllTransactions(user_id, buying_id) {
    if (!user_id) {
      throw new BadRequestError(`Missing user_id in request body.`);
    }
    if (!buying_id) {
      throw new BadRequestError(`Missing buying_id in request body.`);
    }

    const resultQuery = ` 
    SELECT * FROM transactions
    WHERE (user_id = $1 AND buying_id = $2)
    OR (user_id = $1 AND selling_id = $2 )
    ORDER BY created_at DESC;
    `;
    const transactionResult = await db.query(resultQuery, [user_id, buying_id]);
    return transactionResult.rows;
  }

  static async resetWallet(user_id){
    if (!user_id) {
      throw new BadRequestError(`Missing user_id in request body.`);
    }


    //First db.query edits the wallet Table
    const editQuery = ` 
    UPDATE wallet
    SET usd = 10000, btc = 0, eth = 0, ada = 0, xmr = 0, doge = 0, dot = 0 
    WHERE user_id = $1;
    `;
    await db.query(editQuery, [user_id]);

    const transaction = await db.query(
      ` DELETE FROM transactions
        WHERE user_id = $1;
      `,
      [user_id]
    );
    console.log('reset Wallet')
    
    const newWallet = await this.fetchWalletByUserId(user_id)
    return newWallet;
  }
  static async resetCustomWallet(user_id, amount){
    if (!user_id) {
      throw new BadRequestError(`Missing user_id in request body.`);
    }


    //First db.query edits the wallet Table
    const editQuery = ` 
    UPDATE wallet
    SET usd = $2, btc = 0, eth = 0, ada = 0, xmr = 0, doge = 0, dot = 0 
    WHERE user_id = $1;
    `;
    await db.query(editQuery, [user_id, Number(amount)]);

    const transaction = await db.query(
      ` DELETE FROM transactions
        WHERE user_id = $1;
      `,
      [user_id]
    );
    console.log('reset Wallet')
    
    const newWallet = await this.fetchWalletByUserId(user_id)
    return newWallet;
  }
}

module.exports = Wallet;
