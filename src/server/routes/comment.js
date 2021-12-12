const router = require('express').Router({mergeParams: true});
const Comment = require('../db/comment');
const { verify } = require('../services/jwt');

router.get('/', verify, (req, res) => {
    const userId = (req.body.user || {}).id || '';
    const count = +req.query.count || 2;
    const offset = +req.query.offset || 0;
    const {eventId} = req.params;
    if (!eventId)
        return res.sendStatus(400)

    // console.log(count, offset, eventId);

    Comment.getMultiple({ where: { Event_id: [eventId] }, offset: offset, limit: count, user: userId },
        (errors, results) => {
            if (errors)
                return res.status(500).send(errors);
            return res.status(200).send(results);
        }
    )
})

router.post('/', verify, (req, res) => {
    console.log("body is",req.params);
    if (!req.body.user)
        return res.status(401).send();
    
    const id = req.body.user.id;
    const text = req.body.textContent;

    Comment.insert({
        User_id: id, textContent: text, Event_id: req.params.eventId
    }, (error) => {
        if (error)
            return res.status(500).send(error);
        return res.sendStatus(200);
    });
})

module.exports = router;