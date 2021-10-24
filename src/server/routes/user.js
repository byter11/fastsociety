const router = require('express').Router()
const userService = require('../services/user');


router.route('/')
	.get((req, res) =>
		userService.getAll(
			(errors, results, fields) => {
				if(errors){
					res.status(500).json(errors)
				} else {
					res.json(results)
				}
			} 
		)
	)

module.exports = router;