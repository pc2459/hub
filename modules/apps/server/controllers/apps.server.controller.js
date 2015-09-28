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

  if (!user) {
    user = {};
    user._id = null;
  }
	
	App
    .find({ 
      $or: [
        {'public': true},
        {'permissions': user._id},
        {'owner': user._id}     
      ]
    })
    .populate('owner', 'username')
    .exec(function(err, apps) {

      console.log('<<<<', apps);

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


