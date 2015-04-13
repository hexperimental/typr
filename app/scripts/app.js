'use strict';

/**
 * @ngdoc overview
 * @name typrApp
 * @description
 * # typrApp
 *
 * Main module of the application.
 */
angular
  .module('typrApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix("!");
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/stats', {
        templateUrl: 'views/stats.html',
        controller: 'StatsCtrl'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).run(function($rootScope, $location) {
    $rootScope.location = $location;
  });
