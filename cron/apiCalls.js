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
const keyVault = {
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
  KEY48: process.env.APIKEY48,
  KEY49: process.env.APIKEY49,
  KEY50: process.env.APIKEY50,
  KEY51: process.env.APIKEY51,
  KEY52: process.env.APIKEY52,
  KEY53: process.env.APIKEY53,
  KEY54: process.env.APIKEY54,
  KEY55: process.env.APIKEY55,
  KEY56: process.env.APIKEY56,
  KEY57: process.env.APIKEY57,
  KEY58: process.env.APIKEY58,
  KEY59: process.env.APIKEY59,
  KEY60: process.env.APIKEY60,
  KEY61: process.env.APIKEY61,
  KEY62: process.env.APIKEY62,
  KEY63: process.env.APIKEY63,
  KEY64: process.env.APIKEY64,
  KEY65: process.env.APIKEY65,
  KEY66: process.env.APIKEY66,
  KEY67: process.env.APIKEY67,
  KEY68: process.env.APIKEY68,
  KEY69: process.env.APIKEY69,
  KEY70: process.env.APIKEY70,
  KEY71: process.env.APIKEY71,
  KEY72: process.env.APIKEY72,
  KEY73: process.env.APIKEY73,
  KEY74: process.env.APIKEY74,
  KEY75: process.env.APIKEY75,
  KEY76: process.env.APIKEY76,
  KEY77: process.env.APIKEY77,
  KEY78: process.env.APIKEY78,
  KEY79: process.env.APIKEY79,
  KEY80: process.env.APIKEY80,
  KEY81: process.env.APIKEY81,
  KEY82: process.env.APIKEY82,
  KEY83: process.env.APIKEY83,
  KEY84: process.env.APIKEY84,
  KEY85: process.env.APIKEY85,
  KEY86: process.env.APIKEY86,
  KEY87: process.env.APIKEY87,
  KEY88: process.env.APIKEY88,
  KEY89: process.env.APIKEY89,
  KEY90: process.env.APIKEY90,
  KEY91: process.env.APIKEY91,
  KEY92: process.env.APIKEY92,
  KEY93: process.env.APIKEY93,
  KEY94: process.env.APIKEY94,
  KEY95: process.env.APIKEY95,
  KEY96: process.env.APIKEY96,
  KEY97: process.env.APIKEY97,
  KEY98: process.env.APIKEY98,
  KEY99: process.env.APIKEY99,
  KEY100: process.env.APIKEY100,
  KEY101: process.env.APIKEY101,
  KEY102: process.env.APIKEY102,
  KEY103: process.env.APIKEY103,
  KEY104: process.env.APIKEY104,
  KEY105: process.env.APIKEY105,
  KEY106: process.env.APIKEY106,
  KEY107: process.env.APIKEY107,
  KEY108: process.env.APIKEY108,
  KEY109: process.env.APIKEY109,
  KEY110: process.env.APIKEY110,
  KEY111: process.env.APIKEY111,
};

let currentIndex = 0;
let dailyIndex = 0;
let weeklyIndex = 0;
let yearlyIndex = 0;

let currentPriceKeys = [];

for (let e in keyVault) {
  currentPriceKeys.push(keyVault[e]);
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
  return req.data
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

  let period_id = "1HRS";

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
      168 +
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
