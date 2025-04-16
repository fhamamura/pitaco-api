const jwt = require("jsonwebtoken");
require("dotenv").config();

function gerarToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

module.exports = gerarToken;
