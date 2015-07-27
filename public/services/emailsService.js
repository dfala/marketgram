angular.module('marketgram')

.factory('emailsService', function ($http, $q) {
	var service = {};

	service.sendEmail = function (email) {
		if (!email.address || !email.content) return console.warn('Data missing to send email');
		var deferred = $q.defer();

		var email = {
			html: email.content,
			subject: 'Instagram inquiry',
			to: [{
				email: email.address,
				type: 'to'
			}]
		}

		$http.post('/api/email', email)
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