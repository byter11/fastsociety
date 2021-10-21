module.exports.register = async (server, client) => {
	server.get(
		'/api/getUsername/', 
		(req, res) => {
			const id = req.query.id;
			client.user.getUsername(id, (error, result) => {
				if(error) res.status(500).json({message: error});
				res.json({data: result});
			})
		}
	)};