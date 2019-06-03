const express = require("express");
const router = express.Router();
const config = require("config");
const axios = require("axios");

//@route GET api/stock
//@desc Get Stock by Date and symbol
//@acess Public

router.get("/", (req, res) => {
  const { date, symbol } = req.body;
  axios
    .get(
      `https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=${symbol}&date=${date}&api_token=${config.get(
        "worldTradingDataAPIKey"
      )}`
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
