'use strict';

// Setting up route
angular.module('apps').config(['$stateProvider',
	function ($stateProvider) {
		// Users state routing
		$stateProvider.
			state('apps', {
				abstract: false,
				url: '/apps',
				templateUrl: 'modules/apps/views/apps.client.view.html'
			});
			
			// TODO-FO: single app view
			// state('settings.password', {
			// 	url: '/apps/',
			// 	templateUrl: 'modules/apps/views/settings/app.client.view.html'
			// });
	}
]);
