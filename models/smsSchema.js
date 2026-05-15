const mongoose = require("mongoose");

const smsSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    participent: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    lastMessage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("smsSchema", smsSchema);
