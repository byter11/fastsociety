const db = require('./db');

const getUserPermissions = (userId) => {
	db.query(
		`SELECT Society_id, name, createEvent, createPost, deleteEvent, deletePost
		JOIN Society on Society_id = id
		FROM Registration WHERE User_id = ?`,
		[userId],
		(error, results=[], fields) => {
			cb(error, results[0], fields)
		}
	);
}

module.exports = {getUserPermissions};