const Randomiser = require('../randomiser');

describe('Randomiser', () => {
  it('returns the first player if random number is greater than or equal to 0.5', () => {
    const player1 = {}
    const player2 = {}
    const randomiser = new Randomiser(player1, player2);
    jest.spyOn(Math, "random").mockImplementation(() => 0.5);
    expect(randomiser.pickPlayer(player1, player2)).toBe(player1);
  });
  it('returns the first player if random number is smaller than 0.5', () => {
    const player1 = {}
    const player2 = {}
    const randomiser = new Randomiser(player1, player2);
    jest.spyOn(Math, "random").mockImplementation(() => 0.499);
    expect(randomiser.pickPlayer(player1, player2)).toBe(player2);
  });
})