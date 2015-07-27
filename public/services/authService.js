angular.module('marketgram')

.service('authService', function ($http, $q) {

	this.createUser = function(user) {
		var deferred = $q.defer();

		if (user.instagramAccount) {
			user.isSeller = true;
		} else {
			user.isSeller = false;
		}

		$http.post('/api/user', user)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	this.login = function(email, password) {
		var deferred = $q.defer();
		
		var data = {
			email: email,
			password: password
		}

		$http.post('/auth/login', data)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}
})