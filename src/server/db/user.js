const { useRouter } = require('next/router');
const { buildConditions } = require('../utils');
const db = require('./db');

const upsert = (data, cb) => {
	const {id, name, email, image} = data;
	db.query(
		`INSERT INTO User (id, name, email, image)
		 VALUES (?, ?, ?, ?)
		 ON DUPLICATE KEY UPDATE
		 name = ?, image = ?`,
		[id, name, email, image, name, image],
		(error, results=[], fields) => {
			cb(error, results[0]);
		}
	);
}

const getOne = ({where}, cb) => {
	const {conditions, values} = buildConditions(where, 'u.');
	db.query({
			sql: `SELECT u.name, u.email, u.image
			FROM User u
			${conditions ? 'WHERE ' + conditions : ''};
			SELECT s.id, s.title, s.image, r.name, r.createPost, r.deletePost, r.deleteEvent, r.createEvent, r.manageMembers, r.manageChat
			FROM Registration reg
			LEFT JOIN User u ON u.id = reg.User_id
			LEFT JOIN Society s ON s.id = reg.Society_id
			LEFT JOIN Role r ON r.name = reg.Role_name AND r.Society_id = reg.Society_id
			${conditions ? 'WHERE ' + conditions : ''}`,
			values: [...values, ...values],
			nestTables: true
		},
		(error, results=[], fields) => {
			if(error)
				return cb(error)
			
			const user = (results[0][0] || {}).u;
			if(!user)
				return cb("User not found");

			const societies = results[1].map(e => {
				e.s.role = e.r;
				return e.s;
			})
			
			user.societies = societies;
			
			cb(error, user, fields)
		}
	);
}

module.exports = {upsert, getOne}