'use strict';

var mongoose = require('mongoose'),
	path = require('path'),
	App = mongoose.model('App'),
	User = mongoose.model('User'),
	_ = require('lodash'),
	async = require('async');

// Set up the permissions so that Company1 can view Company2/3,
// Company2 can view Company3, and Company3 has no permissions.
var company1Id,
	company2Id,
	company3Id,
	dummyApps;

var setDummyAppData = function() {

	dummyApps = [
		{
			name: 'App 1',
			appId: 'some_app_id1',
			url: 'localhost/someurl',
			owner: company1Id
		},
		{
			name: 'App 2',
			appId: 'some_app_id2',
			url: 'localhost/someurl',
			owner: company1Id,
			private: true
		},
		{
			name: 'App 3',
			appId: 'some_app_id3',
			url: 'localhost/someurl',
			owner: company1Id,
			private: true
		},
		{
			name: 'App 4',
			appId: 'some_app_id4',
			url: 'localhost/someurl',
			owner: company2Id,
		},
		{
			name: 'App 5',
			appId: 'some_app_id5',
			url: 'localhost/someurl',
			owner: company2Id,
			permissions: [company1Id]
		},
		{
			name: 'App 6',
			appId: 'some_app_id6',
			url: 'localhost/someurl',
			owner: company2Id,
			private: true
		},
		{
			name: 'App 7',
			appId: 'some_app_id7',
			url: 'localhost/someurl',
			owner: company3Id
		},
		{
			name: 'App 8',
			appId: 'some_app_id8',
			url: 'localhost/someurl',
			owner: company3Id,
			permissions: [company1Id, company2Id]
		},
		{
			name: 'App 9',
			appId: 'some_app_id9',
			url: 'localhost/someurl',
			owner: company3Id,
			private: true
		}
	];
};

exports.name = 'App';

exports.dependencies = ['User'];

exports.seed = function(callback) {

	async.series([

		// get the mongo-generated company IDs (== the company id, for now)
		function(cb) {
			User.find({}, function(err, results){
				if (err) return cb(err);

				if (results.length >= 3) {
					company1Id = results[0].id;
					company2Id = results[1].id;
					company3Id = results[2].id;
					setDummyAppData();
					cb(null);
				}

				// If there are no users, seed the users database
				else {
					cb(new Error('Something has gone wrong in the seed file - Users should have seeded first.'));
				}
			});
		},

		// Seed the database if no apps are found
		function(cb){
			App.find({}, function(err, results){

				if (err) return cb(err);

				if(results.length < 1){
					async.map(dummyApps, function(app, callback)
						{
							var newApp = new App(app);
							newApp.save(function(err, savedApp) {
								if (err) return cb(err);
								callback(null, { 'name:': savedApp.name, 'id': savedApp._id, 'permissions': savedApp.permissions, 'private': savedApp.private });
							});
						},

					function(err, results){
						if (err) return cb(err);
						cb(null, results);
					});
				}
				else {
					var apps = [];
					_.each(results, function(app){
						apps.push({'name': app.name, 'id': app._id, 'permissions': app.permissions, 'private': app.private});
					});
					console.log('App model: DB already seeded with ', JSON.stringify(apps, null, '\t'));
					cb(null);
				}
			});
		}
	],
	function(err, done){
		if (err) console.log('Error:', err);
		if (done.length >= 2 && done[1]) {
			console.log('App model: Seeded DB with ', JSON.stringify(done, null, '\t'));
		}
		callback(err);
	});

};

