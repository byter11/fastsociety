const db = require("./db");
const { buildConditions } = require("../utils");

const insert = (values, cb) => {
  const { textContent, createdOn, User_id, Event_id } = values;

  db.query(
    {
      sql: `INSERT INTO Comment
		(textContent, createdOn, User_id, Event_id)
		VALUES (?, ?, ?, ?)`,
      values: [textContent, createdOn, User_id, Event_id],
    },
    (error) => {
      cb(error);
    }
  );
};

module.exports = { insert };