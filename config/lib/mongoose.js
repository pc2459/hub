'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
	chalk = require('chalk'),
	path = require('path'),
	mongoose = require('mongoose'),
	async = require('async');


// set up async.auto for seeds so that dependencies can be set and
// things don't erupt in a ball of flame
var loadSeeds = function () {

	// Globbing seed files

	/**
	 * 1. Seed files should be named *.seed.js and be in the server/model folder
	 * 2. Export the seed function as .seed
	 * 		2.1: the files should never seed themselves
	 * 		2.2: the function should take a callback and call it when finished (you can just callback(err))
	 * 3. Export the name of the module as .name
	 * 4. Export dependencies as an array of strings named .dependencies
	 */
	
	var tasks = {};
	
	config.files.server.seeds.forEach(function(modelPath) {
		var module = require(path.resolve(modelPath));
		if (module.dependencies && module.dependencies.length > 0) {

			tasks[module.name] = [ 
				module.dependencies.join(','),
				module.seed
			];
		}

		else {
			tasks[module.name] = module.seed;
		}
	});

	async.auto(
		tasks,
		function(err) {
			if (err) {
				console.log('Seeding error:', err);
			}
		}
	);	
};


// Load the mongoose models
module.exports.loadModels = function() {
	// Globbing model files
	config.files.server.models.forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	loadSeeds();
};

// Initialize Mongoose
module.exports.connect = function(cb) {
	var _this = this;

	var db = mongoose.connect(config.db, function (err) {
		// Log Error
		if (err) {
			console.error(chalk.red('Could not connect to MongoDB!'));
			console.log(err);
		} else {
			// Load modules
			_this.loadModels();

			// Call callback FN
			if (cb) cb(db);
		}
	});
};