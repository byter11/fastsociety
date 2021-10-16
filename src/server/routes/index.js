const api = require('./api')
module.exports.register = async (server, client) => {
	await api.register(server,client);
}