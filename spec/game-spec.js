describe ('Game', function () {
  var game
  var frame

  beforeEach(function () {
    game = new Game ()
    frame = jasmine.createSpyObj('frame', ['getScore'])
  })

  describe ('A bowling game', function () {
    it('should have a current score', function () {
      expect(game.getCurrentScore()).toEqual(0)
    })

    it('should start at frame 1', function () {
      expect(game.getCurrentFrame()).toEqual(1)
    })

    it('can start the next frame', function () {
      game.startNextFrame()
      expect(game.getCurrentFrame()).toEqual(2)
    })
  })

  describe ('Adding a frame', function () {
    it('increases the current score if the frame score > 0', function () {
      frame.getScore.and.returnValue(8)
      game.addFrame(frame)
      expect(game.getCurrentScore()).toEqual(8)
    })

    it('does not increase game score if frame score is 0', function () {
      frame.getScore.and.returnValue(0)
      game.addFrame(frame)
      expect(game.getCurrentScore()).toEqual(0)
    })

    it('starts the next frame', function () {
      game.addFrame(frame)
      expect(game.getCurrentFrame()).toEqual(2)
    })
  })

  describe ('Finishing a game', function() {

    beforeEach(function () {
      for(i = 0; i < 8; i++) {
        game.addFrame(frame)
      }
    })

    it('should not finish when less than 10 frames are completed', function () {
      expect(game.checkFinished()).not.toBe(true)
    })

    it('should finish when all 10 frames are completed', function () {
      game.addFrame(frame)
      expect(game.checkFinished()).toBe(true)
    })
  })
})
