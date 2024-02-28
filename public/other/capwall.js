const axios = require('axios');

exports.name = '/capwall';
exports.index = async (req, res, next) => {
    try {
        const { uid, cookie } = req.query;

        // Kiểm tra nếu không tìm thấy giá trị của "uid" hoặc "cookie"
        if (!uid || !cookie) {
            return res.status(400).send('Missing uid or cookie parameter');
        }

        const options = {
            method: 'GET',
            url: `https://facebook.com/${uid}/`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Language': 'en-US,en;q=0.9',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Upgrade-Insecure-Requests': '1',
                'Cookie': cookie
            },
            timeout: 5000
        };
        const response = await axios(options);
        res.send(response.data);
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            res.status(408).send('Request timeout');
        } else {
            res.status(500).send(error.message);
        }
    }
};
              
