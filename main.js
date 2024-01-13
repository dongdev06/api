'use strict';
const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const helmet = require("helmet");
const server = require("./server.js");
const app = express();
const moment = require("moment-timezone");
//const rateLimit = require("express-rate-limit");
const getIP = require('ipware')().get_ip;
/*const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  // limit each IP to max requests per windowMs
  message: {
    error: "Bạn đã đặt giới hạn lượt yêu cầu 50 lượt yêu cầu mỗi phút"
  }
});*/

//app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
    var ipInfo = getIP(req);
    var color = ["\x1b[33m", "\x1b[34m", "\x1b[35m", '\x1b[36m', '\x1b[32m'];
    var more = color[Math.floor(Math.random() * color.length)];
   // console.log(more + '[ IP ] -> ' + ipInfo.clientIp + '' + ' - ' + timeNow ); //console.log('\x1b[37m============================================\x1b[37m');
  next();
});
app.post('/');
app.use("/", server);
app.set("json spaces", 4);
app.use((error, req, res, next) => {
  //console.log(error)
  res.status(error.status || 400).json({
    message: error.message
  });
});
///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////
app.set('port', (process.env.PORT || 5000));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');

}).listen(app.get('port'), function () {
  //console.log('\x1b[36m[ PORT ] → \x1b[37m Máy chủ đang chạy trên PORT', app.get('port'), '\n\x1b[36m[ START ] → \x1b[37m Tiến hành nhận yêu cầu\n============================================');
});