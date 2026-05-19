const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const httpServer = createServer(app);
const dns = require("dns");
const io = require("socket.io")(httpServer);
const { createServer } = require("http");
const route = require("./routes");
const dbConfig = require("./configs/dbConfig");
const app = express();
dbConfig();
global.io = io;
dns.setServers(["8.8.8.8", "8.8.4.4"]);
app.use(express.json());
app.use(cookieParser());
app.use(route);
httpServer.listen(8000, () => {
  console.log("Server is running");
});

