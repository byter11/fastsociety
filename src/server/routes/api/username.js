module.exports.register = async (server, client) => {
	console.log('adding user api');
	server.get(
		'/api/getUsername', 
		(req, res) => {
			client.user.getUsername(100).then((username) => res.send({username}))
		}
	)};