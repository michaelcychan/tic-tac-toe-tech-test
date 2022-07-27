class Game {
  constructor(playerO, playerX, randomiser) {
    this.playerO = playerO;
    this.playerX = playerX;
    this.randomiser = randomiser;
    this.whoseTurn = this.whoFirst();
    this.board = [[null, null, null], [null, null, null], [null, null, null]]
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
    return false;
  }
}

module.exports = Game;