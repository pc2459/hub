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
			console.log('rendering all');
			vm.apps = Apps.query();
			console.log('>>>>', vm.apps);
			console.log('finished querying');
		}

		// // Update a user profile
		// $scope.updateUserProfile = function(isValid) {
		// 	if (isValid){
		// 		$scope.success = $scope.error = null;
		// 		var user = new Users($scope.user);
	
		// 		user.$update(function(response) {
		// 			$scope.success = true;
		// 			Authentication.user = response;
		// 		}, function(response) {
		// 			$scope.error = response.data.message;
		// 		});
		// 	} else {
		// 		$scope.submitted = true;
		// 	}
		// };

		// // Change user password
		// $scope.changeUserPassword = function() {
		// 	$scope.success = $scope.error = null;

		// 	$http.post('/api/users/password', $scope.passwordDetails).success(function(response) {
		// 		// If successful show success message and clear form
		// 		$scope.success = true;
		// 		$scope.passwordDetails = null;
		// 	}).error(function(response) {
		// 		$scope.error = response.message;
		// 	});
		// };
	}
]);
