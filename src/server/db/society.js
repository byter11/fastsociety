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




const getOne = ({ where, value }, cb) => {
	const { conditions, values } = buildConditions(where, 's.');

	db.query(
		`SELECT s.id, s.title, s.description, s.email, s.totalFollows, s.image, u.email headEmail 
		FROM Society s
		LEFT JOIN User u ON (s.head_id = u.id)
		${conditions ? 'WHERE ' + conditions : ''};
		SELECT name, createEvent, deleteEvent, createPost, deletePost, manageMembers, manageChat
		FROM Role
		WHERE Society_id = (SELECT s.id FROM Society s ${conditions ? 'WHERE ' + conditions : ''})
		`,
		[...values, ...values],
		(error, results = [], fields) => {
			if (error) return cb(error);
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
		(error, results = [], fields) => {
			cb(error, results, fields);
		}
	)
}

const getRoles = (id, cb) => {
	db.query(
		`SELECT name, Society_id societyId, createEvent, createPost, deleteEvent, deletePost, manageMembers, manageChat
		FROM Role WHERE Society_id = ?`,
		[id],
		(error, results = []) => {
			cb(error, results);
		}
	)
}

const updateRole = ({ societyId, role, name, value, userId }, cb) => {
	db.query(
		`UPDATE Role SET ?? = ?
		WHERE Society_id = (SELECT id FROM Society WHERE id = ? AND head_id = ?)
		AND name = ?`,
		[name, value, societyId, userId, role],
		(error, results = []) => {
			cb(error, results);
		}
	)
};

const addRole = ({ name, createEvent, createPost, deleteEvent, deletePost, manageMembers, manageChat, societyId, userId }, cb) => {
	const permissions =
		[createEvent, createPost, deleteEvent, deletePost, manageMembers, manageChat, societyId].map(v => v || 0);
	db.query(
		`INSERT INTO Role (name, createEvent, createPost, deleteEvent, deletePost, manageMembers, manageChat, Society_id)
		SELECT ?, ?, ?, ?, ?, ?, ?, ? FROM Society WHERE id = ? AND head_id = ?`,
		[name, ...permissions, societyId, userId],
		(error, results = []) => {
			console.log(error)
			cb(error, results);
		}
	)
}

const removeRole = ({ name, societyId, userId }, cb) => {
	db.query(
		`DELETE FROM Role WHERE name = ? AND Society_id = (SELECT id FROM Society WHERE id = ? AND head_id = ?)`,
		[name, societyId, userId],
		(error, results) => {
			if (!results || !results.affectedRows)
				return cb({ error: 'Not deleted' });
			cb(error);
		}
	)
}


const addMember = ({ email, Role_name, Society_id }, cb) => {
	const values = [email, Role_name, Society_id].filter(v => typeof (v) !== 'undefined')
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

const removeMember = ({ email, Society_id }, cb) => {
	const values = [email, Society_id].filter(v => typeof (v) != 'undefined');
	db.query(
		`DELETE FROM Registration
		WHERE User_id = (Select id FROM User WHERE email = ?)
		AND User_id != (Select head_id FROM Society WHERE id = Society_id)
		AND Society_id = ?`,
		[email, Society_id],
		(error, results) => {
			if (!results || !results.affectedRows)
				return cb({ error: 'Not deleted' });
			cb(error);
		}
	)
}

const getMessages = ({userId, societyId}, cb) => {
	console.log(userId, societyId);
	db.query(
		`SELECT textContent, createdOn, isReply
		FROM Message WHERE User_id = ? AND Society_id = ?
		ORDER BY createdOn asc`,
		[userId, societyId],
		(error, results) => {
			console.log('getMessages', error);
			if(error) return cb(error);
			const messages = {
				me: results.map(m => !m.isReply),
				society: results.map(m => m.isReply)
			}
			cb(null, results);
		}

	)
}

const sendMessage = ({userId, societyId, textContent, isReply}, cb) => {
	db.query(
		`INSERT INTO Message (textContent, User_id, Society_id, isReply)
		VALUES (?, ?, ?, ?)`,
		[textContent, userId, societyId, isReply],
		(error, results) => {
			console.log('sendMessage', error);
			if(error) return cb(error);
			if (!results || !results.affectedRows)
				return cb({ error: 'Not deleted' });
			cb();
		}
	)
}

const getMessageList = (societyId) => {
	db.query(
		`SELECT User_id, image FROM Message LEFT JOIN User ON (User.id = User_id) WHERE Society_id = ?`,
		[societyId],
		(error, results) => {
			console.log('getMessageList', error);
			if(error) return cb(error);
			return cb(results);
		}
	)
}
module.exports = { 
	getOne, 
	getMembers,
	getRoles,
	getMessages, 
	addRole,
	sendMessage,
	removeRole, 
	updateRole, 
	addMember, 
	removeMember, 
	upsert 
};