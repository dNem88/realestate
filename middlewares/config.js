
const cors = require('cors');
const express = require('express');
const path = require('path')
let root = path.parse(__dirname).dir;
const cookieParser = require('cookie-parser')
module.exports = (app) => {
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(cors({
        methods: 'GET,POST,PUT,DELETE',
        origin: ["https://dnem88.github.io",
            "http://localhost:3000"
        ],
        preflightContinue: true,
        allowedHeaders: "Content-Type, Authorization, X-Requested-With",
        credentials: true,
        optionsSuccessStatus: 200
    }));
    app.use(cookieParser(process.env.SECRET_KEY))
    app.set('view engine', 'ejs');
    app.use('/static', express.static(`${root}/static`));
    console.log('here')
};