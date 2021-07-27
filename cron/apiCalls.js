const axios = require("axios");
require("dotenv");

const KEY1 = process.env.APIKEY1;
const KEY2 = process.env.APIKEY2;
const KEY3 = process.env.APIKEY3;
const KEY4 = process.env.APIKEY4;
const KEY5 = process.env.APIKEY5;
const KEY6 = process.env.APIKEY6;
const KEY7 = process.env.APIKEY7;
const KEY8 = process.env.APIKEY8;
const KEY9 = process.env.APIKEY9;
const KEY10 = process.env.APIKEY10;
const KEY11 = process.env.APIKEY11;
const KEY12 = process.env.APIKEY12;
const KEY13 = process.env.APIKEY13;
const KEY14 = process.env.APIKEY14;
const KEY15 = process.env.APIKEY15;
const KEY16 = process.env.APIKEY16;
const KEY17 = process.env.APIKEY17;
const KEY18 = process.env.APIKEY18;
const KEY19 = process.env.APIKEY19;
const KEY20 = process.env.APIKEY20;
const KEY21 = process.env.APIKEY21;
const KEY22 = process.env.APIKEY22;
const KEY23 = process.env.APIKEY23;
const KEY24 = process.env.APIKEY24;
const KEY25 = process.env.APIKEY25;
const KEY26 = process.env.APIKEY26;
const KEY27 = process.env.APIKEY27;
const KEY28 = process.env.APIKEY28;
const KEY29 = process.env.APIKEY29;
const KEY30 = process.env.APIKEY30;

let currentIndex = 0;
let dailyIndex = 0;
let weeklyIndex = 0;
let yearlyIndex = 0;

const getCoinCurrentPrice = async (symbol) => {
  let keys = [KEY19, KEY20, KEY21, KEY22, KEY23, KEY24, KEY25, KEY26, KEY27, KEY28, KEY29, KEY30];

  console.log("currentIndex: ", currentIndex);
  console.log("key used: ", keys[currentIndex]);
  let req = await axios.get("https://rest.coinapi.io/v1/exchangerate/" + symbol + "/USD?apikey=" + keys[currentIndex]);

  currentIndex++;
  currentIndex = currentIndex % keys.length;

  console.log("BTC Current Price: ", req.data.rate);
};

const getCoinDailyPriceHistory = async (symbol) => {
  const keys = [KEY1, KEY2, KEY3, KEY4, KEY5, KEY6]; // change keys to new set (6 needed for 6 coins at every 15 min)

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

  dailyIndex++;
  dailyIndex = dailyIndex % keys.length;

  console.log("BTC Daily: ", req);
  return req.data;
};

const getCoinWeeklyPriceHistory = async (symbol) => {
  const keys = [KEY7, KEY8, KEY9, KEY10, KEY11, KEY12]; // change keys to new set (6 needed for 6 coins at every 4 hours)

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

  weeklyIndex++;
  weeklyIndex = weeklyIndex % keys.length;

  console.log("BTC Weekly: ", req.data);
  return req.data;
};

const getCoinYearlyPriceHistory = async (symbol) => {
  const keys = [KEY13, KEY14, KEY15, KEY16, KEY17, KEY18]; // change keys to new set (6 needed for 6 coins at once a day)

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

  console.log("BTC Yearly: ", req.data);
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
