class Game {
  constructor(playerO, playerX, randomiser) {
    this.playerO = playerO;
    this.playerX = playerX;
    this.randomiser = randomiser;
    this.whoseTurn = this.whoFirst();
    this.board = [[null, null, null], [null, null, null], [null, null, null]]
    this.winner = null;
  }
  showBoard() {
    return this.board;
  }
  getWhoseTurn() {
    return this.whoseTurn;
  }
  whoFirst(){
    return (this.randomiser.pickPlayer() >= 0.5) ? this.playerO : this.playerX;
  }
  place(x, y){
    (this.whoseTurn === this.playerO) ? this.board[x][y] = "O" : this.board[x][y] = "X";
    (this.whoseTurn === this.playerO) ? this.whoseTurn = this.playerX : this.whoseTurn = this.playerO
  }
  completed() {
    return this.#checkCompletion();
  }
  getWinner() {
    return this.winner;
  }

  #checkCompletion() {
    let completion = false;
    this.board.forEach((rowArray) => {
      if (rowArray.join('') === "OOO") {
        completion = true;
        this.winner = this.playerO;
      }
      if (rowArray.join('') === "XXX") {
        completion = true;
        this.winner = this.playerX;
      }
    })
    if (!this.board.flat().includes(null)) {
      completion = true
    }
    return completion;
  }
}

module.exports = Game;