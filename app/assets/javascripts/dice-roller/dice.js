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

        if (!this.disabled && !this.rolling) {
          this.rolling = true

          $timeout(function () {
            self.face = self.randomizeFace()
            self.rolling = false
            self.disable()
          }, 1000)
        }
      },

      disable: function () {
        this.disabled = true
      },

      enable: function () {
        this.disabled = this.discarded = false
        this.face = undefined
      },

      discard: function () {
        this.discarded = true
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
