const router = require('express').Router({mergeParams: true});
const config = require('../config');
const Post = require('../db/post');
const {verify} = require('../services/jwt');

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

    Post.insert({userId: user.id, eventId, societyId, textContent, image: req.body.image}, (error) => {
        if (error)
            return res.status(500).send();
        return res.sendStatus(200);
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