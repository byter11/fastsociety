mysql = require('mysql');
config = require('../config');

const pool = mysql.createPool({
	// host: config.sql.host,
	user: config.sql.user,
	password: config.sql.password,
	database: config.sql.database
});

module.exports = pool;