(function() {
	'use strict'

	angular.module('coursesModule')
		.controller('coursesCtrl', ['$scope', 'coursesDataService', function($scope, coursesDataService) {
			
			$scope.addNewCourseAction = function() {
				console.log("inside addNewCourseAction()");
				$scope.allCourses.push({
					"name": null,
					"number": null,
					"section": null,
					"isSelected": "true"
				});
				$scope.unsavedCourseExists = true;
			};

			$scope.stopAddingNewCourseAction = function() {
				console.log("inside astoAddingNewCourseAction()");
				$scope.allCourses.pop();
				$scope.unsavedCourseExists = false;
			};

			$scope.saveCourseAction = function(myCourse) {
				console.log("inside saveNewCourseAction()");
				if (myCourse.hasOwnProperty('id')) {
					$scope.updateCourseAction(myCourse);
				} else {
					coursesDataService.saveNewCourse(myCourse).then(function(response) {
						console.log(response);
						$scope.onLoad();
					}, function(error) {

					});
				}
			};

			$scope.updateCourseAction = function(myCourse) {
				console.log("inside updateCourseAction()");
				coursesDataService.updateCourse(myCourse).then(function(response) {
						console.log(response);
						$scope.onLoad();
					}, function(error) {

					});
			};

			$scope.editCourseAction = function(myCourse) {
				console.log("inside editCourseAction()");
				myCourse.isSelected = true;
				$scope.unsavedCourseExists = true;
			};

			$scope.deleteCourseAction = function(myCourse) {
				console.log("inside deleteCourseAction()");
				coursesDataService.deleteCourse(myCourse).then(function(response) {
					console.log(response);
					$scope.onLoad();
				}, function(error) {

				});
			};

			$scope.showJsonAction = function() {
				console.log($scope.allCourses);
			};

			$scope.onLoad = function() {
				console.log("inside onLoad()");
				coursesDataService.fetchAllCourses().then(function(response) {
					console.log(response);
					$scope.allCourses = response;
					$scope.unsavedCourseExists = false;
				}, function(error) {

				});
			};

			$scope.onLoad();

		}]);
}());