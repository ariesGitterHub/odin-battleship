// Create the Ship class. Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
// REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
// Ships should have a hit() function that increases the number of ‘hits’ in your ship.
// isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.

class Ship {
  constructor(
    name,
    length,
    boardCode,
    boardSunkCode,
    numHits = 0,
    sunkStatus = false
  ) {
    (this.name = name),
      (this.length = length),
      (this.boardCode = boardCode),
      (this.boardSunkCode = boardSunkCode);
      (this.numHits = numHits),
      (this.sunkStatus = sunkStatus);
  }

  hit() {
    if (this.numHits < this.length) {
      this.numHits += 1;
    }
  }

  // isSunk() {
  //   this.sunkStatus = true
  //   return this.numHits >= this.length; // WHY: ">="? If for some reason, a ship receives more hits than its length (which can happen if the game logic allows hitting a ship multiple times beyond its length), it would still be considered sunk, because it has received enough hits to exceed its capacity to stay afloat.
  // }

  //   isSunk() { // this function seems clumsy, wouldn't it be better to handle this immediately under hits? Maybe just do what's in the brief and call it a day...
  //   if (this.numHits >= this.length) {
  //     return this.sunkStatus = true;
  //     // WHY: ">="? Answer: If for some reason, a ship receives more hits than its length (which can happen if the game logic allows hitting a ship multiple times beyond its length), it would still be considered sunk, because it has received enough hits to exceed its capacity to stay afloat.
  //     }
  //   }
  // }

  isSunk() {
    if (this.numHits >= this.length) {
      if (!this.sunkStatus) {
        this.sunkStatus = true;
      }
      return true;
    }
    return false;
  }
}

// module.exports = { Ship };
export { Ship };


