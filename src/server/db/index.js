const { exists } = require('fs-extra');
const oracledb = require('oracledb');
const config = require('../config');
const userdb = require('./user');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const {user, password, connectString} = config.sql;

oracledb.createPool({
	user, 
	password, 
	connectString
});

const client = async () => {
	const getConnection = oracledb.getConnection;

	return {
		user: await userdb.register( {getConnection} )
	}
}

module.exports = client;