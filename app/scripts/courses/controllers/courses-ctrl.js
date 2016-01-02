(function() {
	'use strict'

	angular.module('coursesModule')
		.controller('coursesCtrl', ['$scope', 'coursesDataService', function($scope, coursesDataService) {

			$scope.showNewCourseRow = false;
			$scope.testCollapseVariable = true;
			$scope.newCourseObject = {
				"courseName": "",
				"courseNumber": "",
				"sectionNumber": ""
			};

			$scope.addNewCourseAction = function() {
				console.log("inside addNewCourseAction()");
				$scope.showNewCourseRow = true;
				$scope.testCollapseVariable = false;
				console.log($scope.newCourseObject);
			};

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