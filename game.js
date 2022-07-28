class Game {
  constructor(playerO, playerX, randomiser) {
    this.playerO = playerO;
    this.playerX = playerX;
    this.randomiser = randomiser;
    this.whoseTurn = this.whoFirst();
    this.board = [[null, null, null], [null, null, null], [null, null, null]]
    this.winner = null;
  }

  // pass board to presentation module
  showBoard() {
    return this.board;
  }

  // pass to presentation module
  getWhoseTurn() {
    return this.whoseTurn;
  }

  // using a randomiser to pick who plays first
  whoFirst(){
    return (this.randomiser.pickPlayer(this.playerO, this.playerX));
  }

  // main board program should check if the game completes first before allowing place()
  place(x, y){
    if (this.board[x][y] != null) {
      throw('Spot Taken')
    } else {
      (this.whoseTurn === this.playerO) ? this.board[x][y] = "O" : this.board[x][y] = "X";
    (this.whoseTurn === this.playerO) ? this.whoseTurn = this.playerX : this.whoseTurn = this.playerO
    }
  }

  // return true or false for if the game is completed.
  completed() {
    return this.#checkCompletion();
  }

  // return the winner / or null for unfinished game or tie
  getWinner() {
    return this.winner;
  }

  // private functions

  // to calculate if there is a winner before every turn
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

  // check if the game ends
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