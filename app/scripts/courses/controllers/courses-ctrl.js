(function() {
	'use strict'

	angular.module('coursesModule')
		.controller('coursesCtrl', ['$scope', 'coursesDataService', function($scope, coursesDataService) {

			$scope.onLoad = function() {
				console.log("inside onLoad()");
				coursesDataService.fetchAllCourses().then(function(response) {
					console.log(response);
					$scope.allCourses = response;
				}, function(error) {

				});
			};

			$scope.onLoad();

		}]);
}());