module.exports = (req, res, next) => {
    try {
        let token = req.session.user.authToken;
        /*Should get it from the cookie, validate it , delete session*/
        if (token) {
            let decoded = jwt.verify(token, process.env.SECRET_KEY);
            /*Should compate the user info From ClientSpa with JWT payload*/
            if (decoded.username === req.session.user.username) {
                next();
            } else {
                res.json({
                    error: {
                        message: 'Not Authenticated! Please login!'
                    }
                });
            }

        }
    } catch (e) {
        res.json({
            error: "You are not authenticated! Please Login first!"
        });
    }

}