const jwt = require('jsonwebtoken');
const User = require('../db/user');

module.exports = {
    verify: (req, res, next) => {
        jwt.verify(req.headers.token, config.jwtSecret, (err, decoded) => {
            User.getOne({where: {id: [decoded]}}, (error, results) => {
                if(!error){
                    results.id = decoded;
                    req.body.user = results; 
                }
                    
                next();
            });
        });
    }
}