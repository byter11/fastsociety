const router = require('express').Router();
const Event = require('../db/event');
const User = require('../db/user');
const Society = require('../db/society');
const sendMail = require('../services/emailer');
const {verify} = require('../services/jwt');
const { config } = require('../config');

router.get('/:eventId', verify, (req, res) => {
    const userId = (req.body.user || {}).id || '';
    const { eventId } = req.params;

    Event.getMultiple({where: {id: eventId}, offset: 0, limit: 1, user: userId}, (error, results) => {
        if(error)
            return res.status(500).send();
        res.status(200).send(results[0]);
    });
});

router.get('/', verify, (req, res) => {
    if(!req.body.user)
        return res.status(200).send([]);
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
            return res.status(200).send(results);
        }
    )
})

router.post('/', verify, (req, res) => {
    // console.log(req.body);
    const {user, Society_id} = req.body;
    if (!user)
        return res.status(401).send();
    
    const {image} = req.files || {};
    if(image){
        const path = 'public/images/' + image.name;
        
        image.mv(path, (err) => {
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
        });
        req.body.image = '/images/' + image.name;
    }
    
    if(user.societies.filter(s => s.id == Society_id && s.role.createEvent).length === 0)
        return res.status(401).send('User does not have permission to create event');
    
    req.body.User_id = user.id;
    console.log(req.body);
    Event.insert(req.body, (error) => {
        if (error)
            return res.sendStatus(500);
        res.sendStatus(200);
        if(!config.emailsEnabled) return;
        User.getAllEmails(
            (error, users) => {
                if(error) return;
                Society.getOne({where: {id: req.body.Society_id}}, 
                    (error, society) => {
                        if(error) return;
                        sendMail({
                            to: users,
                            subject: `New Event from ${society.title}`,
                            html: `<h1><b>${society.title}</b></h1>
                            <pre>${req.body.textContent}</pre>
                            <img src="cid:postImage">`,
                            attachments: !image ? [] :
                                [{
                                    filename: image.name,
                                    path: process.cwd() + '/public' + req.body.image,
                                    cid: 'cid:postImage'
                                }]
                        });
                    });
            }
        );
    });
})

router.delete('/', verify, (req,res) => {
    const {user, eventId} = req.body;
    if (!user)
        return res.status(401).send();
    
    Event.deleteEvent({id: eventId, user: user.id}, (error) => {
        if(error)
            return res.sendStatus(500);
        return res.sendStatus(200);
    })
});

router.post('/:id/follow', verify, (req, res) => {
    const {user} = req.body;
    const {id} = req.params;

    if(!user)
        return res.sendStatus(401);
    
    Event.follow({eventId: id, userId: user.id}, (error) => {
        if(error)
            return res.sendStatus(500);
        return res.sendStatus(200);
    });
})

router.delete('/:id/follow', verify, (req, res) => {
    const {user} = req.body;
    const {id} = req.params;

    if(!user)
        return res.sendStatus(401);
    
    Event.unfollow({eventId: id, userId: user.id}, (error) => {
        if(error)
            return res.sendStatus(500);
        return res.sendStatus(200);
    });
})

module.exports = router;