class Randomiser {
  constructor (one, two) {
    this.one = one;
    this.two = two;
  }
  pickPlayer () {
    return (Math.random() >= 0.5) ? this.one : this.two
  }
}

module.exports = Randomiser;