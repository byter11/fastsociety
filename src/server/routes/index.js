module.exports = (app) => {
	app.use('/oauth', require('./oauth')),
	app.use('/api/user', require('./user')),
	app.use('/api/society', require('./society')),
	app.use('/api/event', require('./event'))
};
	