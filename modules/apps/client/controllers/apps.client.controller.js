'use strict';

angular.module('apps').controller('AppsController', ['$http', '$location', 'Apps', 'Authentication',
	function($http, $location, Apps, Authentication) {
		
		var vm = this;

		vm.user = Authentication.user;
		console.log('User:', vm.user);
		vm.apps = [];
		vm.renderAll = renderAll;

		/*jshint -W003  */
		function renderAll() {
			vm.apps = Apps.query();
		}

	}
]);
