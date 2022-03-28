const authRouter = require('express').Router();
const { register, logout, validateReg, validateLogin, verifyLoggedInUser } = require('../services/authServices');

authRouter.post('/register', validateReg, register);
authRouter.post('/login', validateLogin);
authRouter.post('/logout', logout);
authRouter.post('/verify', verifyLoggedInUser)

module.exports = authRouter;