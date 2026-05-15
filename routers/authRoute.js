const express = require("express");
const { signUp, signIn } = require("../controllers/authController");
const route = express.Router();
route.post("/signup", signUp);
route.post("/signin", signIn);
module.exports = route;
// +srv://chatApp:ycwxcTArOjMViARI@cluster0.hppyt.mongodb.net/chatApp?appName=Cluster0
