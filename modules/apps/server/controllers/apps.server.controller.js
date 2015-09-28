'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  App = mongoose.model('App'),
  _ = require('lodash'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Render all apps
 */
exports.renderAll = function(req, res) { 

  var user = req.user;
  console.log('<<<<<?', user);
	
	App.find().populate('owner', 'username').exec(function(err, apps) {

		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else {
			res.json(apps);
		}
	});
};


