(function() {
	'use strict'

	angular.module('coursesModule')
		.controller('CoursesCtrl', ['coursesDataService', '$document', 'hotkeys', function(coursesDataService, $document, hotkeys) {
			// use ng-change



			// implement save first then deselect, maybe remove unedited, then save, then deselect, maybe implement model
			// move ng-inits into scope, rething stopPropagation
			var vm = this;


			vm.columnName = 'name';
			vm.reverse = false;

			hotkeys
				.add({
					combo: 'ctrl+a',
					description: 'print allCourses',
					callback: function() {
						console.log(vm.allCourses);
					}
				});

			vm.deselectAllRowsB = function(myCourse) {
				console.log("inside deselectAllRowsB()");

				vm.allCourses.map(function(course) {
					if (course.id == myCourse.id) {
					} else {
						if (course.isDirty == true && course.id) {
							vm.updateCourse(course);
						} else if (course.isDirty && !course.hasOwnProperty('id')) {
							vm.saveCourse(course);
						}
						course.isSelected = false;
					}
				});
			};

			vm.removeNewUneditedRow = function() {
				_.remove(vm.allCourses, function(course) {
    				return (course.name == null || course.number == null || course.section == null);
				});
			};

			vm.updateCourse = function(myCourse) {
				coursesDataService.updateCourse(myCourse).then(function(response) {
						console.log(response);
						vm.onLoad();
					}, function(error) {
						console.log("something went wrong when updating a course");
					});
			};

			vm.addNewCourseRow = function(event) {
				event.stopPropagation();
				
				vm.deselectAllRowsB();

				vm.allCourses.push({
					"name": null,
					"number": null,
					"section": null,
					"isSelected": true
				});
				vm.columnName = null;
				vm.reverse = false;
			};

			vm.saveCourse = function(myCourse) {
				coursesDataService.saveNewCourse(myCourse).then(function(response) {
						console.log(response);
						vm.onLoad();
					}, function(error) {
					});
			};

			vm.editCourseAction = function(myCourse, event) {
				console.log("inside editCourseAction()");
				event.stopPropagation();
				myCourse.isSelected = true;
				vm.unsavedCourseExists = true;
			};

			

			vm.deleteCourseAction = function(myCourse, event) {
				console.log("inside deleteCourseAction()");
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
				vm.unsavedCourseExists = false;
			};

			vm.selectRow = function(myCourse, event) {
				event.stopPropagation();

				if (myCourse.isSelected == true) {
					console.log("row already selected");
				} else {
					vm.deselectAllRows();

					myCourse.isSelected = true;
					vm.unsavedCourseExists = true;
				}
			};

			vm.deselectAllRows = function(course) {
				console.log("inside deselectAllRows()");
				_.remove(vm.allCourses, function(course) {
    				return (course.name == null || course.number == null || course.section == null);
				});

				vm.allCourses.map(function(course) {
					if (course.isSelected && course.hasOwnProperty('id')) {
						vm.updateCourseAction(course);
					} else if (course.isSelected && !course.hasOwnProperty('id')) {
						vm.saveCourseAction(course);
					}

					
					course.isSelected = false;
				});

				vm.unsavedCourseExists = false;
			};

			$document.bind('click', function(){
				console.log("inside document.on click");
        		vm.deselectAllRowsB({"id":null});
    		});

			vm.onLoad = function() {
				console.log("inside onLoad()");
				coursesDataService.fetchAllCourses().then(function(response) {
					vm.allCourses = vm.enrichAllCourses(response);
					vm.unsavedCourseExists = false;
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