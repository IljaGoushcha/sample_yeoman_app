(function() {
	'use strict';

	angular
		.module('studentsModule')
		.controller('StudentsCtrl', ['$scope', function($scope) {
			console.log("loaded students controller");
		}]);
}());