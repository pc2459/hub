'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * App Schema
 */
var AppSchema = new Schema({
	name: {
		type: String
	},
	appId: {
		type: String,
		unique: true
	},
	//TODO-FO: code server/client side image upload (ng-file-upload and node-multiparty)
	thumbnail: {
		type: String,
		trim: true
	},
	url: {
		type: String
	},
	owner: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	permissions: {
		type: [{
			type: Schema.ObjectId,
			ref: 'User'
		}]
	},
	public: {
		type: Boolean,
		default: true
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	}
});

/**
 * Hook a pre save method to set public flag
 */
AppSchema.pre('save', function(next) {
	if (this.permissions.length > 0) {
		this.public = false;
	}

	next();
});

mongoose.model('App', AppSchema);
