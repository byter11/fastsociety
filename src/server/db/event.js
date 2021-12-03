const db = require('./db');
const { buildConditions } = require('../utils');

const getMultiple = ({where={}, limit=10, offset=0}, cb) => {
    const {conditions, values} = buildConditions(where);
	console.log(conditions, values);
	db.query({
		sql: `SELECT e.*, s.*
		FROM event e
		LEFT JOIN society s ON s.id = e.Society_id
		${conditions ? 'WHERE ' + conditions : ''}
        ORDER BY createdOn desc
        LIMIT ?, ?`,
		nestTables: true, 
		values: [...values, offset, limit],
	},(error, results, fields) => {
			if (error) cb(error);
			const data = results.map(obj => {
				delete obj.e.Society_id;
				obj.e.society = obj.s;
				return obj.e;
			})
			console.log(data);
			cb(error, data, fields)
		}
	);
}

module.exports = {getMultiple};