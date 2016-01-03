(function() {
	'use strict'

	angular.module('coursesModule')
		.controller('coursesCtrl', ['$scope', 'coursesDataService', function($scope, coursesDataService) {

			$scope.showNewCourseRow = false;
			$scope.testCollapseVariable = true;
			
			$scope.addNewCourseAction = function() {
				console.log("inside addNewCourseAction()");
				$scope.showNewCourseRow = true;
				$scope.testCollapseVariable = false;
			};

			$scope.saveNewCourseAction = function(newCourse) {
				console.log("inside saveNewCourseAction()");
				coursesDataService.saveNewCourse(newCourse).then(function(response) {
					console.log(response);
				}, function(error) {

				});
			};

			$scope.deleteCourseAction = function(myCourse) {
				console.log("inside deleteCourseAction()");
				coursesDataService.deleteCourse(myCourse).then(function(response) {
					console.log(response);
				}, function(error) {

				});
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