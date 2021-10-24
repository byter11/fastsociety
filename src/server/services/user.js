const db = require('./db');

const getAll = (cb) => {
	db.query(
		`SELECT * FROM users`,
		(error, results, fields) => {
			console.log(error, results, fields)
			cb(error, results, fields)
		}
	);
}

module.exports = {getAll}
