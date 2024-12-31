// Create the Ship class. Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
// REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
// Ships should have a hit() function that increases the number of ‘hits’ in your ship.
// isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.

class Ship {
  constructor(name, length, code, numHits = 0, sunkStatus = false) {
    (this.name = name),
    (this.length = length),
    (this.code = code),
    (this.numHits = numHits),
    (this.sunkStatus = sunkStatus);
  }

  hit() {
    if (this.numHits < this.length) {
      this.numHits += 1;
    }
  }
  isSunk() {
    return this.numHits >= this.length; // WHY >=??? If for some reason, a ship receives more hits than its length (which can happen if the game logic allows hitting a ship multiple times beyond its length), it would still be considered sunk, because it has received enough hits to exceed its capacity to stay afloat.
  }
}

// const c5 = new Ship("carrier", 5, "c5")
// const b4 = new Ship("battleship", 4, "b4");
// const d3 = new Ship("destroyer", 3, "d3");
// const s3 = new Ship("submarine", 3, "s3");
// const p2 = new Ship("patrol boat", 2, "p2");

module.exports = { Ship };

