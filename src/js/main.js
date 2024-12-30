// Create the Ship class. Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
// REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
// Ships should have a hit() function that increases the number of ‘hits’ in your ship.
// isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.

class Ship {
  constructor(name, length, numHits = 0, sunkStatus = false) {
    (this.name = name),
      (this.length = length),
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

// const ship5C = new Ship("Carrier", 5)
// const ship4B = new Ship("Battleship", 4);
// const ship3D = new Ship("Destroyer", 3);
// const ship3S = new Ship("Submarine", 3);
// const ship2P = new Ship("Patrol Boat", 2);

// module.exports = { ship5C };
module.exports = { Ship };


// Create the Gameboard class

// Create the Player class