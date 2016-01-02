'use strict';

angular.module('coursesModule')
	.factory('courses-data-service', ['Restangular', function(Restangular) {

		var fetchAllCourses = function() {
			// return Restangular.all('courses');
			return "response from fetchAllCourses";
		};

		return {
			fetchAllCourses: fetchAllCourses
		};
	}]);