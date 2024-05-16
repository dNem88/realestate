const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const router = require('../routes');
const path = require('path');
const {clientPromise} = require('../config/database');
require('../middlewares/config')(app);


console.log(process.env.MONGODB_URI)
console.log(process.env.PORT)
app.use(router);

app.get('/', async (req,res) => {
    let db = await clientPromise;
    res.send('Express on VERCEL')
})


module.exports = app