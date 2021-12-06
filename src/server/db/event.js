const db = require('./db');
const { buildConditions } = require('../utils');

const getMultiple = ({where={}, limit=10, offset=0, user=''}, cb) => {
    const {conditions, values} = buildConditions(where, 'e.');
	db.query({
		sql: `SELECT e.id, e.textContent, e.createdOn, e.startTime, e.endTime, e.image, 
		s.id, s.title, s.image, 
		avg(r.stars) as rating, (SELECT stars FROM review WHERE User_id = ? AND Event_id = e.id) AS userRating
		FROM event e
		LEFT JOIN society s ON s.id = e.Society_id
		LEFT JOIN review r ON r.Event_id = e.id
		${conditions ? 'WHERE ' + conditions : ''}
        ORDER BY createdOn desc
        LIMIT ?, ?`,
		nestTables: true, 
		values: [user, ...values, offset, limit],
	},(error, results, fields) => {
			console.log(error)
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