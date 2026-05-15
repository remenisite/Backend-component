const { verifyToken } = require("../helpers/utils");

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies;
    if (!token["acc_tkn"]) {
      return res.status(401).send({ error: "Invalid Request" });
    }
    const decoded = verifyToken(token["acc_tkn"]);
    if (!decoded) {
      return res.status(401).send({ error: "Invalid Request" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Invalid Request" });
  }
};

module.exports = authMiddleWare;
