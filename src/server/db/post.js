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
		sql: `SELECT p.id, p.textContent, p.image, p.Event_id,
		u.email, u.name, u.image
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
			obj.p.user.id = obj.p.user.email.split('@')[0];
			return Object.assign(obj.p, obj[''] || {});
		})
		cb(error, data, fields)
	}
	);
}

const deletePost = ({id, user}, cb) => {
	db.query(
		`DELETE FROM Post
		WHERE id = (
			SELECT p.id FROM
			(SELECT id, Event_id FROM Post WHERE id = ?) p
				LEFT JOIN Event e ON (e.id = p.Event_id)
				LEFT JOIN Society s ON (s.id = e.Society_id)
				LEFT JOIN Registration r ON (r.Society_id = s.id AND r.User_id = ?)
				LEFT JOIN Role role ON (role.name = r.Role_name AND role.Society_id = r.Society_id)
				WHERE role.deletePost = 1
		)`,
		[id, user],
		(error, results) => {
			console.log(error)
			if(!results || !results.affectedRows)
				return cb({error: 'Not deleted'});
			cb(error);
		}
	)
}
module.exports = { getMultiple, insert, deletePost };