angular.module('marketgram')

.directive('focusHere', function () {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.focus();
		}
	}
});
