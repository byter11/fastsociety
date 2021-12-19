const router = require('express').Router({mergeParams: true});
const config = require('../config');
const Post = require('../db/post');
const Society = require('../db/society');
const Event = require('../db/event');
const {verify} = require('../services/jwt');
const sendMail = require('../services/emailer');


router.get('/', (req, res) => {
    const { eventId } = req.params;
    const count = +req.query.count || 5, offset = +req.query.offset || 0;

    Post.getMultiple({where: {Event_id: eventId}, offset: offset, limit: count}, 
        (errors, results) => {
            if(errors)
                res.status(500).send(errors);
            res.status(200).json(results);
        }
    );
});

router.post('/', verify, (req, res) => {
    // console.log(req.body);
    const {user, eventId, societyId, textContent} = req.body;
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
    
    if(user.societies.filter(s => s.id == societyId && s.role.createPost).length === 0)
        return res.status(401).send('User does not have permission to create post');
    console.log(__dirname)
    console.log(req.headers.host + req.body.image)
    Post.insert({userId: user.id, eventId, societyId, textContent, image: req.body.image}, (error) => {
        if (error)
            return res.status(500).send();
        res.sendStatus(200);
        if(!config.emailsEnabled) return;
        Event.getFollowers(
            {eventId},
            (error, users) => {
                console.log(users);
                if(error) return;
                Society.getOne({where: {id: societyId}}, 
                    (error, society) => {
                        if(error) return;
                        sendMail({
                            to: users,
                            subject: `${society.title} - Update from an Event you're following`,
                            html: `<h1><b>${society.title}</b></h1>
                            <h3><b>${user.name}</b> Posted:</h3>
                            <pre>${textContent}</pre>
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


router.delete('/:id', verify, (req, res) => {
    const {id} = req.params;
    const {user} = req.body;
    if (!user)
        return res.status(401).send();
    
    Post.deletePost({id, user: user.id}, (error) => {
        if(error)
            return res.status(500).send(error);
        return res.sendStatus(200);
    })
});

module.exports = router;