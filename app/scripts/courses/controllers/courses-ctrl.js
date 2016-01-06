(function() {
	'use strict'

	angular.module('coursesModule')
		.controller('coursesCtrl', ['$scope', 'coursesDataService', '$document', 'hotkeys', function($scope, coursesDataService, $document, hotkeys) {
			// use ng-change
			$scope.columnName = 'name';
			$scope.reverse = false;

			hotkeys.bindTo($scope)
				.add({
					combo: 'esc',
					description: 'test',
					callback: function() {
						console.log("esc pressed");
					}
				});

			$scope.deselectAllRowsB = function(myCourse) {
				$scope.allCourses.map(function(course) {
					if (course.id == myCourse.id) {
					} else {
						course.isSelected = false;
					}
				});
			};



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

			$scope.saveCourseAction = function(myCourse, event) {
				console.log("inside saveNewCourseAction()");
				if (event) {
					event.stopPropagation();
				}
				
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

			$scope.editCourseAction = function(myCourse, event) {
				console.log("inside editCourseAction()");
				event.stopPropagation();
				myCourse.isSelected = true;
				$scope.unsavedCourseExists = true;
			};

			$scope.updateCourseAction = function(myCourse) {
				console.log("inside updateCourseAction()");
				coursesDataService.updateCourse(myCourse).then(function(response) {
						console.log(response);
						$scope.onLoad();
					}, function(error) {

					});
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

			$scope.stopAddingNewCourseAction = function() {
				console.log("inside astoAddingNewCourseAction()");
				$scope.allCourses.pop();
				$scope.unsavedCourseExists = false;
			};

			$scope.selectRow = function(myCourse, event) {
				event.stopPropagation();

				if (myCourse.isSelected == true) {
					console.log("row already selected");
				} else {
					$scope.deselectAllRows();

					myCourse.isSelected = true;
					$scope.unsavedCourseExists = true;
				}
			};

			$scope.deselectAllRows = function(course) {
				console.log("inside deselectAllRows()");
				_.remove($scope.allCourses, function(course) {
    				return (course.name == null || course.number == null || course.section == null);
				});

				$scope.allCourses.map(function(course) {
					if (course.isSelected && course.hasOwnProperty('id')) {
						$scope.updateCourseAction(course);
					} else if (course.isSelected && !course.hasOwnProperty('id')) {
						$scope.saveCourseAction(course);
					}

					
					course.isSelected = false;
				});

				$scope.unsavedCourseExists = false;
			};

			$(document).bind('click', function(){
				console.log("inside document.on click");
        		$scope.deselectAllRows();
    		});

			$scope.onLoad = function() {
				console.log("inside onLoad()");
				coursesDataService.fetchAllCourses().then(function(response) {
					$scope.allCourses = response;
					$scope.unsavedCourseExists = false;
				}, function(error) {
					console.log("error loading courses");
				});
			};

			$scope.onLoad();

		}]);
}());