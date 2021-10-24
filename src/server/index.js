const express = require('express');
const config = require('./config');
// const os = require('os');

const app = express();
const routes = require('./routes')(app);

app.use(express.static('public'));

app.listen(config.port, () => console.log(`Listening on port ${config.port}!`));
