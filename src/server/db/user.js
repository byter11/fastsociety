const { buildConditions } = require('../utils');
const db = require('./db');

const upsert = (data, cb) => {
	const {id, name, email, image} = data;
	db.query(
		`INSERT INTO user (id, name, email, image)
		 VALUES (?, ?, ?, ?)
		 ON DUPLICATE KEY UPDATE
		 name = ?, image = ?`,
		[id, name, email, image, name, image],
		(error, results=[], fields) => {
			cb(error, results[0]);
		}
	);
}

const getOne = ({where, offset=0, limit=100000}, cb) => {
	const {conditions, values} = buildConditions(where);
	db.query(
		`SELECT name, email, image
		FROM user
		${conditions ? 'WHERE ' + conditions : ''} 
		LIMIT ?, ?`,
		[...values, offset, limit],
		(error, results=[], fields) => {
			console.log(error, results);
			cb(error, results[0], fields)
		}
	);
}



module.exports = {upsert, getOne}
