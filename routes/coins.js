var express = require("express");
var { getCoin, putCoin, getAllCoins, postCoin } = require("../db");

var router = express.Router();

router.get("/", function (req, res) {
  getAllCoins()
    .then((coins) => res.send(coins))
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send(err);
    });
});

router.post("/", function (req, res) {
  postCoin(req.body)
    .then((val) => console.log(val))
    .then(() => getCoin(req.body.name))
    .then((coin) => res.send({ success: true, data: coin }))
    .catch((err) => {
      res.statusCode = 400;
      res.send({ success: false, errMsg: err });
    });
});

router.get("/:coin", function (req, res) {
  getCoin(req.params.coin).then((coin) => {
    res.send(coin);
  });
});

router.post("/:coin", function (req, res) {
  putCoin(req.params.coin, req.body)
    .then(() => getCoin(req.params.coin))
    .then((coin) => res.send({ success: true, data: coin }))
    .catch(() => res.send({ success: false }));
});
module.exports = router;
