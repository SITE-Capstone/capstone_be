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
<<<<<<< HEAD

      data.updatePricesByMinuteForAll();
=======
      data.updateDailyForAll();
>>>>>>> 123f4a640178b2dcb7d30edbd85c37bfe56db0c5
    });
    cron.schedule("0 */4 * * *", async () => {
      // every 4 hours
      data.updatePricesByHourForAll();
    });
    cron.schedule("10 17 * * *", async () => {
      // every 12 hours
      data.updatePricesByDayForAll()
    });
  },
};
