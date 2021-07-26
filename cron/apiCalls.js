const axios = require("axios");

const KEY1 = "C1999507-70F4-4B96-B851-FE72BC163CE7";
const KEY2 = "95039ECE-7B44-49AC-8230-5BDB3DEBA750";
const KEY3 = "52043F42-E4F5-4F7D-ADE5-FFA1496597F5";
const KEY4 = "BFBE77CB-2B01-43CC-B801-A9D7D2681D00";
const KEY5 = "3BF04A19-040D-4C36-BA32-C9788DAE96EF";
const KEY6 = "CB845B99-DD19-4417-AFC4-651B6E547AF7";

let currentIndex = 0;
let dailyIndex = 0;
let weeklyIndex = 0;
let yearlyIndex = 0;

const getCoinCurrentPrice = async (symbol) => {
  let keys = [KEY1, KEY2, KEY3, KEY4, KEY5, KEY6];
  console.log("from apiCall..");
  console.log("currentIndex: ", currentIndex);
  console.log("key used before: ", keys[currentIndex]);
  let req = await axios.get("https://rest.coinapi.io/v1/exchangerate/" + symbol + "/USD?apikey=" + keys[currentIndex]);

  console.log("key used: ", keys[currentIndex]);
  currentIndex++;
  currentIndex = currentIndex % keys.length;

  console.log("BTC Price: ", req.data.rate);
};

const getCoinDailyPriceHistory = async (symbol) => {
  const keys = [KEY1, KEY2, KEY3, KEY4, KEY5, KEY6]; // change keys to new set (12 needed for 6 coins at every 15 min)

  const date = new Date();
  date.setDate(date.getDate() - 1);

  let monthConnector = "-";
  let dayConnector = "-";
  if (date.getMonth() < 10) {
    monthConnector = "-0";
  }
  if (date.getDate() < 10) {
    dayConnector = "-0";
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let time_start = "" + year + monthConnector + month + dayConnector + day;

  let period_id = "15MIN";
  let req = await axios.get(
    "https://rest.coinapi.io/v1/exchangerate/" +
      symbol +
      "/USD/history?&time_start=" +
      time_start +
      "&period_id=" +
      period_id +
      "&limit=" +
      48 +
      "&apikey=" +
      keys[dailyIndex]
  );
  console.log(req);
};

module.exports = {
  getCoinCurrentPrice,
  getCoinDailyPriceHistory,
};

// DELETE * FROM historical
// data.map((i) => {
// UPDATE historical SET (i.rate_close, i.id, i.time)
// })
