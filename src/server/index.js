const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const config = require('./config');
// const os = require('os');

const app = next({ dev, dir: './src/client' })
const handle = app.getRequestHandler();



app.prepare()
.then(() => {
	const server = express();

	const routes = require('./routes')(server);
	
	server.get('*', (req, res) => {
		return handle(req, res)
	});

	
	// app.use(express.static('public'));
	server.listen(config.port, (err) => { 
		// if (err) throw err;
		console.log(`Listening on port ${config.port}!`);
	});
});

