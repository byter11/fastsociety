const router = require('express').Router()
const {getOne} = require('../db/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {verify} = require('../services/jwt');


router.get('/', verify, (req, res) => {
	const {user} = req.body;
	if(!user)
		return res.sendStatus(401);

	user.id = getUserId(user.email);
	return res.status(200).send(user);
});

router.get('/:username', (req, res) => {
	const email = req.params.username + '@nu.edu.pk';
	getOne({where: {email: [email]}},
	(errors, results, fields) => {
		if(errors)
			return res.status(500).json(errors);

		const user = {
		id: getUserId(results.email),
		name: results.name,
		email: results.email,
		image: results.image,
		societies: results.societies,
    };
		return res.status(200).json(user);
	});
})

const getUserId = (email) => {
	return email.split('@')[0];
}
module.exports = router;