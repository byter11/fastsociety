const router = require('express').Router()
const {getOne} = require('../db/user');


router.get('/:username', (req, res) => {
	const email = req.params.username + '@nu.edu.pk';
	getOne({where: 'email', value: email},
	(errors, results, fields) => {
		if(errors)
			return res.status(500).json(errors);
		return res.status(200).json(results);
	});
})

module.exports = router;