(function() {
	'use strict'

	angular.module('coursesModule')
		.controller('coursesCtrl', ['$scope', 'coursesDataService', '$document', function($scope, coursesDataService, $document) {
			
			$scope.rowName = 'name';
			$scope.reverse = false;

			$scope.addNewCourseAction = function(event) {
				console.log("inside addNewCourseAction()");
				event.stopPropagation();
				$scope.rowName = null;
				$scope.reverse = false;
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

			$scope.deleteCourseAction = function(myCourse, event) {
				console.log("inside deleteCourseAction()");
				event.stopPropagation();
				if (myCourse.hasOwnProperty('id')) {
					coursesDataService.deleteCourse(myCourse).then(function(response) {
						console.log(response);
						$scope.onLoad();
					}, function(error) {

					});
				} else {
					$scope.stopAddingNewCourseAction();
				}	
			};

			$scope.showJsonAction = function() {
				console.log($scope.allCourses);
			};

			$scope.selectRow = function(myCourse) {
				
				_.remove($scope.allCourses, function(course) {
    				return (course.name == null || course.number == null || course.section == null);
				});

				$scope.allCourses.map(function(course) {
					course.isSelected = false;
					if (!course.hasOwnProperty('id')) {
						$scope.saveCourseAction(course);
					}
				});


				myCourse.isSelected = true;
				$scope.unsavedCourseExists = true;
				
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

			$(document).bind('click', function(){
				console.log("inside document.on click");
        		$scope.deselectAllRows();
    		});

			$scope.deselectAllRows = function() {
				console.log("inside delecetAllRows()");
				_.remove($scope.allCourses, function(course) {
    				return (course.name == null || course.number == null || course.section == null);
				});

				$scope.allCourses.map(function(course) {
					course.isSelected = false;
					if (!course.hasOwnProperty('id')) {
						$scope.saveCourseAction(course);
					}
				});

				$scope.unsavedCourseExists = false;
				$scope.$apply();
			};

			$scope.onLoad();

		}]);
}());