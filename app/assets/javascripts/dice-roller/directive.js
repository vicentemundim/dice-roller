(function(root, angular) {
  var diceRoller = angular.module('diceRoller')

  diceRoller.directive('diceRoller', function (DiceRollerManager) {
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

      link: function (scope, element, attrs) {
        var dieClass = 'd' + attrs.sides

        scope.dice = DiceRollerManager.dice({ sides: attrs.sides, name: attrs.name })

        scope.faces    = scope.dice.generateFaces()
        scope.dieClass = dieClass
      }
    }
  })

})(window, angular)
