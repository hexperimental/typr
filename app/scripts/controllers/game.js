'use strict';

/**
 * @ngdoc function
 * @name typrApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the typrApp
 */
angular.module('typrApp')
.controller('GameCtrl', function ($scope,$interval,$sce) {
    $scope.time = -4;
    $scope.throwDelay = 10;
    $scope.throwCounter = 0;
    $scope.lvls=[26,52,62];
    $scope.availableLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $scope.awesomeThings = [];
    $scope.letterList = [];
    $scope.hitCount=0;
    $scope.score=0;
    $scope.isRunning=false;
    $scope.level=0;
    var startLoop;
    var runLoop;

    $scope.changed = function(evt) {
        //re-render stage if anything changes
        var isHit = false;
        //This is to get the last key pressed only -a.
        $scope.lastpressed=$scope.lastpressed.slice(-1);

        //check hit
        var deletedLetters=[];
        for(var letter in $scope.letterList) {
            var l = $scope.lastpressed
            if(l == $scope.letterList[letter]) {
                $scope.hitCount++;

                //todo: check lc,up and number for score
                $scope.score += 1;

                if(l == l.toUpperCase()){
                    $scope.score += 2;
                }
                if(!isNaN(l)) {
                    $scope.score += 4;
                }
                isHit = true;
                deletedLetters.push(letter);
            }
        }
        //remov
        for(var dl in deletedLetters){
            $scope.letterList.splice(deletedLetters[dl],1);
        }
        console.log($scope.letterList);
        if( isHit ) {
            if($scope.throwCounter>10){
                $scope.throwCounter=0;
                $scope.throwDelay--;
            }
            $scope.throwCounter++;

            if($scope.hitCount>20){
                $scope.level = 1;
            }
            if($scope.hitCount>30){
                $scope.level = 2;
            }
            $scope.render();
        }
    }

    $scope.focused = function(evt) {
        startLoop = $interval(function() {
            $scope.time++;
            if ($scope.time==0) {
                console.log('bigger than zero')
                $scope.isRunning=true;
                $scope.startGame();
                $interval.cancel(startLoop);
                startLoop = undefined;
                $scope.countDown ="";
            } else {
                $scope.countDown = (-1*$scope.time);
            }
        }, 1000, 4);
    }

    $scope.startGame = function() {
        $scope.time = 0;
        runLoop = $interval(function() {
            $scope.time++;
            if($scope.time>$scope.throwDelay) {
                $scope.time = 0;
                $scope.throwLetter();
            }
        }, 100);
    }

    $scope.stopGame = function() {
        if (angular.isDefined(runLoop)) {
            $interval.cancel(runLoop);
            runLoop = undefined;
        }
    };

    $scope.throwLetter = function() {
        $scope.letterList.push($scope.availableLetters.charAt(Math.floor(Math.random() * $scope.lvls[$scope.level])));
        if($scope.letterList.length >= 10){
            $interval.cancel(runLoop);
            runLoop = undefined;
            $scope.gameplay = $sce.trustAsHtml('<p class="gameover">Game Over</p>');
        }else{
            $scope.render();
        }
    }
    $scope.render = function() {
        $scope.gameplay = $sce.trustAsHtml(function(){
            var output='';
            for(var letter in $scope.letterList) {
                var l = $scope.letterList[letter];
                var type = "lower"
                if(l == l.toUpperCase()){
                    type = "upper"
                }
                if(!isNaN(l)) {
                    type = "number"
                }
                output+='<span class="letter '+type+'">'+l+'</span>';
            }
            return output;
        }());
    }

});
