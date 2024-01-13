const router = require("express").Router();
const { readdirSync, readFileSync } = require('fs-extra');
const path = require('path');
try {
  var i, j;
  const srcPath = path.join(__dirname, "/public/");
  const hosting = readdirSync(srcPath).filter((file) => file.endsWith(".js"));
  for (i of hosting) {
    const { index, name } = require(srcPath + i);
    router.get(name, index);
    //console.log(i);
  } 
  const getDirs = readdirSync(srcPath).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirs) {
    const fileName = readdirSync(path.join(__dirname, '/public/' + dir + '/')).filter((file) => file.endsWith(".js"));
    for (j of fileName) {
      const { index, name } = require(path.join(__dirname, '/public/' + dir + '/') + j);
      router.get(name, index);
      //console.log('\x1b[36m[ LOADING ] →\x1b[37m Đã tải thành công ' + j);
    }
  }

} catch (e) { console.log(e); }
//console.log('\x1b[36m[ LOADING ] →\x1b[37m Đã kết nối thành công tất cả API, bạn có thể sử dụng ngay bây giờ');
// -------------------------->      END     <------------------------------//
module.exports = router;