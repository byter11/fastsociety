const utils = require('../utils');

const register = async ( {getConnection} ) => {
	const queries = await utils.loadSqlQueries("user");

	const getUsername = async id => {
		const cnx = await getConnection();
		
		const result = await cnx.execute(queries.getUsername, [id]);
		return result;
	}

	return { getUsername };
}
module.exports = { register };