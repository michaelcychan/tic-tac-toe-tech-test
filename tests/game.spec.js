const Game = require('../game');

describe('Game', () => {
  describe('initialisation', () => {
    it('initialises with an empty board', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => 0.5};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      expect(game.showBoard()).toStrictEqual([[null, null, null], [null, null, null], [null, null, null]]);
      expect(game.completed()).toBe(false);
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
  describe('first moves', () => {
    it('shows the board and next player correctly when player O places at 0, 0', () => {
      const playerODouble = {place: () => (1,1)};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => 0.5};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(0,0);
      expect(game.showBoard()).toStrictEqual([["O", null, null], [null, null, null], [null, null, null]]);
      expect(game.getWhoseTurn()).toBe(playerXDouble);
    });
    it('shows the board and next player correctly when two players played a round', () => {
      const playerODouble = {place: () => (1,1)};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => 0.5};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(0,0); // O
      game.place(1,1); // X
      expect(game.showBoard()).toStrictEqual([["O", null, null], [null, "X", null], [null, null, null]]);
      expect(game.getWhoseTurn()).toBe(playerODouble);
    });
    it('shows the correct board after four rounds', () => {
      const playerODouble = {place: () => (1,1)};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => 0.5};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(0, 0); // O
      game.place(1, 1); // X
      game.place(0, 1); // O
      game.place(1, 0); // X
      expect(game.showBoard()).toStrictEqual([["O", "O", null], ["X", "X", null], [null, null, null]]);
      expect(game.getWhoseTurn()).toBe(playerODouble);
      expect(game.completed()).toBe(false);
    });
  });
  describe('Game ending conditions', () => {
    it('ends the game when all slots have been placed', () => {
      const playerODouble = {place: () => (1,1)};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => 0.5};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(0, 0); // O
      game.place(1, 1); // X
      game.place(0, 1); // O
      game.place(1, 0); // X
      game.place(1, 2); // O
      game.place(0, 2); // X
      game.place(2, 0); // O
      game.place(2, 1); // X
      game.place(2, 2); // O
      expect(game.showBoard()).toStrictEqual([["O", "O", "X"], ["X", "X", "O"], ["O", "X", "O"]]);
      expect(game.completed()).toBe(true);
      expect(game.getWinner()).toBe(null);
    });
    it('ends the game when all slots have been placed', () => {
      const playerODouble = {place: () => (1,1)};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => 0.5};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(0, 0); // O
      game.place(1, 1); // X
      game.place(0, 1); // O
      game.place(1, 0); // X
      game.place(0, 2); // O
      expect(game.showBoard()).toStrictEqual([["O", "O", "O"], ["X", "X", null], [null, null, null]]);
      expect(game.completed()).toBe(true);
      expect(game.getWinner()).toBe(playerODouble);
    });
  })
})