var express = require("express");
var router = express.Router();
var { createUser, getUser } = require("../db");
var { createAccessToken, passwordHash, verifyPassword } = require("../auth");

router.post("/create", function (req, res) {
  let { username, password } = req.body;
  if (!password || !username) {
    res.statusCode = 400;
    res.send({ success: false, errMsg: "Missing Username/Password" });
    return;
  }
  getUser(username)
    .then((user) => {
      if (user) {
        throw "User already exists";
      } else {
        let password = passwordHash(password);
        return createUser({ username, password });
      }
    })
    .then((val) => {
      if (val) {
        res.send({ success: true });
      }
    })
    .catch((err) => {
      res.statusCode = 400;
      res.send(err);
    });
});

router.post("/login", function (req, res) {
  let { username, password } = req.body;
  if (!password || !username) {
    res.statusCode = 400;
    res.send({ success: false, errMsg: "Missing Username/Password" });
    return;
  }
  getUser(username)
    .then((user) => {
      if (user && verifyPassword(password, user.password)) {
        res.json(createAccessToken({ username: req.body.username }));
      } else {
        res.statusCode = 401;
        res.send({ success: false, errMsg: "Unauthorized User" });
      }
    })
    .catch((err) => res.send(err));
});

module.exports = router;
