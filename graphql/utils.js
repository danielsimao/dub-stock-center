const axios = require("axios");
const config = require("config");

function stockConverter(stock, usd, currency) {
  const entries = Object.entries(stock);
  const final = entries.reduce((acc, currVal) => {
    const [key, value] = currVal;
    acc[key] = (parseFloat(value) * currency) / usd;
    return acc;
  }, {});
  return final;
}

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

module.exports = { stockConverter, getCurrencyRates };
