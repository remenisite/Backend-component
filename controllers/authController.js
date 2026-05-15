const {
  generateAccTkn,
  generateRefTkn,
  verifyToken,
} = require("../services/helpers");
const { responseHandler } = require("../services/responseHandler");

// ---------------- Signup ----------------
const signup = async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;

    if (!email) return responseHandler.error(res, 400, "Email is required");
    if (!isvelidEmail(email))
      return responseHandler.error(res, 400, "Invalid email");
    if (!password)
      return responseHandler.error(res, 400, "Password is required");
    if (!isvalidPassword(password))
      return responseHandler.error(res, 400, "Invalid password");

    const existingUser = await userSchema.findOne({ email });
    if (existingUser)
      return responseHandler.error(
        res,
        400,
        "User already exists with this email",
      );

    const otp = generateOTP();
    const user = new userSchema({
      fullName,
      email,
      password,
      phone,
      address,
      otp,
      otpExpires: Date.now() + 2 * 60 * 1000, // 2 mins
    });

    await user.save();

    await sendEmail({
      email,
      subject: "Verify Your Email",
      otp,
      template: emailTemplate,
    });

    responseHandler.success(
      res,
      201,
      "Signup successful. Please verify your email.",
    );
  } catch (error) {
    console.log(error);
    responseHandler.error(res, 500, "Internal Server Error");
  }
};

// ---------------- Signin ----------------
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return responseHandler.error(res, 400, "Email is required");
    if (!isvelidEmail(email))
      return responseHandler.error(res, 400, "Invalid email");
    if (!password)
      return responseHandler.error(res, 400, "Password is required");
    if (!isvalidPassword(password))
      return responseHandler.error(res, 400, "Invalid password");

    const user = await userSchema.findOne({ email });
    if (!user) return responseHandler.error(res, 400, "User not found");

    const matchPass = await user.comparePassword(password);
    if (!matchPass)
      return responseHandler.error(res, 400, "Incorrect password");
    if (!user.isVerified)
      return responseHandler.error(res, 400, "Email is not verified");

    const AccTkn = generateAccTkn(user);
    const RefTkn = generateRefTkn(user);

    res.cookie("R-XS-Token", AccTkn, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });
    res.cookie("R-RF-Token", RefTkn, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    responseHandler.success(res, 200, "Signin successful");
  } catch (error) {
    console.log(error);
    responseHandler.error(res, 500, "Internal Server Error");
  }
};

module.exports = { signup, signin };
