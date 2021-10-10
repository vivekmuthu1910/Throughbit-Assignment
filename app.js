var express = require("express");
const rateLimit = require("express-rate-limit");
var cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var coinsRouter = require("./routes/coins");
const { verifyAccessToken } = require("./auth");

const apiRequestLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 2, // limit each IP to 2 requests per windowMs
});

var app = express();

app.use(cors());
app.use(apiRequestLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/config", verifyAccessToken, coinsRouter);

module.exports = app;
