(function(root, angular) {
  root.DiceRoller = {}

  var diceRoller = angular.module('diceRoller', [])

  diceRoller.factory('Dice', function ($timeout) {
    var Dice = function (data) {}

    Dice.prototype = {
      roll: function () {
        var self = this

        if (!this.rolling) {
          this.rolling = true

          $timeout(function () {
            self.rolling = false

            self.randomizeFace()
          }, 1000)
        }
      },

      randomizeFace: function () {
        this.face = Math.floor((Math.random() * this.sides)) + this.initial
      },

      generateFaces: function () {
        var faces = []

        for (var i = this.initial; i < this.sides + this.initial; i++) {
          faces.push(i)
        }

        return faces
      }
    }

    return new Dice
  })

  diceRoller.directive('diceRoller', function (Dice) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template:
        "<div class='dice-roller' ng-click='dice.roll()'>" +
          "<div class='{{dieClass}}' ng-class='{rolling: dice.rolling}' data-face='{{dice.face}}'>" +
            "<figure ng-repeat='face in faces' class='face face-{{face}}'></figure>" +
          "</div>" +
        "</div>",

      controller: function ($scope) {
        $scope.dice = Dice
      },

      link: function (scope, element, attrs) {
        var numberOfSides = parseInt(attrs.sides || 10, 10),
            dieClass = 'd' + numberOfSides

        scope.dice.initial = numberOfSides == 10 ? 0 : 1
        scope.dice.sides   = numberOfSides

        scope.faces    = scope.dice.generateFaces()
        scope.dieClass = dieClass
      }
    }
  })

})(window, angular)
