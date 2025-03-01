const axios = require('axios');
const googleTrends = require('google-trends-api');

const trendingTopics = async(req,res) =>{

    const url = `https://serpapi.com/search?engine=google_trends_trending_now&geo=IN&api_key=${process.env.SERP_API_KEY}`;

  try {
    const response = await axios.get(url);
    const trendingSearches = response.data.trending_searches;

    const formattedSearches = trendingSearches.slice(0, 20).map((search) => ({
      name: search.query,
      volume: search.search_volume,
    }));

    res.status(200).json({
      status: "success",
      message: formattedSearches,
    });
  } catch (error) {
    console.error("Error fetching trending topics in India:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch trending topics" });
  }


}

module.exports = trendingTopics ; 

