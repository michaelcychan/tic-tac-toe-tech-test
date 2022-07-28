class Randomiser {
  constructor (one, two) {
    this.one = one;
    this.two = two;
  }
  pickPlayer () {
    if (Math.random() >= 0.5) {
      return this.one
    } else {
      return this.two
    }
  }
}

module.exports = Randomiser;