const db = require('./db');
const { buildConditions } = require('../utils');


const insert = ({ userId, eventId, textContent, image }, cb) => {
	const values = [userId, eventId, textContent, image].map(v => v || 'NULL');
	db.query(
		{
			sql: `INSERT INTO Post
		(User_id, Event_id, textContent, image)
		VALUES (?, ?, ?, ?)`,
			values: values,
		},
		(error) => {
			cb(error);
		}
	);
};



const getMultiple = ({ where = {}, limit = 10, offset = 0 }, cb) => {
	const { conditions, values } = buildConditions(where);
	db.query({
		sql: `SELECT p.id, p.textContent, p.image,
		u.id, u.name, u.image
		FROM Post p
		LEFT JOIN User u ON u.id = p.User_id
		${conditions ? 'WHERE ' + conditions : ''}
        ORDER BY createdOn desc
        LIMIT ?, ?`,
		nestTables: true,
		values: [...values, offset, limit],
	}, (error, results, fields) => {
		if (error) cb(error);
		const data = results.map(obj => {
			delete obj.p.User_id;
			obj.p.user = obj.u;
			return Object.assign(obj.p, obj[''] || {});
		})
		cb(error, data, fields)
	}
	);
}

module.exports = { getMultiple, insert };