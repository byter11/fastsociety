const router = require('express').Router();
const config = require('../../config');
const { getOne, getMultiple } = require('../../db/event');

router.use('/:eventId/post', require('./post'));
router.use('/:eventId/comment', require('./comment'));
router.use('/:eventId/review', require('./review'));

router.get('/:eventId', (req, res) => {
    const { eventId } = req.params;
    getOne({where: 'id', value: eventId});
});

router.get('/', (req, res) => {
    const count = +req.query.count || 2;
    const offset = +req.query.offset;
    const societies = req.query.societies //undefined if empty string else array
        ? req.query.societies.split(',') 
        : undefined;

    // console.log(count,offset,societies);

    getMultiple({where: {societyId: societies}, offset: offset, limit: count},
        (errors, results) => {
            if(errors)
                return res.status(500).send(errors);
            return res.status(200).send(results);
        }
    )
})

module.exports = router;