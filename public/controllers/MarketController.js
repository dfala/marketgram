angular.module('marketgram')

.controller('MarketController',
function ($scope, dataService, emailsService) {

	$scope.email = {};

	// Initiate page
	dataService.getAllData()
	.then(function (response) {
		console.info(response);
		$scope.users = response;
	})
	.catch(function (err) {
		console.error(err);
	})

	$scope.openModal = function (user) {
		$scope.email.address = user.local.email;
		$('#myModal').modal('show');
	}


	$scope.sendEmail = function () {
		emailsService.sendEmail($scope.email)
		.then(function (response) {
			console.info('Email sent response: ', response);
			alert('Email sent!');
			$('#myModal').modal('hide');
		})
		.catch(function (err) {
			console.error(err);
		});
	}



	// Clean email values
	$('#myModal').on('hidden.bs.modal', function () {
	    $scope.email = {};
	})

});