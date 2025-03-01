const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ status: "fail", message: "User not logged in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ status: "fail", message: "Invalid or expired token" });
    }
};

module.exports = isLoggedIn;
