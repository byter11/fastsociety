module.exports = (app) => {
	app.use('/oauth', require('./oauth')),
	app.use('/api/user', require('./user')),
	app.use('/api/society', require('./society')),
	app.use('/api/event', require('./event')),
	app.use('/api/event/:eventId/post', require('./post')),
	app.use('/api/event/:eventId/comment', require('./comment')),
	app.use('/api/event/:eventId/rating', require('./rating'))
};