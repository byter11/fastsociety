const dotenv = require('dotenv')

dotenv.config()

module.exports = {
	port: process.env.PORT || 8080,
	sql: {
		user: process.env.SQL_USER,
		password: process.env.SQL_PASSWORD,
		host: process.env.CONNECT_STRING,
		database: process.env.DB_NAME,
		connectionLimit: 10
	},
	clientId: process.env.CLIENT_ID,
	jwtSecret: process.env.JWT_SECRET
}