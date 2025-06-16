const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { errorHandler } = require("../utils/errors");
const { UNAUTHORIZED } = require("../utils/errorCodes");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return errorHandler(res)({
      name: "UserUnauthorized",
      statusCode: UNAUTHORIZED,
    });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return errorHandler(res)({
      name: "UserUnauthorized",
      statusCode: UNAUTHORIZED,
    });
  }

  req.user = payload;

  next();
};

module.exports = { auth };
