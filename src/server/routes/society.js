const router = require('express').Router()
const Society = require('../db/society');
const {verify} = require('../services/jwt');


router.get('/:id', (req, res) => {
	const {id} = req.params;
	// console.log(id);
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

router.post('/:id/user', verify, (req, res) => {
	const {id} = req.params;
	const {user} = req.body;
	const {User_id, Society_id, Role_name} = req.body;

	if(!user || !canManageMembers(user, Society_id))
		return res.sendStatus(401);
	
	if(!user || !canManageMembers(user, Society_id))
		return res.sendStatus(401);
		
	const email = User_id + '@nu.edu.pk';

	Society.addMember({email, Society_id, Role_name}, (error, results)=>{
		if(error) return res.status(500).send(error);
		return res.sendStatus(200);
	});	
	
})

router.delete('/:id/user', verify, (req, res) => {
	const {id} = req.params;
	const {user} = req.body;
	console.log(req.body);
	
	const {email, Society_id} = req.body;

	if(!user || !canManageMembers(user, Society_id))
		return res.sendStatus(401);

	if(email == user.email)
		return res.sendStatus(401);
	
	
	Society.removeMember({email, Society_id}, (error) => {
		if(error) return res.status(500).send(error);
		return res.sendStatus(200);
	})
})

const canManageMembers = (user = [{ role: {} }], id) =>
	user.societies.filter(s => s.id == id)[0].role.manageMembers;


module.exports= router;