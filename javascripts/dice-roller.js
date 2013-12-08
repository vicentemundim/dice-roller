





angular.module('diceRoller', []);
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
;
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
;
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
;
(function(root, angular) {
  var diceRoller = angular.module('diceRoller')

  diceRoller.directive('diceRoller', function (DiceRollerManager) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template:
        "<div class='dice-roller' ng-click='dice.roll()'>" +
          "<div class='dice {{dieClass}}' ng-class='{ rolling: dice.rolling, disabled: dice.disabled, discarded: dice.discarded }' data-face='{{dice.face}}'>" +
            "<figure ng-repeat='face in faces' class='face face-{{face}}'></figure>" +
          "</div>" +
        "</div>",

      link: function ($scope, element, attrs) {
        var dieClass = 'd' + attrs.sides

        $scope.dice = DiceRollerManager.dice({ sides: attrs.sides, name: attrs.name })

        $scope.faces    = $scope.dice.generateFaces()
        $scope.dieClass = dieClass
      }
    }
  })

  diceRoller.directive('diceGroupRoller', function (DiceRollerGroupManager) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template:
        '<div class="dice-roller-group">' +
          '<dice-roller sides="{{dice.sides}}" name="{{dice.name}}" class="{{diceClasses}}" ng-repeat="dice in diceGroup.dices"></dice-roller>' +
        '</div>',

      link: function ($scope, element, attrs) {
        $scope.diceGroup = DiceRollerGroupManager.diceGroup({ sides: attrs.sides, name: attrs.name, dices: attrs.dices })
        $scope.diceClasses = attrs.class

        angular.forEach($scope.diceGroup.dices, function(dice) {
          $scope.$watch(function () { return dice.face }, function() {
            $scope.diceGroup.calculateTotal()
          })
        })
      }
    }
  })

})(window, angular)
;
