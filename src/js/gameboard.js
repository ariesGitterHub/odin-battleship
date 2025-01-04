// Create Gameboard class.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.

// Use indexing as coordinates, e.g., first cell in this 10 x 10 grid is [0][0], 100th is [9][9].
// Idea: let "--" = neither hit nor miss, let "!!" = hit, let "mm" = miss, carrier = c5, battleship = b4, destroyer = d3, submarine = s3, patrol boat = p2

import { Ship } from "./ship.js";

class Gameboard {
  constructor(board, ships) {
    this.board = board;
  
    this.c5 = new Ship("aircraft carrier", 5, "c5");
    this.b4 = new Ship("battleship", 4, "b4");
    this.d3 = new Ship("destroyer", 3, "d3");
    this.s3 = new Ship("submarine", 3, "s3");
    this.p2 = new Ship("patrol boat", 2, "p2");

    this.ships = ships || [this.c5, this.b4, this.d3, this.s3, this.p2];
  }

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

  checkShipPlacementCell(ship, axis, row, col) {
    if (ship) {
      for (let i = 0; i < ship.length; i++) {
        if (axis === "h") {
          if (
            row < 0 ||
            row >= this.board.length ||
            col + i < 0 ||
            col + i >= this.board[0].length
          ) {
            return "invalid";
          }
          if (this.board[row][col + i] !== "--") {
            return "invalid";
          }
        }
        if (axis === "v") {
          if (
            row + i < 0 ||
            row + i >= this.board.length ||
            col < 0 ||
            col >= this.board[0].length
          ) {
            return "invalid";
          }
          if (this.board[row + i][col] !== "--") {
            return "invalid";
          }
        }
      }
    } else {
      return "invalid";
    }
      
    }

  isHit(row, col) {
    let hitTarget = this.board[row][col];
    hitTarget === this.c5.boardCode ? this.c5.hit() : null;
    hitTarget === this.b4.boardCode ? this.b4.hit() : null;
    hitTarget === this.d3.boardCode ? this.d3.hit() : null;
    hitTarget === this.s3.boardCode ? this.s3.hit() : null;
    hitTarget === this.p2.boardCode ? this.p2.hit() : null;
  }
  
  // Method to place a ship
  placeShip(ship, axis, row, col) {
    // name the ship you want to place by ships array index
    // use starting coordinate [row][col] as the key to finding the rest
    // use axis to control the direction that the following coordinates will lay forth
    // edge case...check each row/col using a loop to ensure all are within the bounds of the board
    // make sure two ships don't try to occupy or overwrite each other.
    // make sure you only place ships in the ship array, e.g., x5 ships have an index range of [0] to [4], ship [5] is not there. Use a look ahead?
    
    let placementCheck = this.checkShipPlacementCell(ship, axis, row, col)

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

  // Method to receive an attack
  receiveAttack(row, col) {
    let placementCheck = this.checkGridPlacement(row, col);

    // Check for out of bounds
    if (placementCheck === "invalid") {
      return "invalid";
    }

    // The target at [row][col]
    let target = this.board[row][col];

    // If the target was already selected, it should have a "!"" or "m".
    if (target === "!!" || target === "mm") {
      return "retry"; // The cell has already been attacked or is not a valid target
    }

    // Hit = "!": Change the target to "!" and return the result
    if (target !== "--" && target !== "!!" && target !== "mm") {
      // is this an example of DEPENDENCY INJECTION??????

      this.isHit(row, col);
      this.board[row][col] = "!!"; // Marks the board cell as hit
      return "hit";
    }

    // Miss = "m": Change the target to "m" and return the result
    if (target === "--") {
      this.board[row][col] = "mm"; // Marks the board cell as missed
      return "miss";
    }
  }
}

// module.exports = { Gameboard };
export { Gameboard };
