const cron = require("node-cron");
const Price = require("../models/price");
const apiCall = require("./apiCalls");
const data = require("./data");

const symbols = ["BTC", "ETH", "ADA", "DOGE", "DOT", "XMR"];

module.exports = {
  coinRequestCrons: () => {
    cron.schedule("* * * * *", async () => {
      // every minute seconds... change to 15 seconds after testing
      data.updateCurrentPriceForAll();
    });
    cron.schedule("*/15 * * * *", async () => {
      // every 15th minute
      data.updateDailyForAll();
    });
    cron.schedule("0 */4 * * *", async () => {
      // every 4 hours
      data.updateWeeklyForAll();
    });
    cron.schedule("10 17 * * *", async () => {
      // every 12 hours
      data.updateYearlyForAll();
    });
  },
};
