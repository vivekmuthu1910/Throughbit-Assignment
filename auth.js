const jwt = require("jsonwebtoken");
const { getUser } = require("./db");

function createAccessToken(data) {
  return {
    accessToken: jwt.sign(data, process.env.TOKEN_SECRET, {
      expiresIn: "1800s",
    }),
  };
}

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = getUser(user.username);
    next();
  });
}

function passwordHash(password) {
  return password + "somehash";
}

function verifyPassword(password, passwordInDb) {
  return password + "somehash" == passwordInDb;
}
module.exports = {
  createAccessToken,
  verifyAccessToken,
  passwordHash,
  verifyPassword,
};
