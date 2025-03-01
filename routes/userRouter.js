const express = require('express');
const getNews = require('../controller/userController/getNews');
const router = express.Router();

const isLoggedIn = require("../utils/isLoggedIn");
const trendingTopics = require('../controller/userController/trendingTopics');
const translation = require('../controller/userController/translation');


router.get("/getNews" , isLoggedIn , getNews);
router.get("/getTrends" , isLoggedIn , trendingTopics);
router.get("/translation" , isLoggedIn , translation);



module.exports = router;