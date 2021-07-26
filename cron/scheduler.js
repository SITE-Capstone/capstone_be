const cron = require("node-cron");
const axios = require("axios");

const getCoin = async () => {
  const res = await axios.get(
    "https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?time_end=2021-06-15&period_id=1DAY&limit=365&apikey=95039ECE-7B44-49AC-8230-5BDB3DEBA750"
  );
  console.log(res);
};

module.exports = {
  coinRequestCrons: () => {
    cron.schedule("* * * * * ", async () => {
      console.log("Coin Request Cron...");
      getCoin();
    });
  },
  // hourlyCron: () => {
  //   cron.schedule("*/5 * * * *", () => {
  //     console.log("hourlyChart");
  //   });
  // },
};
