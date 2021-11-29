const router = require('express').Router();
const config = require('../config');
const User = require('../db/user');
const jwt = require('jsonwebtoken');
const {verify} = require('../services/google');


router.post('/signin', verify, async (req, res) => {
		const {id, name, email, image} = req.body;
		if(!id)
			return res.status(401);
		console.log("User logged in with ID: ", id);
		User.upsert({id, name, email, image}, (error, results) => {
			if(error)
				return res.status(401);
			
		});
		
		// Generate access token and profile data
		const token = jwt.sign(id, config.jwtSecret);
		// const user = {name, email, image};

		return res.status(200).send({token});
	});

module.exports = router;
