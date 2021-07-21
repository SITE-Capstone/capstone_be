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
    let buying_quantity=order.quantity
    let selling_quantity=order.quantity
    if (order.type===0){
      selling_quantity=Math.floor(order.quantity*order.price)
    }    
    if (order.type===1){

      buying_quantity=Math.floor(order.quantity*order.price)
    }    
    const currency1 = await this.fetchCurrencyByUserId(order.user_id, order.buying_id)
    const currency2 = await this.fetchCurrencyByUserId(order.user_id, order.selling_id)

    console.log("140",order.selling_id, currency2[order.selling_id],"->", order.buying_id, currency1[order.buying_id])
    
    
    if(currency2[order.selling_id]<selling_quantity){
      throw new BadRequestError(`Not enough ${order.selling_id} to purchase.`);
    }

    let newWalletAmount1=buying_quantity+currency1[order.buying_id]
    let newWalletAmount2=currency2[order.selling_id]-selling_quantity
    console.log("#149 Wallet.js",order.buying_id,":", currency1[order.buying_id],"->", newWalletAmount1)
    console.log("#150 Wallet.js",order.selling_id,":", currency2[order.selling_id],"->", newWalletAmount2)
    //First db.query edits the wallet Table
    const editQuery =
    ` 
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
    console.log("#166 Wallet class->makeTransaction", transaction)
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
