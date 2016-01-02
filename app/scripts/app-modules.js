'use strict';

angular
  .module('appModules', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "../views/home/home.html"
        // views: {
        //   "viewA": { template: "index.viewA" },
        //   "viewB": { template: "index.viewB" }
        // }
      })
  });