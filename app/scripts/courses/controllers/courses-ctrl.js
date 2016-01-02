(function() {
	'use strict'

	angular.module('coursesModule')
		.controller('coursesCtrl', ['$scope', 'coursesDataService', function($scope, coursesDataService) {

			$scope.onLoad = function() {
				console.log("inside onLoad()");
				// console.log(coursesDataService.fetchAllCourses());
			};

			$scope.onLoad();

		}]);
}());