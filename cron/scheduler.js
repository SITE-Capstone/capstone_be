const cron = require("node-cron");
const Price = require("../models/price");
const apiCall = require("./apiCalls");
const data = require("./data");

const symbols = ["BTC", "ETH", "ADA", "DOGE", "DOT", "XMR"];

module.exports = {
  coinRequestCrons: () => {
    cron.schedule("*/30 * * * * *", async () => {
      // every minute seconds... change to 15 seconds after testing
      data.updateCurrentPriceForAll();
    });
    cron.schedule("*/15 * * * *", async () => {
      // every 15th minute

      data.updatePricesByMinuteForAll();
    });
    cron.schedule("0 */4 * * *", async () => {
      // every 4 hours
      data.updatePricesByHourForAll();
    });
    cron.schedule("0 */12 * * *", async () => {
      // every 12 hours
      data.updatePricesByDayForAll();
    });
  },
};
