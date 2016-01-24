'use strict';

angular
  .module('appModules', [
      'coursesModule'
    ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/courses');

    $stateProvider
      .state('courses', {
        url: '/courses',
        templateUrl: '../views/courses/courses.html',
        controller: 'CoursesCtrl',
        controllerAs: 'coursesCtrl'
      })
      .state('students', {
        url: '/students',
        templateUrl: '../views/students/students.html'
      });
  });