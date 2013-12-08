(function(root, angular) {
  var diceRoller   = angular.module('diceRoller'),
      compareFaces = function (diceA, diceB) {
        var faceA = diceA.face,
            faceB = diceB.face

        if (angular.isUndefined(faceA)) {
          return 1
        } else if (angular.isUndefined(faceB)) {
          return -1
        }

        return faceA - faceB
      }

  diceRoller.factory('DiceRollerDiceGroup', function (DiceRollerManager) {
    var DiceGroup = function (options) {
      var numberOfDices = options.dices || 1

      this.sides   = options.sides
      this.name    = options.name
      this.discard = options.discard

      this.dices = []

      for (var index = 0; index < numberOfDices; index++) {
        this.add(index)
      }
    }

    DiceGroup.prototype = {
      add: function (index) {
        var dice = DiceRollerManager.dice({ sides: this.sides, name: this.name + '-' + index })
        this.dices.push(dice)
      },

      disable: function () {
        angular.forEach(this.dices, function(dice) {
          dice.disable()
        })
      },

      enable: function () {
        angular.forEach(this.dices, function(dice) {
          dice.enable()
        })
      },

      facesSet: function () {
        return this.dices.filter(function(dice) {
          return angular.isNumber(dice.face)
        })
      },

      calculateTotal: function () {
        var self = this,
            total = 0,
            dices = this.dices,
            facesSet = this.facesSet(),
            discard = this.discard - (dices.length - facesSet.length)

        dices.sort(compareFaces)

        angular.forEach(dices, function (dice, index) {
          if (index < discard) {
            dice.discard()
          } else if (angular.isNumber(dice.face)) {
            total += dice.face
          }
        })

        this.total = total

        return total
      }
    }

    return DiceGroup
  })

})(window, angular)
