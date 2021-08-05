const { BadRequestError } = require("../utils/errors");
const db = require("../db");

class Price {
  static makePublicPriceData(data) {
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
  console.log(data_id,coin_id, price, table)
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

    data.forEach(async (element, idx) => {
      await this.editSingleNewsData(oldData[idx].id, coin_id, data[idx].title, data[idx].publishedAt, data[idx].source.name, data[idx].url, data[idx].urlToImage)
    })
    
    
    
    const newData = await this.fetchNewsData(coin_id)
    

    return newData;
  }


 
}

module.exports = Price;
