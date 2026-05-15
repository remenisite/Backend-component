const conversationSchema = require("../models/conversationSchema");
const userSchema = require("../models/userSchema");

const addANewFriend = async (req, res) => {
  const { email } = req.body;
  try {
    if (email === req.user.email) {
      return res.status(400).send({ message: "Try with another email" });
    }
    const friend = await userSchema.findOne({ email });
    if (!friend)
      return res.status(400).send({ error: "This email dose not exist" });
    const existingParticipent = await conversationSchema.findOne({
      $or: [
        { creator: req.user._id, participent: friend._id },
        { participent: req.user._id, creator: friend._id },
      ],
    });
    if (existingParticipent)
      return res.status(400).send({ error: "Already in friend list" });
    const createNewConv = await conversationSchema.create({
      creator: req.user._id,
      participent: friend._id,
    });
    res.status(200).send({ message: "Friend Added successfylly" });
  } catch (error) {
    console.log(error);
    re.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { addANewFriend };