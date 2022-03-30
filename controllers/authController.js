const authRouter = require('express').Router();
const {  validateLogin } = require('../services/authServices');

authRouter.post('/login', validateLogin);

module.exports = authRouter;