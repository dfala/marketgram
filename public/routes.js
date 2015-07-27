angular.module('marketgram')

.config(function ($routeProvider) {

	function checkAuth ($http, $location, $q) {
		var deferred = $q.defer();

		$http.get('/api/auth')
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
			$location.path('/')
		});

		return deferred.promise;
	}

	$routeProvider
	.when('/', {
		templateUrl: '/public/templates/home.html',
		controller: 'HomeController'
	})

	.when('/market', {
		templateUrl: '/public/templates/market.html',
		controller: 'MarketController'
		// resolve: {
		// 	user: checkAuth
		// }
	})

	.otherwise('/');
})