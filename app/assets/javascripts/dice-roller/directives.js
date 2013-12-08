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
