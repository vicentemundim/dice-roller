// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require angular
//= require angular-mocks
//= require dice-roller/all
//= require_tree .

var exampleApp = angular.module('exampleApp', ['diceRoller']),
    d10, d10Scope

exampleApp.controller('D10Ctrl', function ($scope, DiceRollerManager) {
  var dice = DiceRollerManager.dice({ sides: 10, name: 'd10' })

  d10Scope = $scope
  d10 = $scope.dice = dice

  $scope.$watch('dice.rolling', function (value, oldValue) {
    console.log('rolling changed: ', value, oldValue)
  })

  $scope.$watch('dice.face', function (value, oldValue) {
    console.log('face changed: ', value, oldValue)
  })
})
