const express = require("express");
const router = express.Router();
const config = require("config");
const axios = require("axios");

//@route GET api/stock
//@desc Get Stock by Date and symbol
//@acess Public

router.get("/", async (req, res) => {
  const { date, symbol, currency } = req.body;

  const { usd, selectedCurr } = await getAllCurrenciesEUR(currency);

  const stockUSD = await getStockValue(symbol, date);

  const stock = stockConverter(stockUSD, usd, selectedCurr);

  res.send({ symbol, currency, stock });
});

async function getStockValue(symbol, date) {
  try {
    const { data } = await axios.get(
      `https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=${symbol}&date=${date}&api_token=${config.get(
        "worldTradingDataAPIKey"
      )}`
    );

    return data.data[symbol].close;
  } catch (e) {
    res.status(404).json({ success: false });
  }
}

async function getAllCurrenciesEUR(currency) {
  try {
    const { data } = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${config.get("fixerAPIKey")}
    `
    );

    return { usd: data.rates["USD"], selectedCurr: data.rates[currency] };
  } catch (e) {
    res.status(404).json({ success: false });
  }
}

function stockConverter(stock, usd, currency) {
  const eur = stock / usd;
  return eur * currency;
}

module.exports = router;
