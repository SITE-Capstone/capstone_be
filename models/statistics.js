const { BadRequestError } = require("../utils/errors");
const axios = require("axios");
const db = require("../db");

const geckoBaseUrl = "https://api.coingecko.com/api/v3";

class Statistics {
  static makePublicStatisticsData(data) {
    return data;
  }
  
    static async fetchStatistics(coin_id) {
      if (!coin_id) {
        throw new BadRequestError("No coin_id provided");
      }
  
      const query = `SELECT * FROM statistics WHERE coin_id = $1`;
  
      const result = await db.query(query, [coin_id]);
  
      const statistics = result.rows;


      return statistics;
    }


    static async fetchAllStatistics(){
  
      const query = `SELECT * FROM statistics`;
  
      const result = await db.query(query);
  
      const statistics = result.rows;
  
      return statistics;
    }





  static async editSingleStatistics(data_id, coin_id, volume, market_cap, supply){
  if (!data_id) {
    throw new BadRequestError(`Missing data_id in edit data.`);
  }
  if (!coin_id) {
    throw new BadRequestError(`Missing coin_id in edit data.`);
  }
  if (!volume) {
    throw new BadRequestError(`Missing volume in edit data.`);
  }
  if (!market_cap) {
    throw new BadRequestError(`Missing market_cap in edit data.`);
  }
  if (!supply) {
    throw new BadRequestError(`Missing supply in edit data.`);
  }
  //First db.query edits the wallet Table
  const editQuery =
  ` 
  UPDATE statistics
  SET coin_id = $2, volume = $3, market_cap = $4, supply = $5
  WHERE id = $1;
  `;
  await db.query(editQuery, [data_id, coin_id, volume, market_cap, supply]);
  }

  

  static async editStatistics(data, coin_id){

    const oldData = await this.fetchStatistics(coin_id)
    // console.log("MMMMM", data)
      await this.editSingleStatistics(oldData[0].id, coin_id, data.total_volume, data.market_cap,data.circulating_supply)

    
    const newData = await this.fetchStatistics(coin_id)
    console.log(newData)
    

    return newData;
  }



  static async geckoRequest({ endpoint, method = "GET", data = {} }) {
    const url = geckoBaseUrl + endpoint;
    console.log("URL:", url);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (err) {
      console.error({ errorResponse: err.response });
      const message = err?.response?.data?.error?.message;

      return { data: null, error: message || err || "Error" };
    }
  }

  static async getCoinStatistics(){
    let endpoint='/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    let req = await this.geckoRequest({endpoint:endpoint, method: "GET" })
    return req
    }





  static async refreshCoinStatistics(symbol, data){
    data.data.forEach((element) => {
        if (element.symbol === symbol.toLowerCase()) {this.editStatistics(element, symbol)}
    })
  }


  static async refreshAllStatistics(){
    const data = await this.getCoinStatistics()
    await this.refreshCoinStatistics("btc", data)
    await this.refreshCoinStatistics("eth", data)
    await this.refreshCoinStatistics("doge", data)
    await this.refreshCoinStatistics("xmr",data)
    await this.refreshCoinStatistics("ada", data)
    await this.refreshCoinStatistics("dot", data)
  };


 
}

module.exports = Statistics;
