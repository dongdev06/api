exports.name = '/game/dhbcv1';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
    const ress = require("./data/dhbc1.json");
    const length1 = ress.doanhinh.length
    const dataGame = ress.doanhinh[Math.floor(Math.random() * length1)]
    res.json({ dataGame })
}