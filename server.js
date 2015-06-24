'use strict';

/**
 * Module dependencies.
 */
var config = require('./config/config'),
	mongoose = require('./config/lib/mongoose'),
	express = require('./config/lib/express');

// Initialize mongoose
mongoose.connect(function (db) {
	// Initialize express
	var app = express.init(db);

	// Start the app by listening on <port>
	app.listen(config.port);
	// Seed the DB
	// Get this working in mongoose config file
	require('./modules/users/server/models/user.server.seeds.js');

	// Logging initialization
	console.log('Marketing Hub running on port ' + config.port);
});