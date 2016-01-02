'use strict';

angular.module('coursesModule')
	.factory('coursesDataService', ['Restangular', '$http', function(Restangular, $http) {

		var fetchAllCourses = function() {
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('courses').get();
		};

		var saveNewCourse = function(newCourse) {
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('courses').post(newCourse);
		};

		return {
			fetchAllCourses: fetchAllCourses,
			saveNewCourse: saveNewCourse
		};
	}]);