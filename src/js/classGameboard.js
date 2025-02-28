// Create Gameboard class.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.

// Use indexing as coordinates, e.g., first cell in this 10 x 10 grid is [0][0], 100th is [9][9].
// Idea: let "--" = neither hit nor miss, let "!!" = hit, let "mm" = miss, carrier = c5, battleship = b4, destroyer = d3, submarine = s3, patrol boat = p2

import { Ship } from "./classShip.js";

class Gameboard {
  constructor(
    board,
    ships = []
    //, ships = [this.c5, this.b4, this.d3, this.s3, this.p2]
  ) {
    this.board = board;
    // this.c5 = new Ship("aircraft carrier", 5, "c5");
    // this.b4 = new Ship("battleship", 4, "b4");
    // this.d3 = new Ship("destroyer", 3, "d3");
    // this.s3 = new Ship("submarine", 3, "s3");
    // this.p2 = new Ship("patrol boat", 2, "p2");

    this.ships =
      ships.length > 0
        ? ships
        : [
            new Ship("aircraft carrier", 5, "a", "A!"),
            new Ship("battleship", 4, "b", "B!"),
            new Ship("destroyer", 3, "d", "D!"),
            new Ship("submarine", 3, "s", "S!"),
            new Ship("corvette", 2, "c", "C!"),
            // new Ship("patrol boat", 1, "p"), // Remove patrol boat, too small, slows down game-play
          ];
    // this.ships = ships
    // || [this.c5, this.b4, this.d3, this.s3, this.p2];
  }

  allShipsArePlaced() {
    const requiredCodes = new Set(["a", "b", "d", "s", "c"]);
    let foundCodes = new Set();

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const cell = this.board[i][j];
        if (requiredCodes.has(cell)) {
          foundCodes.add(cell);
        }
        // If we've found all required board codes, return true early
        if (foundCodes.size === requiredCodes.size) {
          return true;
        }
      }
    }

    // If we finish and haven't found all the codes, return false
    return false;
  }

  // allShipsAreSunk() {
  //   const requiredCodes = new Set(["A!", "B!", "D!", "S!", "C!"]);
  //   let foundCodes = new Set();

  //   for (let i = 0; i < this.board.length; i++) {
  //     for (let j = 0; j < this.board[i].length; j++) {
  //       const cell = this.board[i][j];
  //       if (requiredCodes.has(cell)) {
  //         foundCodes.add(cell);
  //       }
  //       // If we've found all required board codes, return true early
  //       if (foundCodes.size === requiredCodes.size) {
  //         return true;
  //       }
  //     }
  //   }

  //   // If we finish and haven't found all the codes, return false
  //   return false;
  // }

  //Method to remove a ship
  removeShip(boardCode) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === boardCode) {
          this.board[i][j] = "--";
        }
      }
    }
  }

  removeAllShips() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] !== "--") {
          this.board[i][j] = "--";
        }
      }
    }
  }

  checkShipPlacementCell(ship, axis, row, col) {
    // Checks if the ship is in the ships array
    if (ship) {
      for (let i = 0; i < ship.length; i++) {
        // takes the initial, desired placement cell, and loops through the length of a particular ship and checks the horizontal axis...
        if (axis === "h") {
          // ...to see if all cells are on the grid
          if (
            row < 0 ||
            row >= this.board.length ||
            col + i < 0 ||
            col + i >= this.board[0].length
          ) {
            return "invalid";
          }
          // ...and if all those same cells are "--", i.e., open for placement and not already occupied by another ship
          if (this.board[row][col + i] !== "--") {
            return "invalid";
          }
        }
        // takes the initial, desired placement cell, and loops through the length of a particular ship and checks the vertical axis...
        if (axis === "v") {
          // ...to see if all cells are on the grid
          if (
            row + i < 0 ||
            row + i >= this.board.length ||
            col < 0 ||
            col >= this.board[0].length
          ) {
            return "invalid";
          }
          // ...and if all those same cells are "--", i.e., open for placement and not already occupied by another ship
          if (this.board[row + i][col] !== "--") {
            return "invalid";
          }
        }
      }
    }
    // Returns invalid if the ship at that given index is not in the ships array
    else {
      return "invalid";
    }
  }

  // Method to place a ship
  placeShip(ship, axis, row, col) {
    // name the ship you want to place by ships array index
    // use starting coordinate [row][col] as the key to finding the rest
    // use axis to control the direction that the following coordinates will lay forth
    // edge case...check each row/col using a loop to ensure all are within the bounds of the board
    // make sure two ships don't try to occupy or overwrite each other.
    // make sure you only place ships in the ship array, e.g., x5 ships have an index range of [0] to [4], ship [5] is not there. Use a look ahead?

    let placementCheck = this.checkShipPlacementCell(ship, axis, row, col);

    if (placementCheck === "invalid") {
      return "invalid";
    } else {
      // "h" for horizontal game piece orientation
      if (axis === "h") {
        for (let i = 0; i < ship.length; i++) {
          this.board[row][col + i] = ship.boardCode;
        }
      }
      // "v" for vertical game piece
      if (axis === "v") {
        for (let i = 0; i < ship.length; i++) {
          this.board[row + i][col] = ship.boardCode;
        }
      }
    }
  }

  // Checks if receiveAttack() coordinates are on the grid
  checkGridPlacement(row, col) {
    if (
      row < 0 ||
      row >= this.board.length ||
      col < 0 ||
      col >= this.board[0].length
    ) {
      return "invalid";
    }
  }

  // Checks the value this.board[row][col] to see if its value is a ship's boardCode (e.g., "c5", an aircraft carrier, or "d4", a destroyer); it then tells that given ship that it has been hit

  // OLD CODE
  // checkShipBoardCodeNotifyShip(row, col) {
  //   let hitTarget = this.board[row][col];
  //   hitTarget === this.c5.boardCode ? this.c5.hit() : null;
  //   hitTarget === this.b4.boardCode ? this.b4.hit() : null;
  //   hitTarget === this.d3.boardCode ? this.d3.hit() : null;
  //   hitTarget === this.s3.boardCode ? this.s3.hit() : null;
  //   hitTarget === this.p2.boardCode ? this.p2.hit() : null;
  // }

  // BETTER CODE -- KEEP THIS THOUGH...as opposed to BELOW, performance boost isn't a big deal and right now with learning TDD, getting 100% testing checks on this class is more satisfying
  checkShipBoardCodeNotifyShip(row, col) {
    let hitTarget = this.board[row][col];
    // let ships = [this.c5, this.b4, this.d3, this.s3, this.p2];

    this.ships.forEach((ship) => {
      if (hitTarget === ship.boardCode) {
        ship.hit();
      }
    });
  }

  // EVEN BETTER CODE, USES FIND() FOR BETTER PERFORMANCE
  // checkShipBoardCodeNotifyShip(row, col) {
  //   let hitTarget = this.board[row][col];

  //   const ship = this.ships.find((ship) => hitTarget === ship.boardCode);
  //   if (ship) {
  //     ship.hit();
  //   }
  // }

  // Method to receive an attack
  receiveAttack(row, col) {
    let placementCheck = this.checkGridPlacement(row, col);

    // Check for out of bounds
    if (placementCheck === "invalid") {
      return "invalid";
    }

    // The target at [row][col]
    let target = this.board[row][col];

    // If the target was already selected, it should have a "!!"" or "mm".
    if (target === "!!" || target === "mm") {
      return "retry"; // The cell has already been attacked or is not a valid target
    }

    // OLD CODE
    // // Hit = "!!": Change the target to "!!" and return the result
    // if (target !== "--" && target !== "!!" && target !== "mm") {
    //   // is this an example of DEPENDENCY INJECTION??????

    //   // Checks which ship was hit and notifies it to update its numHits via hit()
    //   this.checkShipBoardCodeNotifyShip(row, col);
    //   this.board[row][col] = "!!";
    //   return "hit";
    // }

    // // Miss = "mm": Change the target to "mm" and return the result
    // if (target === "--") {
    //   this.board[row][col] = "mm";
    //   return "miss";
    // }

    // BETTER CODE
    if (this.board[row][col] !== "--") {
      // Hit = "!!": Change the target to "!!" and return the result
      // Notify the correct ship that it was

      // TODO: rewrites as switch?
      if (this.board[row][col] === "a") {
        this.checkShipBoardCodeNotifyShip(row, col);
        this.board[row][col] = "A!";
        return "hit";
      }
      if (this.board[row][col] === "b") {
        this.checkShipBoardCodeNotifyShip(row, col);
        this.board[row][col] = "B!";
        return "hit";
      }
      if (this.board[row][col] === "d") {
        this.checkShipBoardCodeNotifyShip(row, col);
        this.board[row][col] = "D!";
        return "hit";
      }
      if (this.board[row][col] === "s") {
        this.checkShipBoardCodeNotifyShip(row, col);
        this.board[row][col] = "S!";
        return "hit";
      }
      if (this.board[row][col] === "c") {
        this.checkShipBoardCodeNotifyShip(row, col);
        this.board[row][col] = "C!";
        return "hit";
      }
      if (this.board[row][col] === "p") {
        this.checkShipBoardCodeNotifyShip(row, col);
        this.board[row][col] = "P!";
        return "hit";
      }
    }
    // Miss = "mm": Change the target to "mm" and return the result
    else {
      this.board[row][col] = "mm";
      return "miss";
    }
  }
  // USEFUL?
  // checkIfAllShipsSunk() {
  //   return this.ships.every((ship) => ship.sunkStatus);
  // }
}

// module.exports = { Gameboard };
export { Gameboard };
