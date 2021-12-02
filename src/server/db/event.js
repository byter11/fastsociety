const db = require('./db');
const { buildConditions } = require('../utils');

const getMultiple = ({where={}, limit=10, offset=0}, cb) => {
    const {conditions, values} = buildConditions(where);
	console.log(conditions, values);
	db.query(
		`SELECT *
		FROM Events ${conditions ? 'WHERE ' + conditions : ''}
        ORDER BY createdAt desc
        LIMIT ?, ?`,
		[...values, offset, limit],
		(error, results, fields) => {
			cb(error, results, fields)
		}
	);
}

module.exports = {getMultiple};