const router = require('express').Router()
const Society = require('../db/society');
const User = require('../db/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.get('/:id', (req, res) => {
	const {id} = req.params;
	console.log(id);
	Society.getOne({where: {id: id}},
	(errors, results, fields) => {
		if(errors)
			return res.status(500).json(errors);

		return res.status(200).json(results);
	});
});

router.get('/:id/user', (req, res) => {
	const {id} = req.params;
	Society.getMembers(id, (error, results) => {
		if(error)
			return res.status(500).json(error);
		return res.status(200).json(results);
	});

})
module.exports= router;