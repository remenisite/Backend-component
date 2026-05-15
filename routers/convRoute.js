const express = require("express");
const { addNewFriend } = require("../controllers/convController");
const route = express.Router();
route.post("/addnewfriend", addNewFriend);
module.exports = route;
