describe("dice-roller manager", function() {
  var manager, dice, diceGroup, Dice, DiceGroup

  beforeEach(module('diceRoller'))

  beforeEach(inject(function (DiceRollerManager, DiceRollerDice, DiceRollerDiceGroup) {
    manager = DiceRollerManager
    Dice = DiceRollerDice
    DiceGroup = DiceRollerDiceGroup
  }))

  it("starts with an empty list of dices", function () {
    expect(manager.dices).toEqual({})
  })

  it("creates a 10-sided dice when no options are given, named d10", function () {
    dice = manager.dice()

    expect(dice.sides).toEqual(10)
    expect(dice.name).toEqual('d10')

    expect(manager.dices[dice.name]).toEqual(dice)
  })

  describe("when default dice is already created", function() {
    beforeEach(function() {
      dice = manager.dice()
    })

    it("won't create a new dice, returning it instead", function () {
      expect(manager.dice()).toEqual(dice)
    })
  })

  describe("when passing sides", function() {
    it("creates a dice with the number of sides, named as d<sides>", function() {
      dice = manager.dice({ sides: 20 })

      expect(dice.sides).toEqual(20)
      expect(dice.name).toEqual('d20')

      expect(manager.dices[dice.name]).toEqual(dice)
    })

    describe("when a dice is already created", function() {
      beforeEach(function() {
        dice = manager.dice({ sides: 20 })
      })

      it("won't create a new dice with the same name, returning it instead", function () {
        expect(manager.dice({ sides: 20 })).toEqual(dice)
      })
    })
  })

  describe("when passing name", function() {
    it("creates a 10-sided dice, with the given name", function() {
      dice = manager.dice({ name: 'my dice' })

      expect(dice.sides).toEqual(10)
      expect(dice.name).toEqual('my dice')

      expect(manager.dices[dice.name]).toEqual(dice)
    })

    describe("when a dice is already created", function() {
      beforeEach(function() {
        dice = manager.dice({ name: 'my dice' })
      })

      it("won't create a new dice with the same name, returning it instead", function () {
        expect(manager.dice({ name: 'my dice' })).toEqual(dice)
      })
    })
  })
})
