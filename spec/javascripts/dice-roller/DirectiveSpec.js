describe("dice-roller directive", function() {
  var scope, $compile, element, diceRoller, diceRollerManager, dice

  beforeEach(module('diceRoller'))

  beforeEach(inject(function ($rootScope, _$compile_, DiceRollerManager) {
    scope = $rootScope
    $compile = _$compile_
    diceRollerManager = DiceRollerManager

    dice = { roll: function () {}, generateFaces: function () { return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } }
    spyOn(dice, 'roll')
    spyOn(diceRollerManager, 'dice').and.returnValue(dice)
  }))

  beforeEach(function () {
    $('#jasmine_content').html(element)
  })

  function createDie(sides, name) {
    name = name || ''

    element = angular.element(
      "<div><dice-roller sides='" + sides + "' name='" + name + "'></dice-roller></div>"
    )

    $compile(element)(scope);
    scope.$digest();
    return element.find('> .dice-roller')
  }

  it("should replace it by a dice-roller div", function () {
    diceRoller = createDie(10)
    expect(diceRoller.find('.d10').length).toEqual(1)
  })

  it("should generate 10 figure face elements", function () {
    diceRoller = createDie(10)
    expect(diceRoller.find('figure.face').length).toEqual(10)

    expect(diceRoller.find('figure.face.face-0').length).toEqual(1)
    expect(diceRoller.find('figure.face.face-1').length).toEqual(1)
    expect(diceRoller.find('figure.face.face-2').length).toEqual(1)
    expect(diceRoller.find('figure.face.face-3').length).toEqual(1)
    expect(diceRoller.find('figure.face.face-4').length).toEqual(1)
    expect(diceRoller.find('figure.face.face-5').length).toEqual(1)
    expect(diceRoller.find('figure.face.face-6').length).toEqual(1)
    expect(diceRoller.find('figure.face.face-7').length).toEqual(1)
    expect(diceRoller.find('figure.face.face-8').length).toEqual(1)
    expect(diceRoller.find('figure.face.face-9').length).toEqual(1)
  })

  it("gets a dice from manager", function() {
    diceRoller = createDie(10)
    expect(diceRollerManager.dice).toHaveBeenCalledWith({ sides: "10", name: '' })
  })

  describe("when dice is created with a name", function() {
    it("gets a dice with that name from manager", function() {
      diceRoller = createDie(10, 'some-dice-name')
      expect(diceRollerManager.dice).toHaveBeenCalledWith({ sides: "10", name: 'some-dice-name' })
    })
  })

  describe("when dice face changes", function() {
    it("updates the data-face attribute of the dice", function() {
      diceRoller = createDie(10)

      dice.face = 10
      scope.$digest()
      expect(diceRoller.find('.d10').attr('data-face')).toEqual("10")

      dice.face = 2
      scope.$digest()
      expect(diceRoller.find('.d10').attr('data-face')).toEqual("2")
    })
  })

  describe("when dice is rolling", function() {
    it("adds a rolling class to the dice", function() {
      diceRoller = createDie(10)

      dice.rolling = true
      scope.$digest()
      expect(diceRoller.find('.d10').attr('class')).toMatch("rolling")

      dice.rolling = false
      scope.$digest()
      expect(diceRoller.find('.d10').attr('class')).not.toMatch("rolling")
    })
  })

  describe("when dice is disabled", function() {
    it("adds a disabled class to the dice", function() {
      diceRoller = createDie(10)

      dice.disabled = true
      scope.$digest()
      expect(diceRoller.find('.d10').attr('class')).toMatch("disabled")

      dice.disabled = false
      scope.$digest()
      expect(diceRoller.find('.d10').attr('class')).not.toMatch("disabled")
    })
  })

  describe("when it is clicked", function () {
    it("rolls the dice", function () {
      diceRoller = createDie(10)
      diceRoller.click()
      expect(dice.roll).toHaveBeenCalled()
    })
  })
})
