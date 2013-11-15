describe("dice-roller directive", function() {
  var scope, $compile, element, diceRoller, $timeout

  beforeEach(module('diceRoller'))

  beforeEach(inject(function ($rootScope, _$compile_, $controller, _$timeout_) {
    scope = $rootScope
    $compile = _$compile_
    $timeout = _$timeout_

    element = angular.element(
      "<div><dice-roller sides='10'></dice-roller></div>"
    )
  }))

  beforeEach(function () {
    $('#jasmine_content').html(element)
  })

  afterEach(function () {
    // $('#jasmine_content').html('')
  })

  function createDie() {
    $compile(element)(scope);
    scope.$digest();
    return element.find('> .dice-roller')
  }

  it("should replace it by a dice-roller div", function () {
    diceRoller = createDie()
    expect(diceRoller.find('.d10').length).toEqual(1)
  })

  it("should generate 10 figure face elements", function () {
    diceRoller = createDie()
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

  describe("when it is clicked", function () {
    var initialFace, die

    it("changes the face of the die randomly, adding a rolling animation", function () {
      diceRoller = createDie()
      die = diceRoller.find('.d10')
      initialFace = die.data('face')

      diceRoller.click()

      expect(die.attr('class')).toMatch('rolling')

      $timeout.flush()

      expect(die.attr('class')).not.toMatch('rolling')

      expect(parseInt(die.attr('data-face'), 10)).not.toEqual(initialFace)
      expect(parseInt(die.attr('data-face'), 10)).toBeLessThan(10)
    })
  })
})
