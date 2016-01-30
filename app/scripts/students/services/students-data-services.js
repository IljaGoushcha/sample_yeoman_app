'use strict';

angular.module('studentsModule')
	.factory('studentsDataService', ['Restangular', '$http', function(Restangular, $http) {

		var fetchAllCourses = function() {
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('students').get();
		};

		var saveNewCourse = function(newCourse) {
			var myPayload = {
				"course": newCourse
			};
			console.log(myPayload);
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('courses').post('', myPayload);
		};

		var updateCourse = function(myCourse) {
			var myPayload = {
				"course": myCourse
			};
			console.log(myPayload);
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('courses', myCourse.id).customPUT(myPayload);
		};

		var deleteCourse = function(myCourse) {
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('courses', myCourse.id).remove();
		};

		return {
			fetchAllCourses: fetchAllCourses,
			saveNewCourse: saveNewCourse,
			updateCourse: updateCourse,
			deleteCourse: deleteCourse
		};
	}]);