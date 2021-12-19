const dotenv = require('dotenv')

dotenv.config()

module.exports = {
	port: process.env.PORT || 8080,
	filePath: '/images/',
	sql: {
		user: process.env.SQL_USER,
		password: process.env.SQL_PASSWORD,
		host: process.env.CONNECT_STRING,
		database: process.env.DB_NAME,
		connectionLimit: 10
	},
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	jwtSecret: process.env.JWT_SECRET,
	gmail: {
		email: 'k191308@nu.edu.pk',
		refreshToken: process.env.REFRESH_TOKEN,
		accessToken: process.env.ACCESS_TOKEN
	},
	emailsEnabled: false
}