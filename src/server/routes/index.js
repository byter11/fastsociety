module.exports = (app) => {
	app.use('/oauth', require('./oauth')),
	app.use('/user', require('./user'))
};
	