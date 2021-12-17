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
	const fields = 'e.id, e.venue, e.textContent, e.createdOn, e.startTime, e.endTime, e.image, s.id, s.title, s.image';
	db.query({
		sql: `SELECT ${fields},
		avg(r.stars) as rating, (SELECT stars FROM Review WHERE User_id = ? AND Event_id = e.id) AS userRating
		FROM Event e
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

const deleteEvent = ({id, user}, cb) => {
	db.query(
		`DELETE FROM Event
		WHERE id = (
			SELECT e.id FROM
			(SELECT id, Society_id FROM Event WHERE id = ?) e
				LEFT JOIN Society s ON (s.id = e.Society_id)
				LEFT JOIN Registration r ON (r.Society_id = s.id AND r.User_id = ?)
				LEFT JOIN Role role ON (role.name = r.Role_name AND role.Society_id = r.Society_id)
				WHERE role.deleteEvent = 1
		)`,
		[id, user],
		(error, results) => {
			if(!results || !results.affectedRows)
				return cb({error: 'Not deleted'});
			cb(error)
		}
			
	)
}


module.exports = {getMultiple, insert, deleteEvent};