'use strict';

angular.module('coursesModule')
	.factory('coursesDataService', ['Restangular', '$http', function(Restangular, $http) {

		var fetchAllCourses = function() {
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('courses').get();
		};

		var saveNewCourse = function(newCourse) {
			var myPayload = {
				"course": newCourse
			};
			console.log(myPayload);
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('courses').post('', myPayload);
		};

		var deleteCourse = function(myCourse) {
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('courses', myCourse.id).remove();
		};

		return {
			fetchAllCourses: fetchAllCourses,
			saveNewCourse: saveNewCourse,
			deleteCourse: deleteCourse
		};
	}]);