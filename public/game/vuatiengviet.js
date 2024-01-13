exports.name = '/game/vuatiengviet';
exports.index = async(req, res, next) => {
    try {
      if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
        const data = require('./data/datawords.json');
	const rdWords = data[Math.floor(Math.random() * data.length)]
        res.json({
            keyword: rdWords.text,
            author: 'ThanhAli'
        })
    } catch (error) {
      console.log(error)
    }
}