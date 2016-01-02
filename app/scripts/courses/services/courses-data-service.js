'use strict';

angular.module('coursesModule')
	.factory('coursesDataService', ['Restangular', '$http', function(Restangular, $http) {

		var fetchAllCourses = function() {
			Restangular.setBaseUrl('localhost:3000');

			Restangular.one('courses').get().then(function(response) {
				console.log(response);
			}, function() {

			});
			return null;
		};


		var fetchAllCoursesB = function() {
			$http.get('localhost:3000/courses').success(function(response) {
				console.log(response);
			});
			return null;
		};



		return {
			fetchAllCourses: fetchAllCourses,
			fetchAllCoursesB: fetchAllCoursesB
		};
	}]);