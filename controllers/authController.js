const { generateAccessToken, generateRefreshToken } = require("../helpers/utils");
const userSchema = require("../models/userSchema");

const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName)
      return res.status(400).send({ message: "FullName is required." });
    if (!email) return res.status(400).send({ message: "Email is required." });
    if (!password)
      return res.status(400).send({ message: "Password is required." });

    const existEmail = await userSchema.findOne({ email });
    if (existEmail)
      return res.status(400).send({ message: "This email already exist." });
    const user = userSchema.create({
      fullName,
      email,
      password,
    });
    res.status(200).send({ message: "Registration successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error." });
  }
};

const cookie_config = {
  httpOnly: false, // Not accessible by client-side JS
  secure: false, // Only sent over HTTPS
  // sameSite: 'Strict' // Only send for same-site requests
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await userSchema.findOne({ email }).select("+password");

    if (!userData)
      return res.status(400).send({ message: "Invalid crediential" });
    if (userData.isVerified === false)
      return res.status(400).send({ message: "Email is not verified" });

    const matchPassword = await userData.comparePassword(password);
    if (!matchPassword)
      return res.status(400).send({ message: "Invalid crediential" });
    const accToken = generateAccessToken(userData);
    const refToken = generateRefreshToken(userData);
    res
      .status(200)
      .cookie("acc_tkn", accToken, cookie_config)
      .cookie("ref_tkn", refToken, cookie_config)
      .send({ message: "Login Successfylly" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error." });
  }
};

module.exports = { signUp, signIn };