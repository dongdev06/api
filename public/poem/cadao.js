exports.name = '/poem/cadao';
exports.index = async(req, res, next) => {
    try {
      if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
        const cadao = require('./data/cadao.json');
        var image = cadao[Math.floor(Math.random() * cadao.length)].trim();
        res.jsonp({
            data: image,
            count: cadao.length,
            author: 'ThanhAli'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}