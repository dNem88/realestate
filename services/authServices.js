const authData = require('../data/authData');
const bcrypt = require('bcrypt');
const salt = process.env.SALT;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



async function verifyLoggedInUser(req,res,next) {
    try {
        const [cookieName, value] = req.headers.cookie.split('=') || ['', '']
        if (cookieName === 'f1-auth' && value.split('.').length === 3) {
    
            jwt.verify(value, process.env.SECRET_KEY, (err, valid) => {
                if (err) {
    
                    throw err
                }
                res.status(200).json({
                    isAuthorized: true,
                    token: value,
                    user: valid
                })
            })
        } else {
            res.status(200).json({
                isAuthorized: false
            });
        }
    } catch(e) {
        res.status(200).json({
            isAuthorized: false
        });
    }
    
    
} /*Should be used only on browser refresh of the SPA*/
async function register(req, res, next) {
    const {username, password, email} = req.body;
    bcrypt.hash(password, Number(salt), async(err, encrypted) => {
        if (err) {
            return {error: 'Could not encrypt password'}
        }
        if (encrypted) {
            try {
                const user = await authData.registerUser(req, new User(username, encrypted, email));
                res.status(201).json(user);
            } catch (e) {
                res.status(400).json({
                    error: {
                        message: 'Failed to register new User!'
                    }
                });
            }
        }
        
    });
};
async function logout(req, res, next) {
    res.clearCookie('f1-auth')
    res.status(200).json({message: 'You successfully logout', logout: true});
};


function validateReg(req,res,next) {
    const {
            username,
            password,
            confirmPassword,
            email
        } = req.body;
   
    
    if (!username && !password && !confirmPassword && !email) {
        return res.status(400).json({error: 
            {message: "All fields are required!"}
        });
    }
    const isValidUsername =  validator.isAlphanumeric(username);
    const isSecurePassword = validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 2,
        minNumbers: 1
    });
    const isEmail = validator.isEmail(email);
    const areEqual = validator.equals(password, confirmPassword);
    
    if (!isValidUsername) {
        return res.status(400).json({error: {
            message: 'Username must contain only English letters and digits!'
        }});
    }
    if (!isSecurePassword) {
        return res.status(400).json({error: {
            message: "Password must be at least 8 charactars long. Must contain at least 1 digit, lowercase and uppercase letters!"
        }});
    }
    if (!areEqual) {
        return res.status(400).json({error: {
            message: 'Password and Confirm Password must be equal!'
        }});
    }
    if (!isEmail) {
        return res.status(400).json({error: {message: 'Please enter valid email address!'}})
    }
    /*If the function doesn't return Error => call the next function*/
    next();
}
async function validateLogin(req,res,next) {
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
    res.status(201).json(user);
}

function generateToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    register,
    logout,
    validateReg,
    validateLogin,
    verifyLoggedInUser
};