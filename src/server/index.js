const express = require('express');
const config = require('./config');
const routes = require('./routes');
const db = require('./db')
// const os = require('os');

const app = express();
db().then((client) => 
	routes.register(app, client)
);

app.use(express.static('public'));

app.listen(config.port, () => console.log(`Listening on port ${config.port}!`));
