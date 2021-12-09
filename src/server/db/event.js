const db = require('./db');
const { buildConditions } = require('../utils');

const getMultiple = ({where={}, limit=10, offset=0, user=''}, cb) => {
	limit = 10;
    const {conditions, values} = buildConditions(where, 'e.');
	console.log(conditions, values);
	const fields = 'e.id, e.textContent, e.createdOn, e.startTime, e.endTime, e.image, s.id, s.title, s.image';
	db.query({
		sql: `SELECT ${fields},
		avg(r.stars) as Rating, (SELECT stars FROM review WHERE User_id = ? AND Event_id = e.id) AS userRating
		FROM event e
		LEFT JOIN Society s ON s.id = e.Society_id
		LEFT JOIN Review r ON r.Event_id = e.id
		${conditions ? 'WHERE ' + conditions : ''}
		GROUP BY ${fields}
        ORDER BY createdOn desc
        LIMIT ?, ?`,
		nestTables: true, 
		values: [user, ...values, offset, limit],
	},(error, results, fields) => {
			// console.log(error,results);
			if (error) cb(error);
			const data = results.map(obj => {
				delete obj.e.Society_id;
				obj.e.society = obj.s;
				return Object.assign(obj.e, obj['']);
			});
			cb(error, data.filter(obj => obj.id !== null), fields);
		}
	);
}

module.exports = {getMultiple};