describe("dice-roller diceGroup", function() {
  var diceGroup, dice, Dice, index, firstDice, secondDice, thirdDice



  beforeEach(module('diceRoller'))

  beforeEach(inject(function (_$timeout_, DiceRollerDice) {
    $timeout = _$timeout_
    Dice = DiceRollerDice
  }))

  describe("when the number of dices is not specified", function() {
    beforeEach(inject(function (DiceRollerDiceGroup) {
      diceGroup = new DiceRollerDiceGroup({ sides: 10, name: 'my-dice' })
    }))

    it("creates a group of one dice with the given number of sides", function() {
      expect(diceGroup.dices.length).toEqual(1)

      expect(diceGroup.dices[0] instanceof Dice).toBeTruthy()
      expect(diceGroup.dices[0].sides).toEqual(10)
      expect(diceGroup.dices[0].name).toEqual('my-dice-0')
    })
  })

  describe("when specifying the number of dices", function() {
    beforeEach(inject(function (DiceRollerDiceGroup) {
      diceGroup = new DiceRollerDiceGroup({ sides: 10, name: 'my-dice', dices: 3 })
    }))

    it("creates a group of N dices with the given number of sides", function() {
      expect(diceGroup.dices.length).toEqual(3)

      for (index = 0; index < diceGroup.dices.length; index++) {
        expect(diceGroup.dices[index] instanceof Dice).toBeTruthy()
        expect(diceGroup.dices[index].sides).toEqual(10)
        expect(diceGroup.dices[index].name).toEqual('my-dice-' + index)
      }
    })

    describe("disable", function() {
      it("disables all dices", function() {
        for (index = 0; index < diceGroup.dices.length; index++) {
          spyOn(diceGroup.dices[index], 'disable')
        }

        diceGroup.disable()

        for (index = 0; index < diceGroup.dices.length; index++) {
          expect(diceGroup.dices[index].disable).toHaveBeenCalled()
        }
      })
    })

    describe("enable", function() {
      it("enables all dices", function() {
        for (index = 0; index < diceGroup.dices.length; index++) {
          spyOn(diceGroup.dices[index], 'enable')
        }

        diceGroup.enable()

        for (index = 0; index < diceGroup.dices.length; index++) {
          expect(diceGroup.dices[index].enable).toHaveBeenCalled()
        }
      })
    })

    describe("calculateTotal", function() {
      describe("when no dices are discarded", function() {
        describe("when there is no face set", function() {
          it("returns zero", function() {
            expect(diceGroup.calculateTotal()).toEqual(0)
          })

          it("sets the group total", function() {
            diceGroup.calculateTotal()
            expect(diceGroup.total).toEqual(0)
          })
        })

        describe("when not all faces are set", function() {
          beforeEach(function() {
            diceGroup.dices[0].face = 6
            diceGroup.dices[1].face = 3
          })

          it("returns the sum of the current set dice faces", function() {
            expect(diceGroup.calculateTotal()).toEqual(9)
          })

          it("sets the group total", function() {
            diceGroup.calculateTotal()
            expect(diceGroup.total).toEqual(9)
          })
        })

        describe("when all faces are set", function() {
          beforeEach(function() {
            diceGroup.dices[0].face = 10
            diceGroup.dices[1].face = 6
            diceGroup.dices[2].face = 3
          })

          it("returns the sum of the current set dice faces", function() {
            expect(diceGroup.calculateTotal()).toEqual(19)
          })

          it("sets the group total", function() {
            diceGroup.calculateTotal()
            expect(diceGroup.total).toEqual(19)
          })
        })
      })

      describe("when 1 dice is discarded", function() {
        beforeEach(inject(function (DiceRollerDiceGroup) {
          diceGroup = new DiceRollerDiceGroup({ sides: 10, name: 'my-dice', dices: 3, discard: 1 })
        }))

        beforeEach(function() {
          firstDice  = diceGroup.dices[0]
          secondDice = diceGroup.dices[1]
          thirdDice  = diceGroup.dices[2]
        })

        describe("when there is no face set", function() {
          it("returns zero", function() {
            expect(diceGroup.calculateTotal()).toEqual(0)
          })

          it("sets the group total", function() {
            diceGroup.calculateTotal()
            expect(diceGroup.total).toEqual(0)
          })
        })

        describe("when not all faces are set", function() {
          beforeEach(function() {
            diceGroup.dices[0].face = 6
            diceGroup.dices[1].face = 3
          })

          it("returns the sum of the current set dice faces", function() {
            expect(diceGroup.calculateTotal()).toEqual(9)
          })

          it("sets the group total", function() {
            diceGroup.calculateTotal()
            expect(diceGroup.total).toEqual(9)
          })
        })

        describe("when all faces are set", function() {
          beforeEach(function() {
            firstDice.face = 10
            secondDice.face = 6
            thirdDice.face = 3
          })

          it("returns the sum of the current set dice faces, except the smaller one", function() {
            expect(diceGroup.calculateTotal()).toEqual(16)
          })

          it("sets the group total", function() {
            diceGroup.calculateTotal()
            expect(diceGroup.total).toEqual(16)
          })

          it("sets the smaller one as discarded", function() {
            spyOn(firstDice, 'discard')
            spyOn(secondDice, 'discard')
            spyOn(thirdDice, 'discard')

            diceGroup.calculateTotal()

            expect(firstDice.discard).not.toHaveBeenCalled()
            expect(secondDice.discard).not.toHaveBeenCalled()
            expect(thirdDice.discard).toHaveBeenCalled()
          })
        })
      })

      describe("when 2 dices are discarded", function() {
        beforeEach(inject(function (DiceRollerDiceGroup) {
          diceGroup = new DiceRollerDiceGroup({ sides: 10, name: 'my-dice', dices: 3, discard: 2 })
        }))

        beforeEach(function() {
          firstDice  = diceGroup.dices[0]
          secondDice = diceGroup.dices[1]
          thirdDice  = diceGroup.dices[2]
        })

        describe("when there is no face set", function() {
          it("returns zero", function() {
            expect(diceGroup.calculateTotal()).toEqual(0)
          })

          it("sets the group total", function() {
            diceGroup.calculateTotal()
            expect(diceGroup.total).toEqual(0)
          })
        })

        describe("when not all faces are set", function() {
          beforeEach(function() {
            diceGroup.dices[0].face = 6
            diceGroup.dices[1].face = 3
          })

          it("returns the sum of the current set dice faces, except the smaller ones", function() {
            expect(diceGroup.calculateTotal()).toEqual(6)
          })

          it("sets the group total", function() {
            diceGroup.calculateTotal()
            expect(diceGroup.total).toEqual(6)
          })

          it("sets the smaller ones as discarded", function() {
            spyOn(firstDice, 'discard')
            spyOn(secondDice, 'discard')
            spyOn(thirdDice, 'discard')

            diceGroup.calculateTotal()

            expect(firstDice.discard).not.toHaveBeenCalled()
            expect(secondDice.discard).toHaveBeenCalled()
            expect(thirdDice.discard).not.toHaveBeenCalled()
          })
        })

        describe("when all faces are set", function() {
          beforeEach(function() {
            firstDice.face  = 10
            secondDice.face = 6
            thirdDice.face  = 3
          })

          it("returns the sum of the current set dice faces, except the smaller ones", function() {
            expect(diceGroup.calculateTotal()).toEqual(10)
          })

          it("sets the group total", function() {
            diceGroup.calculateTotal()
            expect(diceGroup.total).toEqual(10)
          })

          it("sets the smaller ones as discarded", function() {
            spyOn(firstDice, 'discard')
            spyOn(secondDice, 'discard')
            spyOn(thirdDice, 'discard')

            diceGroup.calculateTotal()

            expect(firstDice.discard).not.toHaveBeenCalled()
            expect(secondDice.discard).toHaveBeenCalled()
            expect(thirdDice.discard).toHaveBeenCalled()
          })

          describe("and all faces have the same value", function() {
            beforeEach(function() {
              firstDice.face  = 3
              secondDice.face = 3
              thirdDice.face  = 3
            })

            it("returns the sum of the current set dice faces, except the first 2", function() {
              expect(diceGroup.calculateTotal()).toEqual(3)
            })

            it("sets the group total", function() {
              diceGroup.calculateTotal()
              expect(diceGroup.total).toEqual(3)
            })

            it("sets the first 2 as discarded", function() {
              spyOn(firstDice,  'discard')
              spyOn(secondDice, 'discard')
              spyOn(thirdDice,  'discard')

              diceGroup.calculateTotal()

              expect(firstDice.discard).toHaveBeenCalled()
              expect(secondDice.discard).toHaveBeenCalled()
              expect(thirdDice.discard).not.toHaveBeenCalled()
            })

          })
        })
      })
    })
  })
})
