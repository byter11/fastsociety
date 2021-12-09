const db = require('./db');
const { buildConditions } = require('../utils');

const insert = (values, cb) => {
	const {venue, textContent, startTime, endTime, image, User_id, Society_id} = values;

	db.query({
		sql: `INSERT INTO Event
		(venue, textContent, startTime, endTime, image, User_id, Society_id)
		VALUES (?, ?, ?, ?, ?, ?, ?)`,
		values: [venue, textContent, startTime, endTime, image, User_id, Society_id]
	}, (error) => {
			cb(error);
	});
}

const getMultiple = ({where={}, limit=10, offset=0, user=''}, cb) => {
	limit = 10;
    const {conditions, values} = buildConditions(where, 'e.');
	const fields = 'e.id, e.textContent, e.createdOn, e.startTime, e.endTime, e.image, s.id, s.title, s.image';
	db.query({
		sql: `SELECT ${fields},
		avg(r.stars) as rating, (SELECT stars FROM review WHERE User_id = ? AND Event_id = e.id) AS userRating
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

module.exports = {getMultiple, insert};