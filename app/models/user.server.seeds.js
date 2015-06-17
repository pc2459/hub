'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	_ = require('lodash');


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

// Seed the database if less than 3 users are found

User.find({}, function(err, results){
	if(results.length < 3){
		_.each(dummyUsers, function(user)
		{
			var newUser = new User(user);
			newUser.displayName = user.firstName + ' ' + user.lastName;
			newUser.save();
		});
	}
});

// Set up the permissions so that Company1 can view Company2/3,
// Company2 can view Company3, and Company3 has no permissions.

var company1Id,
	company2Id,
	company3Id;

User.find({}).sort('username').exec(function(err, results){

	company1Id = results[0].id;
	company2Id = results[1].id;
	company3Id = results[2].id;
});


