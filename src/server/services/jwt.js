const jwt = require('jsonwebtoken');

module.exports = {
    verify: (req, res, next) => {
        jwt.verify(req.headers.token, config.jwtSecret, (err, decoded) => {
            req.body.userId = decoded;
            next();
        });
    }
}