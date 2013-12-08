describe("dice-roller group manager", function() {
  var manager, diceGroup, DiceGroup

  beforeEach(module('diceRoller'))

  beforeEach(inject(function (DiceRollerGroupManager, DiceRollerDiceGroup) {
    manager = DiceRollerGroupManager
    DiceGroup = DiceRollerDiceGroup
  }))

  it("starts with an empty list of diceGroups", function () {
    expect(manager.diceGroups).toEqual({})
  })

  it("creates a 10-sided dice group when no options are given, prefixed with group", function () {
    diceGroup = manager.diceGroup()

    expect(diceGroup.sides).toEqual(10)
    expect(diceGroup.name).toEqual('group')

    expect(manager.diceGroups[diceGroup.name]).toEqual(diceGroup)
  })

  describe("when default dice is already created", function() {
    beforeEach(function() {
      diceGroup = manager.diceGroup()
    })

    it("won't create a new dice, returning it instead", function () {
      expect(manager.diceGroup()).toEqual(diceGroup)
    })
  })

  describe("when passing sides", function() {
    it("creates a dice with the number of sides", function() {
      diceGroup = manager.diceGroup({ sides: 20 })

      expect(diceGroup.sides).toEqual(20)
      expect(diceGroup.name).toEqual('group')

      expect(manager.diceGroups[diceGroup.name]).toEqual(diceGroup)
    })

    describe("when a dice is already created", function() {
      beforeEach(function() {
        diceGroup = manager.diceGroup({ sides: 20 })
      })

      it("won't create a new dice group with the same name, returning it instead", function () {
        expect(manager.diceGroup({ sides: 20 })).toEqual(diceGroup)
      })
    })
  })

  describe("when passing name", function() {
    it("creates a 10-sided dice, with the given group name", function() {
      diceGroup = manager.diceGroup({ name: 'my-dice-group' })

      expect(diceGroup.sides).toEqual(10)
      expect(diceGroup.name).toEqual('my-dice-group')

      expect(manager.diceGroups[diceGroup.name]).toEqual(diceGroup)
    })

    describe("when a dice is already created", function() {
      beforeEach(function() {
        diceGroup = manager.diceGroup({ name: 'my-dice-group' })
      })

      it("won't create a new diceGroup with the same name, returning it instead", function () {
        expect(manager.diceGroup({ name: 'my-dice-group' })).toEqual(diceGroup)
      })
    })
  })

  describe("when passing the number of dices", function() {
    it("creates a 10-sided dice, with the given number of dices", function() {
      diceGroup = manager.diceGroup({ dices: 3 })

      expect(diceGroup.dices.length).toEqual(3)
    })
  })

  describe("when passing the number of discarded dices", function() {
    it("sets it on the dice group", function() {
      diceGroup = manager.diceGroup({ discard: 2 })

      expect(diceGroup.discard).toEqual(2)
    })
  })
})
