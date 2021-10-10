var express = require("express");
var router = express.Router();

router.get("/ping", function (req, res, next) {
  res.send("pong");
});

router.get("/add/:a/:b", function (req, res, next) {
  try {
    let a = parseInt(req.params.a);
    let b = parseInt(req.params.b);
    res.send({ ...req.params, ans: a + b });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
