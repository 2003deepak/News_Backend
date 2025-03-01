const axios = require('axios');

const getNews = async (req, res) => {
    const { category } = req.query; 

    if (!category) {
        return res.status(400).json({ status: 'fail', message: 'Category is required' });
    }

    try {
        // const url  = `https://newsapi.org/v2/everything?q=india-${category}&apiKey=bb0b9b62d6514ef5bdfe503da05c766b`;
        const url = `https://newsdata.io/api/1/latest?apikey=${process.env.NEWS_DATA_IO_APIKEY}&category=${category}&country=in`
        const resp = await axios.get(url);
        const data = resp.data;

        return res.status(200).json({ status: 'success', message: data });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: 'fail', message: 'Internal server error' + err });
    }
};

module.exports = getNews;
