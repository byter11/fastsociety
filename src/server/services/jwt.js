const jwt = require('jsonwebtoken');
const User = require('../db/user');

module.exports = {
    verify: (req, res, next) => {
        jwt.verify(req.headers.token, config.jwtSecret, (err, decoded) => {
            if(err)
                return res.status(401).send(err);
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