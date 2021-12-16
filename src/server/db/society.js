const db = require('./db');
const { buildConditions } = require('../utils');

const upsert = (data, cb) => {
  const { title, description, email, totalFollows, image, headId } = data;
  db.query(
    `INSERT INTO Society (title, description, email, totalFollows, image, headId)
		 VALUES (?, ?, ?, ?, ?, ?)
		 ON DUPLICATE KEY UPDATE
		 title = ?, description = ?, totalFollows = ?, image = ?, headId = ?`,
    [title, description, email, totalFollows, image, headId],
    (error, results = [], fields) => {
      cb(error, results[0]);
    }
  );
};




const getOne = ({where, value}, cb) => {
	const {conditions, values} = buildConditions(where);

	db.query(
		`SELECT id, title, description, email, totalFollows, image
		FROM Society
		${conditions ? 'WHERE ' + conditions : ''};
		SELECT name, createEvent, deleteEvent, createPost, deletePost, manageMembers, manageChat
		FROM Role
		WHERE Society_id = (SELECT id FROM Society ${conditions ? 'WHERE ' + conditions : ''})
		`,
		[...values, ...values],
		(error, results=[], fields) => {
			if(error) return cb(error);
			const society = results[0][0];
			society.roles = results[1];
			
			cb(error, society, fields)
		}
	);
}

const getMembers = (societyId, cb) => {
	db.query(
		`SELECT u.name, u.email, u.image,
		r.name AS roleName
		FROM User u
		JOIN Registration reg ON u.id = reg.User_id
		JOIN Role r ON r.name = reg.Role_name AND r.Society_id = reg.Society_id
		WHERE reg.Society_id = ?`,
		[societyId],
		(error, results=[], fields) => {
			cb(error, results, fields);
		}
	)
}

const addMember = ({email, Role_name, Society_id}, cb) => {
	const values = [email, Role_name, Society_id].filter(v => typeof(v) !== 'undefined')
	db.query(
		`INSERT INTO Registration (User_id, Role_name, Society_id)
		VALUES (
			(SELECT id FROM User WHERE email = ? LIMIT 1), 
			?, 
			?
		)`,
		values,
		(error, results) => {
			cb(error, results);
		}
	)
}

const removeMember = ({email, Society_id}, cb) => {
	const values = [email, Society_id].filter(v => typeof(v) != 'undefined');
	db.query(
		`DELETE FROM Registration
		WHERE User_id = (Select id FROM User WHERE email = ?)
		AND User_id != (Select head_id FROM Society WHERE id = Society_id)
		AND Society_id = ?`,
		[email, Society_id],
		(error, results) => {
			if(!results || !results.affectedRows)
				return cb({error: 'Not deleted'});
			cb(error);
		}
	)
}

module.exports = {getOne, getMembers, addMember, removeMember, upsert};