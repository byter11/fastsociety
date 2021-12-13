mysql = require('mysql');
config = require('../config');

const pool = mysql.createPool({
	host: config.sql.host || '127.0.0.1',
	user: config.sql.user,
	password: config.sql.password,
	database: config.sql.database,
	multipleStatements: true
});

module.exports = pool;