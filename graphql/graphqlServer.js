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

type Stocks {
    TSLA: Stock, 
    AAPL: Stock,
     MSFT: Stock, 
     AMZN: Stock, 
     CSCO: Stock, 
     INTC: Stock,
     GOOG: Stock, 
     SBUX: Stock, 
     EBAY: Stock, 
     CTXS: Stock
}

  type Query {
    getStock(symbol: String, date: String, currency: String) : Stocks
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

const resolvers = {
  Query: {
    getStock: async (_, { symbol, date, currency }) => {
      const { data } = await axios
        .get(
          `https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=${symbol}&date=${date}&api_token=${config.get(
            "worldTradingDataAPIKey"
          )}`
        )
        .then(response => response.data);

      const { usd, selectedCurr } = await getCurrencyRates(currency);

      data[symbol] = stockConverter(data[symbol], usd, selectedCurr);

      return data;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

module.exports = server;
