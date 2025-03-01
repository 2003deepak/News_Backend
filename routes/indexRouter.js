const express = require('express');
const router = express.Router();

const register = require("../controller/indexController/register");
const login = require('../controller/indexController/login');


router.post("/register" , register );
router.post("/login" , login );



module.exports = router;