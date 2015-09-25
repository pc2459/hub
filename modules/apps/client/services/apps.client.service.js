'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('apps').factory('Apps', ['$resource',
	function($resource) {
		return $resource('api/apps', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);