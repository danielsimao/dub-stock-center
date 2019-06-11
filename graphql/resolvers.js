const { stockConverter, getCurrencyRates } = require("./utils");
const axios = require("axios");
const config = require("config");

module.exports = {
  Query: {
    Stock: async (_, { symbol, date, currency }) => {
      const data = await axios
        .get(
          `https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=${symbol}&date=${date}&api_token=${config.get(
            "worldTradingDataAPIKey"
          )}`
        )
        .then(response => response.data)
        .catch(e => new Error(e));

      if (data.Message) {
        throw new Error(`No data that found on ${symbol} stock in ${date}`);
      } else {
        const { usd, selectedCurr } = await getCurrencyRates(currency);
        const { data: stock } = data;

        return {
          symbol,
          currency,
          date,
          ...stockConverter(stock[symbol], usd, selectedCurr)
        };
      }
    },
    Stocks: async (_, { stocksCurr, date }) => {
      if (!stocksCurr.length)
        return Error("There are no favorites stocks to be displayed");
      const symbolQuery = stocksCurr
        .map(stockCurr => stockCurr.symbol)
        .join(",");

      const data = await axios
        .get(
          `https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=${symbolQuery}&date=${date}&api_token=${config.get(
            "worldTradingDataAPIKey"
          )}`
        )
        .then(response => response.data)
        .catch(e => new Error(e));
      if (data.Message) {
        throw new Error(data.Message);
      } else {
        const { data: stock } = data;

        const stocks = await stocksCurr.map(stockCurr =>
          getCurrencyRates(stockCurr.currency).then(obj => {
            const { _id, symbol, currency } = stockCurr;
            return {
              _id,
              symbol,
              currency,
              ...stockConverter(stock[symbol], obj.usd, obj.selectedCurr)
            };
          })
        );

        return stocks;
      }
    }
  }
};
