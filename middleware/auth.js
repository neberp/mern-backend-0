const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("401 Unauthorized");
  try {
    const jwtSecretKey = process.env.CRUD_APP_JWT_SECRET_KEY;
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("400 Bad Request");
  }
}

module.exports = auth;