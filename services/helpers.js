const jwt = require("jsonwebtoken");
const generateAccTkn = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SEC,
    { expiresIn: "1h" },
  );
};
const generateRefTkn = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SEC,
    { expiresIn: "15d" },
  );
};

const verifyToken = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.JWT_SEC);
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = { generateAccTkn, generateRefTkn, verifyToken };