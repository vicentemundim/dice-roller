(function(root, angular) {
  var diceRoller = angular.module('diceRoller')

  diceRoller.factory('DiceRollerManager', function (DiceRollerDice) {
    return {
      dices: {},

      dice: function (options) {
        var options = options || {},
            sides   = parseInt(options.sides || 10, 10),
            name    = options.name || 'd' + sides

        this.dices[name] = this.dices[name] || new DiceRollerDice({ sides: sides, name: name })

        return this.dices[name]
      }
    }
  })

  diceRoller.factory('DiceRollerGroupManager', function (DiceRollerDiceGroup) {
    return {
      diceGroups: {},

      diceGroup: function (options) {
        var options = options || {},
            sides   = parseInt(options.sides   || 10, 10),
            dices   = parseInt(options.dices   || 1,  10),
            discard = parseInt(options.discard || 0,  10),
            name    = options.name || 'group'

        this.diceGroups[name] = this.diceGroups[name] ||
                                      new DiceRollerDiceGroup({
                                        sides: sides,
                                        name: name,
                                        dices: dices,
                                        discard: discard
                                      })

        return this.diceGroups[name]
      }
    }
  })

})(window, angular)
