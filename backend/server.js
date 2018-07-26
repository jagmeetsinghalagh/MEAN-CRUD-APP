// require all the modules we need
const http = require('http');
const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes/routes');
const config = require('./config');

const hostname = config.hostname;
const port = config.port

// Initialize express app
const app = express();

// create and listen to the server
const server = http.createServer(app);
server.listen(port,hostname, () => {
	console.log(`Server Started On http://${hostname}:${port}`);
});

// Connect to the database
const connect = mongoose.connect(config.dbUrl);
connect.then( (db) => {
	console.log("Connected To The Database");
});

// use middlewares
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/issues',router);



