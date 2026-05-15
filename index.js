const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const route = require("./routes");
const dbConfig = require("./configs/dbConfig");
const app = express();
dbConfig();
app.use(express.json());
app.use(cookieParser());
app.use(route);
app.listen(8000, () => {
  console.log("Server is running");
});