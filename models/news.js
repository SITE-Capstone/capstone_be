const { BadRequestError } = require("../utils/errors");
const axios = require("axios");
const db = require("../db");

const NEWS_API_KEY = '51e6567c15a042dda68b3f712e6937d8';
const newsBaseUrl = "https://newsapi.org";

class News {
  static makePublicNewsData(data) {
    return data;
  }
  
    static async fetchNewsData(coin_id) {
      if (!coin_id) {
        throw new BadRequestError("No coin_id provided");
      }
  
      const query = `SELECT * FROM news_articles WHERE coin_id = $1 ORDER BY time DESC`;
  
      const result = await db.query(query, [coin_id]);
  
      const newsData = result.rows;


      return newsData;
    }


    static async fetchAllNewsData(){
  
      const query = `SELECT * FROM news_articles`;
  
      const result = await db.query(query);
  
      const newsData = result.rows;
  
      return newsData;
    }





  static async editSingleNewsData(data_id, coin_id, headline, time, source, url, image_url){
  if (!data_id) {
    throw new BadRequestError(`Missing data_id in edit data.`);
  }
  if (!coin_id) {
    throw new BadRequestError(`Missing coin_id in edit data.`);
  }
  if (!headline) {
    throw new BadRequestError(`Missing headline in edit data.`);
  }
  if (!time) {
    throw new BadRequestError(`Missing time in edit data.`);
  }
  if (!source) {
    throw new BadRequestError(`Missing source in edit data.`);
  }
  if (!url) {
    throw new BadRequestError(`Missing url in edit data.`);
  }
  if (!image_url) {
    throw new BadRequestError(`Missing image_url in edit data.`);
  }
  //First db.query edits the wallet Table
  const editQuery =
  ` 
  UPDATE news_articles
  SET coin_id = $2, headline = $3, time = $4, source = $5, url = $6, image_url = $7
  WHERE id = $1;
  `;
  await db.query(editQuery, [data_id, coin_id, headline, time, source, url, image_url]);
  }

  

  static async editNewsData(data, coin_id){

    const oldData = await this.fetchNewsData(coin_id)
    console.log("XXXXX", data)
    data.forEach(async (element, idx) => {
      await this.editSingleNewsData(oldData[idx].id, coin_id, data[idx].title, data[idx].publishedAt, data[idx].source.name, data[idx].url, data[idx].urlToImage)
    })
    
    
    
    const newData = await this.fetchNewsData(coin_id)
    console.log(newData)
    

    return newData;
  }


  static async newsRequest({ endpoint, method = "GET", data = {} }) {
    const url = newsBaseUrl + endpoint + NEWS_API_KEY;
    console.log("NEWSURL:", url);

    try {
      const res = await axios({ url, method });
      let response;
      // console.log("#246 TEST", res.data);
      if (res.data === null) {
        console.log("#80 ApiClient.js Error:", res);
        setTimeout(async function () {
          const url2 = this.newsBaseUrl + endpoint + NEWS_API_KEY;
          const res2 = await axios({ url2, method });
          if (res2.data === null) {
            console.log("#85 ApiClient.js Error:", res2);
          } else {
            response = res2;
          }
        }, 3000);
      } else {
        response = res;
      }
      return { data: response.data, error: null };
    } catch (err) {
      console.error({ errorResponse: err.response });
      const message = err?.response?.data?.error?.message;
      return { data: null, error: message || err || "Error" };
    }
  };

  static async getCoinNews (symbol, name) {
    let pageSize = "5";
    let sortBy = "publishedAt"; //"publishedAt" || "relevancy"
    let language = "en";
    let endpoint =
      "/v2/everything?q=" +
      name +
      " AND " +
      symbol +
      "&pageSize=" +
      pageSize +
      "&sortBy=" +
      sortBy +
      "&language=" +
      language +
      "&apiKey=";

    let req = await this.newsRequest({ endpoint: endpoint, method: "GET" });
    return req;
  }





  static async refreshCoinNewsData(symbol, name){
    const data = await this.getCoinNews(symbol, name)
    await this.editNewsData(data.data.articles, symbol)
  }


  static async refreshAllNewsData(){
    await this.refreshCoinNewsData("btc", 'bitcoin')
    await this.refreshCoinNewsData("eth", 'ethereum')
    await this.refreshCoinNewsData("doge", 'dogecoin')
    await this.refreshCoinNewsData("xmr", 'monero')
    await this.refreshCoinNewsData("ada", 'cardano')
    await this.refreshCoinNewsData("dot", 'polkadot')
  };


 
}

module.exports = News;
