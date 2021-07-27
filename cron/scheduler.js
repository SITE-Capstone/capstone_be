const cron = require("node-cron");
const apiCall = require("./apiCalls");

module.exports = {
  coinRequestCrons: () => {
    cron.schedule("*/5 * * * * *", async () => {
      // every 5 seconds
      apiCall.getCoinCurrentPrice("BTC");
    });
    cron.schedule("*/15 * * * *", async () => {
      // every 15th minute
      apiCall.getCoinDailyPriceHistory("BTC");
    });
    cron.schedule("0 */4 * * *", async () => {
      // every 4 hours
      apiCall.getCoinWeeklyPriceHistory("BTC");
    });
  },
  // hourlyCron: () => {
  //   cron.schedule("*/5 * * * *", () => {
  //     console.log("hourlyChart");
  //   });
  // },
};
