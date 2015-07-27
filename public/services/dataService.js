angular.module('marketgram')

.factory('dataService', function ($http, $q) {
	var service = {};

	service.getAllData = function () {
		var deferred = $q.defer();

		$http.get('/api/users')
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	return service;
});