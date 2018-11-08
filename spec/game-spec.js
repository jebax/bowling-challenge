describe ('Game', function () {
  var game
  var frame
  var currentFrame

  beforeEach(function () {
    game = new Game()
    currentFrame = game.getCurrentFrame()
    frame = jasmine.createSpyObj('frame', ['getScore', 'addBowl', 'isFinished'])
  })

  describe ('A bowling game', function () {
    it('can store a list of frames', function () {
      expect(game.getFrames()).toEqual([currentFrame])
    })

    it('should have a current score', function () {
      expect(game.getCurrentScore()).toEqual(0)
    })

    it('should start with a frame', function () {
      expect(game.getCurrentFrame()).toEqual(currentFrame)
    })

    it('can start the next frame', function () {
      spyOn(currentFrame, 'getScore').and.returnValue(5)
      game.startNextFrame()
      expect(game.getCurrentFrame()).not.toEqual(currentFrame)
    })
  })

  describe ('Calculating score', function () {
    it('returns 10 when two frames have 5 points each', function () {
      spyOn(currentFrame, 'getScore').and.returnValue(5)
      game.startNextFrame()
      var newCurrentFrame = game.getCurrentFrame()

      spyOn(newCurrentFrame, 'getScore').and.returnValue(5)
      expect(game.getCurrentScore()).toEqual(10)
    })

    it('returns 26 when one frame is a spare the other scores 8', function () {
      game.addBowl(5)
      game.addBowl(5)
      game.addBowl(8)
      expect(game.getCurrentScore()).toEqual(26)
    })

    it('returns 60 for three consecutive strikes', function () {
      var i = 0
      for(i = 0; i < 3; i++) {
        game.addBowl(10)
      }
      expect(game.getCurrentScore()).toEqual(60)
    })

    it('returns 0 for a gutter game', function () {
      var i = 0
      for(i = 0; i < 20; i++) {
        game.addBowl(0)
      }
      expect(game.getCurrentScore()).toEqual(0)
    })

    it('returns correct score for a full game', function () {
      console.log(game)
      game.addBowl(1)
      game.addBowl(4)
      game.addBowl(4)
      game.addBowl(5)
      game.addBowl(6)
      game.addBowl(4)
      game.addBowl(5)
      game.addBowl(5)
      game.addBowl(10)
      console.log(game.getCurrentScore())
      game.addBowl(0)
      game.addBowl(1)
      console.log(game.getCurrentScore())
      game.addBowl(7)
      game.addBowl(3)
      console.log(game.getCurrentScore())
      game.addBowl(6)
      game.addBowl(4)
      console.log(game.getCurrentScore())
      game.addBowl(10)
      game.addBowl(2)
      game.addBowl(8)
      expect(game.getCurrentScore()).toEqual(127)
    })
  })

  describe('Adding a bowl', function () {
    it('updates current score by the correct number of pins', function () {
      game.addBowl(5)
      expect(game.getCurrentScore()).toEqual(5)
    })

    it('starts next frame if current frame is finished', function () {
      game.addBowl(5)
      game.addBowl(3)
      expect(game.getCurrentFrame()).not.toEqual(currentFrame)
    })

    it('throws an error if the game is finished', function () {
      var i = 0
      for(i = 0; i < 9; i++) {
        game.getFrames().push(frame)
      }
      frame.isFinished.and.returnValue(true)
      expect(function () { game.addBowl(5) }).toThrow('Game Over!')
    })
  })

  describe ('Finishing a game', function() {
    beforeEach(function () {
      var i = 0
      for(i = 0; i < 19; i++) {
        game.addBowl(0)
      }
    })

    it('should not finish when less than 10 frames are completed', function () {
      expect(game.isFinished()).not.toEqual(true)
    })

    it('should finish when all 10 frames are completed', function () {
      game.addBowl(0)
      expect(game.isFinished()).toEqual(true)
    })
  })
})
