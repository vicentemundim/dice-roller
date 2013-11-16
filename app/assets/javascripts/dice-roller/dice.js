(function(root, angular) {
  var diceRoller = angular.module('diceRoller')

  diceRoller.factory('DiceRollerDice', function ($timeout) {
    var Dice = function (options) {
      this.sides = options.sides
      this.name  = options.name
    }

    Dice.prototype = {
      roll: function () {
        var self = this

        if (!this.rolling) {
          this.rolling = true

          $timeout(function () {
            self.rolling = false

            self.face = self.randomizeFace()
          }, 1000)
        }
      },

      randomizeFace: function () {
        return Math.floor((Math.random() * this.sides)) + 1
      },

      generateFaces: function () {
        var faces = [],
            initial = this.sides == 10 ? 0 : 1

        for (var i = initial; i < this.sides + initial; i++) {
          faces.push(i)
        }

        return faces
      }
    }

    return Dice
  })

})(window, angular)
