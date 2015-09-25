'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// Apps Routes
	var apps = require('../controllers/apps.server.controller');

	// All apps
	app.route('/api/apps').get(apps.renderAll);

	// // Finish by binding the user middleware
	// app.param('userId', apps.userByID);
};
