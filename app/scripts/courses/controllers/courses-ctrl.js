(function() {
	'use strict'

	angular.module('coursesModule')
		.controller('CoursesCtrl', ['$scope', 'coursesDataService', '$document', 'hotkeys', function($scope, coursesDataService, $document, hotkeys) {
			
			var vm = this;


			vm.columnName = 'name';
			vm.reverse = false;

			hotkeys.bindTo($scope)
				.add({
					combo: 'ctrl+a',
					description: 'print allCourses',
					callback: function() {
						console.log(vm.allCourses);
					}
				})
				.add({
					combo: 'esc',
					description: 'esc action, deselect all rows',
					callback: function() {
						vm.deselectAllRows();
					}
				});

			vm.updateCourse = function(myCourse) {
				coursesDataService.updateCourse(myCourse).then(function(response) {
						console.log(response);
						vm.onLoad();
					}, function(error) {
						console.log("something went wrong when updating a course");
					});
			};

			vm.addNewCourse = function(event) {
				event.stopPropagation();
				
				vm.deselectAllRows();

				vm.allCourses.push({
					"name": null,
					"number": null,
					"section": null,
					"isSelected": true,
					"isDirty": false
				});
				vm.columnName = null;
				vm.reverse = false;
			};

			vm.createCourse = function(myCourse) {
				coursesDataService.saveNewCourse(myCourse).then(function(response) {
						console.log(response);
						vm.onLoad();
					}, function(error) {
					});
			};

			vm.deleteCourse = function(myCourse, event) {
				console.log("inside deleteCourse()");
				event.stopPropagation();
				if (myCourse.hasOwnProperty('id')) {
					coursesDataService.deleteCourse(myCourse).then(function(response) {
						console.log(response);
						vm.onLoad();
					}, function(error) {

					});
				} else {
					vm.stopAddingNewCourseAction();
				}	
			};

			vm.stopAddingNewCourseAction = function() {
				console.log("inside astoAddingNewCourseAction()");
				vm.allCourses.pop();
			};

			vm.selectCourse = function(myCourse, event) {
				event.stopPropagation();

				if (myCourse.isSelected == true) {
					console.log("row already selected");
				} else {
					vm.deselectAllRows(event);
					myCourse.isSelected = true;
				}
			};

			vm.deselectAllRows = function() {
				console.log("inside deselectAllRows()");
				_.remove(vm.allCourses, function(course) {
    				return (course.name == null || course.number == null || course.section == null);
				});

				vm.allCourses.map(function(course) {
					if (course.isSelected && course.hasOwnProperty('id') && course.isDirty) {
						vm.updateCourse(course);
					} else if (course.isSelected && !course.hasOwnProperty('id') && course.isDirty) {
						vm.createCourse(course);
					}
					course.isSelected = false;
				});
			};

			$document.bind('mousedown', function(){
				console.log("inside document.bind mousedown");
        		vm.deselectAllRows();
        		$scope.$apply();
    		});

			vm.onLoad = function() {
				console.log("inside onLoad()");
				coursesDataService.fetchAllCourses().then(function(response) {
					vm.allCourses = vm.enrichAllCourses(response);
				}, function(error) {
					console.log("error loading courses");
				});
			};

			vm.enrichAllCourses = function(allCourses) {
				return allCourses.map(function(course) {
					course.isDirty = false;
					course.isSelected = false;
					return course;
				});
			};

			vm.onLoad();

		}]);
}());