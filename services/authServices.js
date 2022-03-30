const authData = require('../data/authData');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



async function validateLogin(req,res,next) {
    console.log(req.body)
    const {username, password} = req.body;
    if (username === undefined || password === undefined) {
        return res.status(400).json({error: {message: "Invalid input!"}});
    }
    const validUser = await authData.findUser(username, req); /*DB check for such user*/
    if (!validUser) {
        return res.status(400).json({error: {message: "No such user!"}});
    } 
    const passMatch = await bcrypt.compare(password, validUser.password);
    if (!passMatch) {
        return res.status(400).json({error: {message: "Password doesn't match!"}});
    }
    let user = {
        _id: validUser._id,
        username: validUser.username,
        email: validUser.email
    };
    const token =  generateToken(user);
    user.authToken = token; 
    console.log('hit')
    res.cookie('f1-auth', token, {httpOnly: true, maxAge: 3600000, sameSite: 'none', secure: true});
    console.log(user)
    res.status(201).json(user);
}

function generateToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    validateLogin
};