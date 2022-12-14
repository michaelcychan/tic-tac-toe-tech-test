const Game = require('../game');

describe('Game', () => {
  describe('initialisation', () => {
    it('initialises with an empty board', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerODouble};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      expect(game.showBoard()).toStrictEqual([[null, null, null], [null, null, null], [null, null, null]]);
      expect(game.completed()).toBe(false);
    });
    it('lets playerO to be the first player if randomiser returns playerO', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerODouble};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      expect(game.getWhoseTurn()).toBe(playerODouble);
    });
    it('lets playerX to be the first player if randomiser returns playerX', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerXDouble};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      expect(game.getWhoseTurn()).toBe(playerXDouble);
    });
  });
  describe('first moves', () => {
    it('shows the board and next player correctly when player O places at 0, 0', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerODouble};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(0,0);
      expect(game.showBoard()).toStrictEqual([["O", null, null], [null, null, null], [null, null, null]]);
      expect(game.getWhoseTurn()).toBe(playerXDouble);
    });
    it('shows the board and next player correctly when two players played a round', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerODouble};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(0,0); // O
      game.place(1,1); // X
      expect(game.showBoard()).toStrictEqual([["O", null, null], [null, "X", null], [null, null, null]]);
      expect(game.getWhoseTurn()).toBe(playerODouble);
    });
    it('shows the correct board after four rounds', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerODouble};
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
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerODouble};
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
    it('ends the game when one player claims all fields in a row ', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerODouble};
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
    it('ends the game when one player claims all fields in a column ', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerODouble};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(0, 0); // O
      game.place(1, 1); // X
      game.place(0, 2); // O
      game.place(0, 1); // X
      game.place(2, 2); // O
      game.place(2, 1); // X
      expect(game.showBoard()).toStrictEqual([["O", "X", "O"], [null, "X", null], [null, "X", "O"]]);
      expect(game.completed()).toBe(true);
      expect(game.getWinner()).toBe(playerXDouble);
    });
    it('ends the game when one player claims all fields in a diagonal ', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerXDouble};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(1, 1); // X
      game.place(0, 1); // O
      game.place(0, 2); // X
      game.place(0, 0); // O
      game.place(2, 0); // X
      expect(game.showBoard()).toStrictEqual([["O", "O", "X"], [null, "X", null], ["X", null, null]]);
      expect(game.completed()).toBe(true);
      expect(game.getWinner()).toBe(playerXDouble);
    });
  });
  describe('edge cases', () => {
    it('throws an error if a player wants to claim a claimed spot', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerXDouble};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(1, 1); // X
      expect(() => {game.place(1, 1)}).toThrow('Spot Taken'); // O
    });
    it('allows players to continue player after throwing a Spot Taken Error', () => {
      const playerODouble = {};
      const playerXDouble = {};
      const randomiserDouble = {pickPlayer: () => playerXDouble};
      const game = new Game(playerODouble, playerXDouble, randomiserDouble);
      game.place(1, 1); // X
      expect(() => {game.place(1, 1)}).toThrow('Spot Taken'); // O
      game.place(0, 0) //O
      expect(game.showBoard()).toStrictEqual([["O", null, null], [null, "X", null], [null, null, null]]);
    })
  })
})