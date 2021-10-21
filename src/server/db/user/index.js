const utils = require('../utils');

const register = async ( pool ) => {
	const queries = await utils.loadSqlQueries("user");

	const getUsername = async (id, callback) => {
		pool.getConnection(function(err, connection) {
			if(err) console.log(err);
			connection.query(queries.getUsername, [id], function(error, results, fields) {
				callback(error, results);
			})
		});
	}
	
	return { getUsername };
}
module.exports = { register };