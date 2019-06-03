const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("config");

//@route GET api/currency/symbols
//@desc Get All symbols
//@acess Public

router.get("/symbols", (req, res) => {
  axios
    .get(
      `http://data.fixer.io/api/symbols?access_key=${config.get("fixerAPIKey")}`
    )
    .then(response =>
      res.send({ success: true, symbols: Object.keys(response.data.symbols) })
    )
    .catch(err => res.status(404).json({ success: false }));
});

//@route GET api/currency
//@desc Get All currencies
//@acess Public

router.get("/", (req, res) => {
  axios
    .get(
      `http://data.fixer.io/api/latest?access_key=${config.get("fixerAPIKey")}
      `
    )
    .then(response => res.send(response.data))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
