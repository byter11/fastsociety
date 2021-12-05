const db = require('./db');
const { buildConditions } = require('../utils');

const getMultiple = ({where={}, limit=10, offset=0, user=''}, cb) => {
    const {conditions, values} = buildConditions(where);
	db.query({
		sql: `SELECT e.*, s.*, avg(r.stars) as rating, (select stars from review where User_id = ? AND Event_id = e.id) as userRating
		FROM event e
		LEFT JOIN society s ON s.id = e.Society_id
		LEFT JOIN review r ON r.Event_id = e.id
		${conditions ? 'WHERE ' + conditions : ''}
        ORDER BY createdOn desc
        LIMIT ?, ?`,
		nestTables: true, 
		values: [user, ...values, offset, limit],
	},(error, results, fields) => {
			if (error) cb(error);
			const data = results.map(obj => {
				delete obj.e.Society_id;
				obj.e.society = obj.s;
				return Object.assign(obj.e, obj['']);
			})
			cb(error, data, fields)
		}
	);
}

module.exports = {getMultiple};