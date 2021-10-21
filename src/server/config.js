const dotenv = require('dotenv')

dotenv.config()

module.exports = {
	port: process.env.PORT || 8080,
	sql: {
		user: process.env.SQL_USER,
		password: process.env.SQL_PASSWORD,
		conenctString: process.env.CONNECT_STRING,
		databaseName: process.env.DB_NAME
	}
}