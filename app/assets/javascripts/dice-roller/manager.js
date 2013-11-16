(function(root, angular) {
  var diceRoller = angular.module('diceRoller')

  diceRoller.factory('DiceRollerManager', function (DiceRollerDice) {
    return {
      dices: {},

      dice: function (options) {
        options = options || {}
        sides   = parseInt(options.sides || 10, 10)
        name    = options.name || 'd' + sides

        this.dices[name] = this.dices[name] || new DiceRollerDice({ sides: sides, name: name })

        return this.dices[name]
      }
    }
  })

})(window, angular)
