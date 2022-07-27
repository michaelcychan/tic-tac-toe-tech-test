const Game = require('../game');

describe('Game', () => {
  describe('initialisation', () => {
    it('initialises with an empty board', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => 0.5};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      expect(game.showBoard()).toStrictEqual([[null, null, null], [null, null, null], [null, null, null]]);
    });
    it('lets player 1 to be the first player for randomiser give a value equal or more than 0.5', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => 0.5};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      expect(game.getWhoseTurn()).toBe(playerODouble);
    });
    it('lets player 2 to be the first player for randomiser give a value less than 0.5', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => 0.49};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      expect(game.getWhoseTurn()).toBe(playerXDouble);
    });
  });
  describe('first move', () => {
    it('shows the board and next player correctly when player O places at 1,1', () => {
      const playerODouble = {place: () => (1,1)};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => 0.5};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(0,0);
      expect(game.showBoard()).toStrictEqual([["O", null, null], [null, null, null], [null, null, null]]);
      expect(game.getWhoseTurn()).toBe(playerXDouble);
    });
    

  })
})