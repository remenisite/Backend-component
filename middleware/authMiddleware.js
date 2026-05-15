const { VerifyTkn } = require("../services/helpers");
const { responseHandler } = require("../utils/responseHandler");

const authMiddleWare = (async = (req, res, next) => {
  try {
    const token = req.cookies;
    if (!token["R-XS-Token"])
      return responseHandler.error(res, 401, "Invalid Request");
    const decoded = VerifyTkn(token["R-XS-Token"]);
    if (!decoded) return responseHandler.error(res, 401, "Invalid Request");

    req.user = decoded;

    next();
  } catch (error) {
    responseHandler.error(res,401,"Internal Server Error")
  }
});

module.exports = authMiddleWare;