const axios = require("axios");
require("dotenv");
const apiKeys = {
  KEY1: process.env.APIKEY1,
  KEY2: process.env.APIKEY2,
  KEY3: process.env.APIKEY3,
  KEY4: process.env.APIKEY4,
  KEY5: process.env.APIKEY5,
  KEY6: process.env.APIKEY6,
  KEY7: process.env.APIKEY7,
  KEY8: process.env.APIKEY8,
  KEY9: process.env.APIKEY9,
  KEY10: process.env.APIKEY10,
  KEY11: process.env.APIKEY11,
  KEY12: process.env.APIKEY12,
  KEY13: process.env.APIKEY13,
  KEY14: process.env.APIKEY14,
  KEY15: process.env.APIKEY15,
  KEY16: process.env.APIKEY16,
  KEY17: process.env.APIKEY17,
  KEY18: process.env.APIKEY18,
};
const currentPriceApiKeys = {
  KEY19: process.env.APIKEY19,
  KEY20: process.env.APIKEY20,
  KEY21: process.env.APIKEY21,
  KEY22: process.env.APIKEY22,
  KEY23: process.env.APIKEY23,
  KEY24: process.env.APIKEY24,
  KEY25: process.env.APIKEY25,
  KEY26: process.env.APIKEY26,
  KEY27: process.env.APIKEY27,
  KEY28: process.env.APIKEY28,
  KEY29: process.env.APIKEY29,
  KEY30: process.env.APIKEY30,
  KEY31: process.env.APIKEY31,
  KEY32: process.env.APIKEY32,
  KEY33: process.env.APIKEY33,
  KEY34: process.env.APIKEY34,
  KEY35: process.env.APIKEY35,
  KEY36: process.env.APIKEY36,
  KEY37: process.env.APIKEY37,
  KEY38: process.env.APIKEY38,
  KEY39: process.env.APIKEY39,
  KEY40: process.env.APIKEY40,
  KEY41: process.env.APIKEY41,
  KEY42: process.env.APIKEY42,
  KEY43: process.env.APIKEY43,
  KEY44: process.env.APIKEY44,
  KEY45: process.env.APIKEY45,
  KEY46: process.env.APIKEY46,
  KEY47: process.env.APIKEY47,
};

let currentIndex = 0;
let dailyIndex = 0;
let weeklyIndex = 0;
let yearlyIndex = 0;

let currentPriceKeys = [];

for (let e in currentPriceApiKeys) {
  currentPriceKeys.push(currentPriceApiKeys[e]);
}

console.log("current", currentPriceKeys);

const getCoinCurrentPrice = async (symbol) => {
  currentIndex++;
  currentIndex = currentIndex % currentPriceKeys.length;
  console.log("currentIndex: ", currentIndex);
  console.log("key used: ", currentPriceKeys[currentIndex]);
  let req = await axios.get(
    "https://rest.coinapi.io/v1/exchangerate/" + symbol + "/USD?apikey=" + currentPriceKeys[currentIndex]
  );

  console.log(symbol + " Current Price: ", req.data.rate);
};

const getCoinDailyPriceHistory = async (symbol) => {
  const keys = [apiKeys.KEY1, apiKeys.KEY2, apiKeys.KEY3, apiKeys.KEY4, apiKeys.KEY5, apiKeys.KEY6]; // change keys to new set (6 needed for 6 coins at every 15 min)

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

  dailyIndex++;
  dailyIndex = dailyIndex % keys.length;
  console.log("key used: ", keys[dailyIndex]);

  let req = await axios.get(
    "https://rest.coinapi.io/v1/exchangerate/" +
      symbol +
      "/USD/history?&time_start=" +
      time_start +
      "&period_id=" +
      period_id +
      "&limit=" +
      96 +
      "&apikey=" +
      keys[dailyIndex]
  );

  console.log(symbol + " Daily: ", req.data);
  return req.data;
};

const getCoinWeeklyPriceHistory = async (symbol) => {
  const keys = [apiKeys.KEY7, apiKeys.KEY8, apiKeys.KEY9, apiKeys.KEY10, apiKeys.KEY11, apiKeys.KEY12]; // change keys to new set (6 needed for 6 coins at every 4 hours)

  const date = new Date();
  date.setDate(date.getDate() - 7);

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

  let period_id = "4HRS";

  weeklyIndex++;
  weeklyIndex = weeklyIndex % keys.length;
  console.log("key used: ", keys[weeklyIndex]);

  let req = await axios.get(
    "https://rest.coinapi.io/v1/exchangerate/" +
      symbol +
      "/USD/history?&time_start=" +
      time_start +
      "&period_id=" +
      period_id +
      "&limit=" +
      42 +
      "&apikey=" +
      keys[weeklyIndex]
  );

  console.log(symbol + " Weekly: ", req.data);
  return req.data;
};

const getCoinYearlyPriceHistory = async (symbol) => {
  const keys = [apiKeys.KEY13, apiKeys.KEY14, apiKeys.KEY15, apiKeys.KEY16, apiKeys.KEY17, apiKeys.KEY18]; // change keys to new set (6 needed for 6 coins at once a day)

  const date = new Date();
  date.setDate(date.getDate() - 365);

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
  let period_id = "1DAY";

  yearlyIndex++;
  yearlyIndex = yearlyIndex % keys.length;
  console.log("key used: ", keys[yearlyIndex]);

  let req = await axios.get(
    "https://rest.coinapi.io/v1/exchangerate/" +
      symbol +
      "/USD/history?&time_start=" +
      time_start +
      "&period_id=" +
      period_id +
      "&limit=" +
      365 +
      "&apikey=" +
      keys[yearlyIndex]
  );

  yearlyIndex++;
  yearlyIndex = yearlyIndex % keys.length;

  console.log(symbol + " Yearly: ", req.data);
  return req.data;
};

module.exports = {
  getCoinCurrentPrice,
  getCoinDailyPriceHistory,
  getCoinWeeklyPriceHistory,
  getCoinYearlyPriceHistory,
};

// DELETE * FROM historical
// data.map((i) => {
// UPDATE historical SET (i.rate_close, i.id, i.time)
// })
