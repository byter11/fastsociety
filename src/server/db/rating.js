const db = require('./db');

const upsert = (data, cb) => {
	const {eventId, userId, rating} = data;
	db.query(
		`INSERT INTO Review (User_id, Event_id, stars)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE
         stars = ?`,
		[userId, eventId, rating, rating],
		(error, results=[], fields) => {
			cb(error, results[0]);
		}
	);
}

module.exports = {upsert};