const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   
        try {
            let token = req.headers['authorization']
            /*Should get it from the cookie, validate it , delete session*/
            if (token) {
                let decoded = jwt.verify(token, process.env.SECRET_KEY);
                /*Should compate the user info From ClientSpa with JWT payload*/
                console.log(decoded, 123)
                if (decoded) {
                    next();
                } else {
                    res.status(400).json('Please Login!!!')
                }

            }
        } catch (err) {
            console.log(err)
            res.json(err);
        }

}