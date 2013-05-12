describe("DiceRoller.Die", function() {
  var die, face

  describe("for a 10-sided dice, with initial face number 0", function() {
    beforeEach(function() {
      die = new DiceRoller.Die({sides: 10, initial: 0})
    })

    it("should be a Die", function() {
      expect(die).toBeAnInstanceOf(DiceRoller.Die)
    })

    describe("roll", function() {
      it("should change the face randomly, between 0 and 9", function() {
        var faces = {}

        for (var i = 0; i < 1000; i++) {
          die.roll()

          face = die.get('face')
          faces[face] = (faces[face] || 0) + 1

          expect(face).toBeLessThan(10)
          expect(face).toBeGreaterThan(-1)
        }

        for (i = 0; i < 10; i++) {
          expect(faces[i]).toBeGreaterThan(0, "face " + i + " should have appeared, but it didn't")
        }
      })
    })
  })
})