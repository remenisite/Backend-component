const express = require("express");
const { getSms, sendSms, SmsList, addANewFriend } = require("../controllers/smsController");
const route = express.Router();
route.post("/addnewfriend", addANewFriend);
route.get("/Smslist", SmsList);
route.post("/sendSms", sendSms);
route.get("/getSms/:conversation", getSms)
module.exports = route;
