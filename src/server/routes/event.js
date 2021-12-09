const router = require('express').Router();
const config = require('../config');
const Event = require('../db/event');
const User = require('../db/user');
const jwt = require('jsonwebtoken');
const {verify} = require('../services/jwt');

router.get('/:eventId', (req, res) => {
    const { eventId } = req.params;

    Event.getMultiple({where: {id: eventId}, offset: 0, limit: 1}, (error, results) => {
        if(error)
            return res.status(500).send();
        res.status(200).send(results[0]);
    });
});

router.get('/', verify, (req, res) => {
    const userId = (req.body.user || {}).id || '';
    const count = +req.query.count || 2;
    const offset = +req.query.offset || 0;
    const societies = req.query.societies //undefined if empty string else array
        ? req.query.societies.split(',') 
        : undefined;

    // console.log(count,offset,societies);

    Event.getMultiple({where: {Society_id: societies}, offset: offset, limit: count, user: userId},
        (errors, results) => {
            if(errors)
                return res.status(500).send(errors);
            console.log(results);
            return res.status(200).send(results);
        }
    )
})

router.post('/', verify, (req, res) => {
    const {user, Society_id} = req.body;
    if (!user)
        return res.status(401).send();
    
    if(user.societies.filter(s => s.id == Society_id && s.role.createEvent).length === 0)
        return res.status(401).send('User does not have permission to create event');
    
    console.log(user.societies.filter(s => s.id == Society_id && s.role.createEvent))
    return res.status(200).send('Added event');
})
module.exports = router;