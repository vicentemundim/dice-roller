describe("dice-group-roller directive", function() {
  var scope, $compile, element, diceGroupRoller, diceRollerGroupManager, diceGroup

  beforeEach(module('diceRoller'))

  beforeEach(inject(function ($rootScope, _$compile_, DiceRollerGroupManager) {
    scope = $rootScope
    $compile = _$compile_
    diceRollerGroupManager = DiceRollerGroupManager
  }))

  function createDiceGroup(sides, name, dices, discard) {
    name = name || ''
    discard = discard ? 'discard="' + discard + '"' : ''
    dices   = dices ? 'dices="' + dices + '"' : ''

    element = angular.element(
      "<div><dice-group-roller sides='" + sides + "' name='" + name + "' " + dices + " " + discard + "></dice-roller></div>"
    )

    $('#jasmine_content').html(element)

    $compile(element)(scope);
    scope.$digest();
    return element.find('> .dice-roller-group')
  }

  describe("when the number of dices are not specified", function() {
    beforeEach(inject(function () {
      diceGroup = { dices: [ { sides: 10, name: 'my-group-0' } ], calculateTotal: function () {} }
      spyOn(diceRollerGroupManager, 'diceGroup').and.returnValue(diceGroup)
    }))

    it("should replace it by a dice-roller-group div with one d10 dice", function () {
      diceGroupRoller = createDiceGroup(10, 'my-group')
      expect(diceGroupRoller.find('.dice-roller').length).toEqual(1)
      expect(diceGroupRoller.find('.dice-roller .d10').length).toEqual(1)
    })

    it("gets a dice group from manager", function() {
      diceGroupRoller = createDiceGroup(10, 'my-group')
      expect(diceRollerGroupManager.diceGroup).toHaveBeenCalledWith({ sides: "10", name: 'my-group', dices: undefined })
    })
  })

  describe("when the number of dices is specified", function() {
    beforeEach(inject(function () {
      diceGroup = {
        dices: [ { sides: 10, name: 'my-group-0' }, { sides: 10, name: 'my-group-1' }, { sides: 10, name: 'my-group-2' } ],
        calculateTotal: function () {
          this.total = 13
          return this.total
        }
      }

      spyOn(diceRollerGroupManager, 'diceGroup').and.returnValue(diceGroup)
    }))

    it("should replace it by a dice-roller-group div with the given number of d10 dice", function () {
      diceGroupRoller = createDiceGroup(10, 'my-group', 3)
      expect(diceGroupRoller.find('.dice-roller').length).toEqual(3)
      expect(diceGroupRoller.find('.dice-roller .d10').length).toEqual(3)
    })

    it("gets a dice group from manager", function() {
      diceGroupRoller = createDiceGroup(10, 'my-group', 3)
      expect(diceRollerGroupManager.diceGroup).toHaveBeenCalledWith({ sides: "10", name: 'my-group', dices: '3' })
    })

    describe("when a dice is set", function() {
      it("calculates the total for the group", function() {
        diceGroupRoller = createDiceGroup(10, 'my-group', 3)
        spyOn(diceGroup, "calculateTotal")

        diceGroup.dices[0].face = 3
        scope.$digest()

        expect(diceGroup.calculateTotal).toHaveBeenCalled()
      })

      it("only calculates the total for the group when the face is changed", function() {
        diceGroupRoller = createDiceGroup(10, 'my-group', 3)
        spyOn(diceGroup, "calculateTotal")

        diceGroup.dices[0].rolling = true
        scope.$digest()

        expect(diceGroup.calculateTotal).not.toHaveBeenCalled()
      })
    })
  })
})
