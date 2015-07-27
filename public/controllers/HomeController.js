angular.module('marketgram')

.controller('HomeController',
function ($scope, authService, $location) {


	$scope.login = function(user){
		authService.login(user)
		.then(function(response){
			$location.path('/market');
		})
		.catch(function (err) {
			throw new Error(err);
		})
	}


	$scope.createUser = function (user) {
		authService.createUser(user)
		.then(function (response) {
			// Temp store user info
			console.info('Account created successfully.');

			// TODO: send them to the right place
			$location.path('/market');
		})
		.catch(function (err) {
			throw new Error(err);
		});
	};


});