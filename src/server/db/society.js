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

module.exports = {getOne, getMembers, upsert};