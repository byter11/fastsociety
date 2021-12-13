const db = require("./db");
const { buildConditions } = require("../utils");

const insert = (values, cb) => {
  const { textContent,  User_id, Event_id } = values;

  db.query(
    {
      sql: `INSERT INTO Comment
		(textContent, User_id, Event_id)
		VALUES (?, ?, ?)`,
      values: [textContent, User_id, Event_id],
    },
    (error, insertion) => {
      getMultiple({where:{id: insertion.insertId}, limit:1}, (err, results) => {
        cb(error, results[0]);
      })
      
    }
  );
};

const getMultiple = ({where={}, limit=2, offset=0, user=''}, cb) => {
  const {conditions, values} = buildConditions(where, 'c.');
	db.query({
		sql: `SELECT c.id commentId, c.textContent, u.id userId, c.createdOn, u.image, u.name, u.email
          FROM Comment c
          LEFT JOIN User u ON u.id = c.User_id
		      ${conditions ? 'WHERE ' + conditions : ''}
          ORDER BY createdOn desc
          LIMIT ?, ?`, 
		values: [...values, offset, limit],
	},(error, results, fields) => {
      // console.log('db/comment.js: ', error, results);
			if (error) cb(error);

			cb(error, results, fields);
		}
	);
}

module.exports = { insert, getMultiple };