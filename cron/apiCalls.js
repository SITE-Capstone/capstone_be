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
  KEY112: process.env.APIKEY112,
  KEY113: process.env.APIKEY113,
  KEY114: process.env.APIKEY114,
  KEY115: process.env.APIKEY115,
  KEY116: process.env.APIKEY116,
  KEY117: process.env.APIKEY117,
  KEY118: process.env.APIKEY118,
  KEY119: process.env.APIKEY119,
  KEY120: process.env.APIKEY120,
  KEY121: process.env.APIKEY121,
  KEY122: process.env.APIKEY122,
  KEY123: process.env.APIKEY123,
  KEY124: process.env.APIKEY124,
  KEY125: process.env.APIKEY125,
  KEY126: process.env.APIKEY126,
  KEY127: process.env.APIKEY127,
  KEY128: process.env.APIKEY128,
  KEY129: process.env.APIKEY129,
  KEY130: process.env.APIKEY130,
  KEY131: process.env.APIKEY131,
  KEY132: process.env.APIKEY132,
  KEY133: process.env.APIKEY133,
  KEY134: process.env.APIKEY134,
  KEY135: process.env.APIKEY135,
  KEY136: process.env.APIKEY136,
  KEY137: process.env.APIKEY137,
  KEY138: process.env.APIKEY138,
  KEY139: process.env.APIKEY139,
  KEY140: process.env.APIKEY140,
  KEY141: process.env.APIKEY141,
  KEY142: process.env.APIKEY142,
  KEY143: process.env.APIKEY143,
  KEY144: process.env.APIKEY144,
  KEY145: process.env.APIKEY145,
  KEY146: process.env.APIKEY146,
  KEY147: process.env.APIKEY147,
  KEY148: process.env.APIKEY148,
  KEY149: process.env.APIKEY149,
  KEY150: process.env.APIKEY150,
  KEY151: process.env.APIKEY151,
  KEY152: process.env.APIKEY152,
  KEY153: process.env.APIKEY153,
  KEY154: process.env.APIKEY154,
  KEY155: process.env.APIKEY155,
  KEY156: process.env.APIKEY156,
  KEY157: process.env.APIKEY157,
  KEY158: process.env.APIKEY158,
  KEY159: process.env.APIKEY159,
  KEY160: process.env.APIKEY160,
  KEY161: process.env.APIKEY161,
  KEY162: process.env.APIKEY162,
  KEY163: process.env.APIKEY163,
  KEY164: process.env.APIKEY164,
  KEY165: process.env.APIKEY165,
  KEY166: process.env.APIKEY166,
  KEY167: process.env.APIKEY167,
  KEY168: process.env.APIKEY168,
  KEY169: process.env.APIKEY169,
  KEY170: process.env.APIKEY170,
  KEY171: process.env.APIKEY171,
  KEY172: process.env.APIKEY172,
  KEY173: process.env.APIKEY173,
  KEY174: process.env.APIKEY174,
  KEY175: process.env.APIKEY175,
  KEY176: process.env.APIKEY176,
  KEY177: process.env.APIKEY177,
  KEY178: process.env.APIKEY178,
  KEY179: process.env.APIKEY179,
  KEY180: process.env.APIKEY180,
  KEY181: process.env.APIKEY181,
  KEY182: process.env.APIKEY182,
  KEY183: process.env.APIKEY183,
  KEY184: process.env.APIKEY184,
  KEY185: process.env.APIKEY185,
  KEY186: process.env.APIKEY186,
  KEY187: process.env.APIKEY187,
  KEY188: process.env.APIKEY188,
  KEY189: process.env.APIKEY189,
  KEY190: process.env.APIKEY190,
  KEY191: process.env.APIKEY191,
  KEY192: process.env.APIKEY192,
  KEY193: process.env.APIKEY193,
  KEY194: process.env.APIKEY194,
  KEY195: process.env.APIKEY195,
  KEY196: process.env.APIKEY196,
  KEY197: process.env.APIKEY197,
  KEY198: process.env.APIKEY198,
  KEY199: process.env.APIKEY199,
  KEY200: process.env.APIKEY200,
  KEY201: process.env.APIKEY201,
  KEY202: process.env.APIKEY202,
  KEY203: process.env.APIKEY203,
  KEY204: process.env.APIKEY204,
  KEY205: process.env.APIKEY205,
  KEY206: process.env.APIKEY206,
  KEY207: process.env.APIKEY207,
  KEY208: process.env.APIKEY208,
  KEY209: process.env.APIKEY209,
  KEY210: process.env.APIKEY210,
  KEY211: process.env.APIKEY211,
  KEY212: process.env.APIKEY212,
  KEY213: process.env.APIKEY213,
  KEY214: process.env.APIKEY214,
  KEY215: process.env.APIKEY215,
  KEY216: process.env.APIKEY216,
  KEY217: process.env.APIKEY217,
  KEY218: process.env.APIKEY218,
  KEY219: process.env.APIKEY219,
  KEY220: process.env.APIKEY220,
  KEY221: process.env.APIKEY221,
  KEY222: process.env.APIKEY222,
  KEY223: process.env.APIKEY223,
  KEY224: process.env.APIKEY224,
  KEY225: process.env.APIKEY225,
  KEY226: process.env.APIKEY226,
  KEY227: process.env.APIKEY227,
  KEY228: process.env.APIKEY228,
  KEY229: process.env.APIKEY229,
  KEY230: process.env.APIKEY230,
  KEY231: process.env.APIKEY231,
  KEY232: process.env.APIKEY232,
  KEY233: process.env.APIKEY233,
  KEY234: process.env.APIKEY234,
  KEY235: process.env.APIKEY235,
  KEY236: process.env.APIKEY236,
  KEY237: process.env.APIKEY237,
  KEY238: process.env.APIKEY238,
  KEY239: process.env.APIKEY239,
  KEY240: process.env.APIKEY240,
  KEY241: process.env.APIKEY241,
  KEY242: process.env.APIKEY242,
  KEY243: process.env.APIKEY243,
  KEY244: process.env.APIKEY244,
  KEY245: process.env.APIKEY245,
  KEY246: process.env.APIKEY246,
  KEY247: process.env.APIKEY247,
  KEY248: process.env.APIKEY248,
  KEY249: process.env.APIKEY249,
  KEY250: process.env.APIKEY250,
  KEY251: process.env.APIKEY251,
  KEY252: process.env.APIKEY252,
  KEY253: process.env.APIKEY253,
  KEY254: process.env.APIKEY254,
  KEY255: process.env.APIKEY255,
  KEY256: process.env.APIKEY256,
  KEY257: process.env.APIKEY257,
  KEY258: process.env.APIKEY258,
  KEY259: process.env.APIKEY259,
  KEY260: process.env.APIKEY260,
  KEY261: process.env.APIKEY261,
  KEY262: process.env.APIKEY262,
  KEY263: process.env.APIKEY263,
  KEY264: process.env.APIKEY264,
  KEY265: process.env.APIKEY265,
  KEY266: process.env.APIKEY266,
  KEY267: process.env.APIKEY267,
  KEY268: process.env.APIKEY268,
  KEY269: process.env.APIKEY269,
  KEY270: process.env.APIKEY270,
  KEY271: process.env.APIKEY271,
  KEY272: process.env.APIKEY272,
  KEY273: process.env.APIKEY273,
  KEY274: process.env.APIKEY274,
  KEY275: process.env.APIKEY275,
  KEY276: process.env.APIKEY276,
  KEY277: process.env.APIKEY277,
  KEY278: process.env.APIKEY278,
  KEY279: process.env.APIKEY279,
  KEY280: process.env.APIKEY280,
  KEY281: process.env.APIKEY281,
  KEY282: process.env.APIKEY282,
  KEY283: process.env.APIKEY283,
  KEY284: process.env.APIKEY284,
  KEY285: process.env.APIKEY285,
  KEY286: process.env.APIKEY286,
  KEY287: process.env.APIKEY287,
  KEY288: process.env.APIKEY288,
  KEY289: process.env.APIKEY289,
  KEY290: process.env.APIKEY290,
  KEY291: process.env.APIKEY291,
  KEY292: process.env.APIKEY292,
  KEY293: process.env.APIKEY293,
  KEY294: process.env.APIKEY294,
  KEY295: process.env.APIKEY295,
  KEY296: process.env.APIKEY296,
  KEY297: process.env.APIKEY297,
  KEY298: process.env.APIKEY298,
  KEY299: process.env.APIKEY299,
  KEY300: process.env.APIKEY300,
  KEY301: process.env.APIKEY301,
  KEY302: process.env.APIKEY302,
  KEY303: process.env.APIKEY303,
  KEY304: process.env.APIKEY304,
  KEY305: process.env.APIKEY305,
  KEY306: process.env.APIKEY306,
  KEY307: process.env.APIKEY307,
  KEY308: process.env.APIKEY308,
  KEY309: process.env.APIKEY309,
  KEY310: process.env.APIKEY310,
  KEY311: process.env.APIKEY311,
  KEY312: process.env.APIKEY312,
  KEY313: process.env.APIKEY313,
  KEY314: process.env.APIKEY314,
  KEY315: process.env.APIKEY315,
  KEY316: process.env.APIKEY316,
  KEY317: process.env.APIKEY317,
  KEY318: process.env.APIKEY318,
  KEY319: process.env.APIKEY319,
  KEY320: process.env.APIKEY320,
  KEY321: process.env.APIKEY321,
  KEY322: process.env.APIKEY322,
  KEY323: process.env.APIKEY323,
  KEY324: process.env.APIKEY324,
  KEY325: process.env.APIKEY325,
  KEY326: process.env.APIKEY326,
  KEY327: process.env.APIKEY327,
  KEY328: process.env.APIKEY328,
  KEY329: process.env.APIKEY329,
  KEY330: process.env.APIKEY330,
  KEY331: process.env.APIKEY331,
  KEY332: process.env.APIKEY332,
  KEY333: process.env.APIKEY333,
  KEY334: process.env.APIKEY334,
  KEY335: process.env.APIKEY335,
  KEY336: process.env.APIKEY336,
  KEY337: process.env.APIKEY337,
  KEY338: process.env.APIKEY338,
  KEY339: process.env.APIKEY339,
  KEY340: process.env.APIKEY340,
  KEY341: process.env.APIKEY341,
  KEY342: process.env.APIKEY342,
  KEY343: process.env.APIKEY343,
  KEY344: process.env.APIKEY344,
  KEY345: process.env.APIKEY345,
  KEY346: process.env.APIKEY346,
  KEY347: process.env.APIKEY347,
  KEY348: process.env.APIKEY348,
  KEY349: process.env.APIKEY349,
  KEY350: process.env.APIKEY350,
  KEY351: process.env.APIKEY351,
  KEY352: process.env.APIKEY352,
  KEY353: process.env.APIKEY353,
  KEY354: process.env.APIKEY354,
  KEY355: process.env.APIKEY355,
  KEY356: process.env.APIKEY356,
  KEY357: process.env.APIKEY357,
  KEY358: process.env.APIKEY358,
  KEY359: process.env.APIKEY359,
  KEY360: process.env.APIKEY360,
  KEY361: process.env.APIKEY361,
  KEY362: process.env.APIKEY362,
  KEY363: process.env.APIKEY363,
  KEY364: process.env.APIKEY364,
  KEY365: process.env.APIKEY365,
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
  return req.data;
};

const getCoinDailyPriceHistory = async (symbol) => {
  const keys = [apiKeys.KEY1, apiKeys.KEY2, apiKeys.KEY3, apiKeys.KEY4, apiKeys.KEY5, apiKeys.KEY6]; // change keys to new set (6 needed for 6 coins at every 15 min)

  const date = new Date();
  date.setTime(date.getTime() - (61 * 60 * 1000 + (date.getTime() % 60000)));
  let time_start = date.toISOString();

  let period_id = "1MIN";

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
      60 +
      "&apikey=" +
      keys[dailyIndex]
  );

  console.log(symbol + " Daily: ");
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
  let day = date.getDate()+1;
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

  console.log(symbol + " Weekly: ");
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
  let day = date.getDate()+1;
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

  console.log(symbol + " Yearly: ");
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
