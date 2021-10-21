const { exists } = require('fs-extra');
const mysql = require('mysql');
const config = require('../config');
const userdb = require('./user');

const {user, password, connectString, databaseName} = config.sql;



const client = async () => {
	const pool = mysql.createPool({
		connectionLimit: 10,
		host: connectString,
		user: user,
		password: password,
		database: databaseName
	});
	
	const getConnection = pool.getConnection;

	const release = (conn) => {
		conn.release();
	}

	return {
		user: await userdb.register( pool )
	}
}

module.exports = client;