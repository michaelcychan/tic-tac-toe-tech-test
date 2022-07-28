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
    if (this.board[x][y] != null) {
      throw('Spot Taken')
    } else {
      (this.whoseTurn === this.playerO) ? this.board[x][y] = "O" : this.board[x][y] = "X";
    (this.whoseTurn === this.playerO) ? this.whoseTurn = this.playerX : this.whoseTurn = this.playerO
    }
  }
  completed() {
    return this.#checkCompletion();
  }
  getWinner() {
    return this.winner;
  }

  #checkWinning() {
    let checkingPattern = [];

    // row patterns
    this.board.forEach((rowArray) => {
      checkingPattern.push(rowArray.join('')) 
    })

    // horizontal patterns
    for (let i = 0; i < this.board[0].length; i ++) {
      checkingPattern.push(this.board[0][i] + this.board[1][i] + this.board[2][i]) 
    }

    // diagonal patterns
    checkingPattern.push(this.board[0][2] + this.board[1][1] + this.board[2][0])
    checkingPattern.push(this.board[0][0] + this.board[1][1] + this.board[2][2])

    if (checkingPattern.includes("OOO")) {
      this.winner = this.playerO;
    } else if (checkingPattern.includes("XXX")) {
      this.winner = this.playerX;
    }
  }

  #checkCompletion() {
    let completion = false;
    this.#checkWinning();
    if (!this.board.flat().includes(null) || this.winner != null) {
      completion = true
    }
    return completion;
  }
}

module.exports = Game;