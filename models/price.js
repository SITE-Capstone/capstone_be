const { BadRequestError } = require("../utils/errors");
const db = require("../db");

class Price {
  static makePublicPriceData(data) {
    return data;
  }

  // Creates a wallet
  static async insertSingleData(coin_id, time, price, table) {

    if (!coin_id) {
      throw new BadRequestError(`Missing coin_id in request data.`);
    }
    if (!time) {
      throw new BadRequestError(`Missing time in request data.`);
    }
    if (!price) {
      throw new BadRequestError(`Missing price in request data.`);
    }


    const dataResult = await db.query(
      ` INSERT INTO ${table} (coin_id, price, time)
        VALUES ($1, $2, $3)
        RETURNING coin_id, price, time
      `,
      [coin_id, price, time]
    );

    const data = dataResult.rows[0];
    console.log("Price class $",coin_id, price, time);
    return data;
  }

  static async insertData(data, table, coin_id) {
    if (!data) {
      throw new BadRequestError(`Missing data in Insert Data.`);
    }
    if (!coin_id) {
      throw new BadRequestError(`Missing coin_id in Insert data.`);
    }
    if (!table) {
      throw new BadRequestError(`Missing table in Insert Data.`);
    }
    //Tables:
    // 1: prices_by_day  
    // 2: prices_by_hour 
    // 3: prices_by_minute 
    // 4: current_price
    if (table!="current_price"){
      data.forEach((element) => {
        this.insertSingleData(coin_id, element.time_close, element.rate_close, table)
      })
    }else{
      this.insertSingleData(coin_id, data.time, data.rate, table)
    }
  }

  


  // fetches the wallet with the user_id
  static async fetchCoinData(coin_id, table) {
    if (!coin_id) {
      throw new BadRequestError("No coin_id provided");
    }

    const query = `SELECT * FROM ${table} WHERE coin_id = $1`;

    const result = await db.query(query, [coin_id]);

    const coinData = result.rows;

    return Price.makePublicPriceData(coinData);
  }


  static async editSingleCoinData(data_id, coin_id, price, time, table){
  if (!data_id) {
    throw new BadRequestError(`Missing data_id in edit data.`);
  }
  if (!coin_id) {
    throw new BadRequestError(`Missing coin_id in edit data.`);
  }
  if (!time) {
    throw new BadRequestError(`Missing time in edit data.`);
  }
  if (!price) {
    throw new BadRequestError(`Missing price in edit data.`);
  }
  //First db.query edits the wallet Table
  const editQuery =
  ` 
  UPDATE ${table}
  SET coin_id = $2, price = $3, time = $4
  WHERE id = $1;
  `;
  await db.query(editQuery, [data_id, coin_id, price, time]);
  }


  
  
  static async editCoinData(data,table, coin_id){


    const oldData = this.fetchCoinData(coin_id, table)

    if (table!="current_price"){
      data.forEach((element, idx) => {
        editSingleCoin(oldData[idx].id, coin_id, element.price, element.time, table)
      })
    }else{
      const editQuery =
      ` 
      UPDATE ${table}
      SET price = $2, time = $3
      WHERE coin_id= $1;
      `;
      await db.query(editQuery, [ coin_id, data.rate, data.time]);
    }
    
    
    const newData = await this.fetchCoinData(coin_id, table)
    

    console.log("Coin class->edit Coin Data", newData)
    return newData;
  }



}

module.exports = Price;
