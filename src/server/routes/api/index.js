const user = require('./username')
module.exports.register = async (server, client) => {
	await user.register(server, client);
}