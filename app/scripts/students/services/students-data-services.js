'use strict';

angular.module('studentsModule')
	.factory('studentsDataService', ['Restangular', '$http', function(Restangular, $http) {

		var fetchAllStudents = function() {
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('students').get();
		};

		var saveNewStudent = function(newStudent) {
			var myPayload = {
				"course": newStudent
			};
			console.log(myPayload);
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('courses').post('', myPayload);
		};

		var updateStudent = function(myStudent) {
			var myPayload = {
				"student": myStudent
			};
			console.log(myPayload);
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('student', myStudent.id).customPUT(myPayload);
		};

		var deleteStudent = function(myStudent) {
			Restangular.setBaseUrl('http://localhost:3000');
			return Restangular.one('students', myStudent.id).remove();
		};

		return {
			fetchAllStudents: fetchAllStudents,
			saveNewStudent: saveNewStudent,
			updateStudent: updateStudent,
			deleteStudent: deleteStudent
		};
	}]);