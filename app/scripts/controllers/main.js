'use strict';

/**
 * @ngdoc function
 * @name typrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the typrApp
 */
angular.module('typrApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
