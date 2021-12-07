const router = require('express').Router();
const config = require('../config');
const { getOne, getMultiple } = require('../db/event');
const jwt = require('jsonwebtoken');
const {verify} = require('../services/jwt');

router.get('/:eventId', (req, res) => {
    const { eventId } = req.params;

    getMultiple({where: {id: eventId}, offset: 0, limit: 1}, (error, results) => {
        if(error)
            return res.status(500).send();
        res.status(200).send(results[0]);
    });
});

router.get('/', verify, (req, res) => {
    const userId = req.body.userId || '';
    const count = +req.query.count || 2;
    const offset = +req.query.offset || 0;
    const societies = req.query.societies //undefined if empty string else array
        ? req.query.societies.split(',') 
        : undefined;

    // console.log(count,offset,societies);

    getMultiple({where: {societyId: societies}, offset: offset, limit: count, user: userId},
        (errors, results) => {
            if(errors)
                return res.status(500).send(errors);
            return res.status(200).send(results);
        }
    )
})

module.exports = router;