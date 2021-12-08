const db = require('./db');
const { buildConditions } = require('../utils');

const getOne = ({where, value}, cb) => {
	const {conditions, values} = buildConditions(where);

	db.query(
		`SELECT id, title, description, email, totalFollows, image
		FROM society
		${conditions ? 'WHERE ' + conditions : ''}`,
		values,
		(error, results=[], fields) => {
			cb(error, results[0], fields)
		}
	);
}

const getMembers = (societyId, cb) => {
	db.query(
		`SELECT u.name, u.email, u.image,
		r.name AS roleName
		FROM user u
		JOIN registration reg ON u.id = reg.User_id
		JOIN role r ON r.id = reg.Role_id
		WHERE reg.Society_id = ?`,
		[societyId],
		(error, results=[], fields) => {
			console.log(error, results);
			cb(error, results, fields);
		}
	)
}

module.exports = {getOne, getMembers};