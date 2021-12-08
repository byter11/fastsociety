const router = require('express').Router()
const {getOne} = require('../db/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.get('/', (req, res) => {
	// console.log(req.headers.token);
	jwt.verify(req.headers.token, config.jwtSecret, (err, decoded) => {
		if(err)
			return res.status(401).send(err);
		
		getOne({where: {id: [decoded]}},
		(errors, results) => {
			if(errors){
				//console.log(errors)
				return res.status(500).send(errors);
			}
			
			const user = {
				id: getUserId(results.email),
				name: results.name,
				email: results.email,
				image: results.image
			}

			return res.status(200).json(user);
		});
	});
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
			image: results.image	
		}
		return res.status(200).json(user);
	});
})

const getUserId = (email) => {
	return email.split('@')[0];
}
module.exports = router;