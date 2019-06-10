const { GraphQLServer } = require("graphql-yoga");
const axios = require("axios");
const config = require("config");

const typeDefs = `
  type Stock {
    open: Float!
    close: Float!
    high: Float!
    low: Float!
    volume: Float!
  }



  type Query {
    Stock(symbol: String, date: String, currency: String): Stock
    Stocks(symbol: [String], date: String, currency: String): [Stock]
  }
`;

async function getCurrencyRates(currency) {
  try {
    const { data } = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${config.get("fixerAPIKey")}
      `
    );
    return { usd: data.rates["USD"], selectedCurr: data.rates[currency] };
  } catch (e) {
    throw new Error("Invalid Currency");
  }
}

function stockConverter(stock, usd, currency) {
  const entries = Object.entries(stock);
  const final = entries.reduce((acc, currVal) => {
    const [key, value] = currVal;
    acc[key] = (parseFloat(value) * currency) / usd;
    return acc;
  }, {});
  return final;
}
//TODO: Handle no data found
const resolvers = {
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

        stock[symbol] = stockConverter(stock[symbol], usd, selectedCurr);

        return data.data[symbol];
      }
    },
    Stocks: async (_, { symbol, date, currency }) => {
      if (!symbol.length)
        throw Error("There are no favorites stocks to be displayed");

      const data = await axios
        .get(
          `https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=${
            symbol[0]
          },${symbol[1] ? symbol[1] : ""}&date=${date}&api_token=${config.get(
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

        stock[symbol] = stockConverter(stock[symbol], usd, selectedCurr);

        return data.data[symbol];
      }
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

module.exports = server;
