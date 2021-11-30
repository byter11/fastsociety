const db = require('./db');

const upsert = (data, cb) => {
	const {id, name, email, image} = data;
	db.query(
		`INSERT INTO Users (id, name, email, image)
		 VALUES (?, ?, ?, ?)
		 ON DUPLICATE KEY UPDATE
		 name = ?, image = ?`,
		[id, name, email, image, name, image],
		(error, results, fields) => {
			console.log(error, results, fields)
			cb(error, results[0]);
		}
	);
}

const getOne = ({where, value}, cb) => {
	db.query(
		`SELECT name, email, image
		FROM Users
		WHERE ${where} = ?`,
		[value],
		(error, results, fields) => {
			cb(error, results, fields)
		}
	);
}

module.exports = {upsert, getOne}
