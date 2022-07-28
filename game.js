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

  #checkWinning() {
    let checkingPattern = [];

    // row win - definite need refactoring
    this.board.forEach((rowArray) => {
      checkingPattern.push(rowArray.join('')) 
    })

    // horizontal win - need refactoring
    for (let i = 0; i < this.board[0].length; i ++) {
      checkingPattern.push(this.board[0][i] + this.board[1][i] + this.board[2][i]) 
    }

    // diagonal win
    checkingPattern.push(this.board[0][2] + this.board[1][1] + this.board[2][0])
    checkingPattern.push(this.board[0][0] + this.board[1][1] + this.board[2][2])

    if (checkingPattern.includes("OOO")) {
      this.winner = this.playerO;
    } else if (checkingPattern.includes("XXX")) {
      this.winner = this.playerX;
    }
    
    // // row win - definite need refactoring
    // this.board.forEach((rowArray) => {
    //   if (rowArray.join('') === "OOO") {
    //     this.winner = this.playerO;
    //   }
    //   if (rowArray.join('') === "XXX") {
    //     this.winner = this.playerX;
    //   }
    // })

    // // horizontal win - need refactoring
    // for (let i = 0; i < this.board[0].length; i ++) {
    //   if (this.board[0][i] + this.board[1][i] + this.board[2][i] === "OOO") {
    //   this.winner = this.playerO;
    //   }
    //   if (this.board[0][i] + this.board[1][i] + this.board[2][i] === "XXX") {

    //   this.winner = this.playerX;
    //   }
    // }

    // // diagonal win
    // if (this.board[0][2] + this.board[1][1] + this.board[2][0] === "OOO" || this.board[0][0] + this.board[1][1] + this.board[2][2] === "OOO") {
    //   this.winner = this.playerO;
    // }
    // if (this.board[0][2] + this.board[1][1] + this.board[2][0] === "XXX" || this.board[0][0] + this.board[1][1] + this.board[2][2] === "XXX") {
    //   this.winner = this.playerX;
    // }
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