const router = require('express').Router({mergeParams: true});
// const {getOne} = require('../db/user');
const {verify} = require('../services/jwt');
const config = require('../config');
const { upsert } = require('../db/rating');

router
.post('/', verify, (req, res) => {
    const {user, rating} = req.body;
    if (!user)
        return res.status(401).send();

    const {eventId} = req.params;
    const userId = user.id;
    
    upsert({userId, eventId, rating}, (error, results) => {
        if (error)
            return res.status(500).send();

        return res.status(200).send();
    })
});

module.exports= router;