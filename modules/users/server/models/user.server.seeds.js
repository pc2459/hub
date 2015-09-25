'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	_ = require('lodash'),
	async = require('async');


var dummyUsers = [
	{
		firstName: 'Test1',
		lastName: '1Surname',
		email: 'test1@test.com',
		username: 'company1',
		password: 'company1',
		provider: 'local'
	},
	{
		firstName: 'Test2',
		lastName: '2Surname',
		email: 'test2@test.com',
		username: 'company2',
		password: 'company2',
		provider: 'local'
	},
	{
		firstName: 'Test3',
		lastName: '3Surname',
		email: 'test3@test.com',
		username: 'company3',
		password: 'company3',
		provider: 'local'
	}
];

// Set up the permissions so that Company1 can view Company2/3,
// Company2 can view Company3, and Company3 has no permissions.

var company1Id,
	company2Id,
	company3Id;

// Update permissions for a [company] given an array of _ids [permissions]
exports.updatePermissions = function(company, permissions, callback)
{
	var query = { 'username': company};
	var update = { $pushAll: {'permissions': permissions } };
	var options = { new: true};
	var callbackfn = function(err, company) {
		if (err) return callback(err);
		callback(null, {'username': company.username, 'permissions': company.permissions});
	};
	return User.findOneAndUpdate(query, update, options, callbackfn);
};

exports.name = 'User';
exports.dependencies = null;
exports.seed = function(callback) {

	async.waterfall([

		// Seed the database if less than 3 users are found
		function(cb){
			User.find({}, function(err, results){
				if(results.length < 3){
					async.map(dummyUsers, function(user, callback)
						{
							var newUser = new User(user);
							newUser.displayName = user.firstName + ' ' + user.lastName;
							newUser.save(function(err, newUser) { 
								if (err) return cb(err);
								callback(null, { 'username': newUser.username, 'id': newUser._id }); 
							});
						},
					function(err, results){
						if (err) return cb(err);
						cb(null, results, false);
					});
				}
				else {
					var users = [];
					_.each(results, function(user){
						users.push({'username': user.username, 'id': user._id, 'permissions': user.permissions});
					});
					console.log('User model: DB already seeded with ', JSON.stringify(users, null, '\t'));
					cb(null, null, true);
				}
			});
		},

		// get the mongo-generated IDs (== the company id, for now)
		function(users, skip, cb) {
			if (skip) {
				return cb(null, users, skip);
			}
			User.find({}, function(err, results){
				if (err) return cb(err);
				company1Id = results[0].id;
				company2Id = results[1].id;
				company3Id = results[2].id;
				cb(null, users, false);
			});

		},

		// set permissions
		function(users, skip, cb) {

			if (skip) {
				return cb(null);
			}
			async.parallel([
				async.apply(exports.updatePermissions, 'company1', [company2Id, company3Id]),
				async.apply(exports.updatePermissions, 'company2', [company3Id])
			],
			function(err, results){
				if (err) return cb(err);
				cb(null, results);
			});
		}
	],
	function(err, done){
		if (err) console.log('User model: an error occurred');
		if (done) {
			console.log('User model: Seeded DB with ', JSON.stringify(done[0], null, '\t'), ' with permissions ', JSON.stringify(done[2], null, '\t'));
		}
		callback(err);
	});

};

