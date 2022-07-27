const Game = require('../game');

describe('Game', () => {
  describe('initialisation', () => {
    it('initialises with an empty board', () => {
      const player1Double = {};
      const player2Double = {};
      const game = new Game(player1Double, player2Double);
      expect(game.showBoard()).toStrictEqual([[null, null, null], [null, null, null], [null, null, null]]);
    })
    
  });
})