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
	db.query(
		`SELECT u.name, u.email, u.image
		FROM User u
		${conditions ? 'WHERE ' + conditions : ''};
		SELECT s.id, s.title, s.image, r.id AS roleId, r.name, r.createPost, r.createEvent
		FROM Registration reg
		LEFT JOIN User u ON u.id = reg.User_id
		LEFT JOIN Society s ON s.id = reg.Society_id
		LEFT JOIN Role r ON r.id = reg.Role_id
		${conditions ? 'WHERE ' + conditions : ''}`,
		[...values, ...values],
		(error, results=[], fields) => {
			if(error)
				return cb(error)
			
			const user = results[0][0];
			if(!user)
				return cb("User not found");
			// console.log(results[1]);
			user.societies = results[1].map(obj => ({
				id: obj.id, title: obj.title, image: obj.image,
				role: {
					id: obj.roleId, 
					name: obj.name, 
					createPost: obj.createPost, 
					createEvent: obj.createEvent
				}
			}));
			// console.log(user);
			cb(error, user, fields)
		}
	);
}

module.exports = {upsert, getOne}