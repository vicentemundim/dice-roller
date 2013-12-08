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
    d10, d10Scope, otherD10, otherD10Scope,
    d20, d20Scope, otherD20, otherD20Scope,
    d10Group, d10GroupScope

exampleApp.controller('D10Ctrl', function ($scope, DiceRollerManager) {
  var dice = DiceRollerManager.dice({ sides: 10 })

  d10Scope = $scope
  d10 = $scope.dice = dice

  $scope.toggle = function () {
    $scope.dice.disabled ? $scope.dice.enable() : $scope.dice.disable()
  }

  $scope.$watch('dice.disabled', function (value, oldValue) {
    $scope.disabledLabel = value ? 'Enable' : 'Disable'
  })

  $scope.$watch('dice.rolling', function (value, oldValue) {
    console.log('rolling changed: ', value, oldValue)
  })

  $scope.$watch('dice.face', function (value, oldValue) {
    console.log('face changed: ', value, oldValue)
  })
})

exampleApp.controller('OtherD10Ctrl', function ($scope, DiceRollerManager) {
  var dice = DiceRollerManager.dice({ sides: 10, name: 'other-d10' })

  otherD10Scope = $scope
  otherD10 = $scope.dice = dice

  $scope.toggle = function () {
    $scope.dice.disabled ? $scope.dice.enable() : $scope.dice.disable()
  }

  $scope.$watch('dice.disabled', function (value, oldValue) {
    $scope.disabledLabel = value ? 'Enable' : 'Disable'
  })

  $scope.$watch('dice.rolling', function (value, oldValue) {
    console.log('other d10 rolling changed: ', value, oldValue)
  })

  $scope.$watch('dice.face', function (value, oldValue) {
    console.log('other d10 face changed: ', value, oldValue)
  })
})

exampleApp.controller('D20Ctrl', function ($scope, DiceRollerManager) {
  var dice = DiceRollerManager.dice({ sides: 20 })

  d20Scope = $scope
  d20 = $scope.dice = dice

  $scope.toggle = function () {
    $scope.dice.disabled ? $scope.dice.enable() : $scope.dice.disable()
  }

  $scope.$watch('dice.disabled', function (value, oldValue) {
    $scope.disabledLabel = value ? 'Enable' : 'Disable'
  })

  $scope.$watch('dice.rolling', function (value, oldValue) {
    console.log('d20 rolling changed: ', value, oldValue)
  })

  $scope.$watch('dice.face', function (value, oldValue) {
    console.log('d20 face changed: ', value, oldValue)
  })
})

exampleApp.controller('OtherD20Ctrl', function ($scope, DiceRollerManager) {
  var dice = DiceRollerManager.dice({ sides: 20, name: 'other-d20' })

  otherD20Scope = $scope
  otherD20 = $scope.dice = dice

  $scope.toggle = function () {
    $scope.dice.disabled ? $scope.dice.enable() : $scope.dice.disable()
  }

  $scope.$watch('dice.disabled', function (value, oldValue) {
    $scope.disabledLabel = value ? 'Enable' : 'Disable'
  })

  $scope.$watch('dice.rolling', function (value, oldValue) {
    console.log('other d20 rolling changed: ', value, oldValue)
  })

  $scope.$watch('dice.face', function (value, oldValue) {
    console.log('other d20 face changed: ', value, oldValue)
  })
})

exampleApp.controller('D10GroupCtrl', function ($scope, DiceRollerGroupManager) {
  var diceGroup = DiceRollerGroupManager.diceGroup({ name: 'd10-group', sides: 10, dices: 4, discard: 2 })

  d10GroupScope = $scope
  d10Group = $scope.diceGroup = diceGroup

  $scope.roll = function () {
    angular.forEach(d10Group.dices, function(dice) {
      dice.roll()
    })
  }

  $scope.toggle = function () {
    $scope.diceGroup.dices.every(function (dice) { return dice.disabled }) ? $scope.diceGroup.enable() : $scope.diceGroup.disable()
  }

  $scope.$watch('diceGroup.dices', function (value, oldValue) {
    console.log(value.map(function (d) { return d.disabled }))
    if (value.every(function (dice) { return dice.disabled })) {
      $scope.disabledLabel = 'Enable'
    } else {
      $scope.disabledLabel = 'Disable'
    }
  }, true)

  $scope.$watch('diceGroup.total', function (value, oldValue) {
    console.log('total changed: ', value, oldValue)
  })
})
