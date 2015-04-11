'use strict';

/**
 * @ngdoc function
 * @name typrApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the typrApp
 */
angular.module('typrApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
