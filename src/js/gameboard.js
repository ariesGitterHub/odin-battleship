// Create Gameboard class.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.

// Use indexing as coordinates, e.g., first cell in this 10 x 10 grid is [0][0], 100th is [9][9].
// Idea: let "?" = neither hit nor miss, let "!" = hit, let "m" = miss, carrier = C5, battleship = B4, destroyer = D3, submarine = S3, patrol boat = P2

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
      return "invalid"; // Handle invalid coordinates
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
  
  placeShip(ship, axis, row, col) {
    // name the ship you want to place
    // use starting coordinate [row][col] as the key to finding the rest
    // use axis to control the direction that the following coordinates will lay forth
    // check each row/col using a loop to ensure all are within the bounds of the board

    // "v" for vertical game piece orientation
    if (axis === "v") {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i] = ship.boardCode;
      }
    }
    // "h" for horizontal game piece orientation
    if (axis === "h") {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship.boardCode;
      }
    }
  }

  

  // Method to receive an attack
  receiveAttack(row, col) {
    // Ensure the row and col are within the bounds of the board
    // if (
    //   row < 0 ||
    //   row >= this.board.length ||
    //   col < 0 ||
    //   col >= this.board[0].length
    // ) {
    //   return "invalid"; // Handle invalid coordinates
    // }
    let placementCheck = this.checkGridPlacement(row, col);
    if (placementCheck === "invalid") {
      return "invalid"; // Early return if coordinates are invalid
    }

    // Check the target at [row][col]
    let target = this.board[row][col];

    // If the target was already selected, it should have a "!"" or "m".
    if (target === "!" || target === "m") {
      return "retry"; // The cell has already been attacked or is not a valid target
    }

    // Hit: Change the target to "!" and return the result
    if (target !== "?" && target !== "!" && target !== "m") {
      // Send the hit() to the correct ship using DEPENDENCY INJECTION
      // const d3 = new Ship("destroyer", 3, "d3");
      // if (target === this.d3.boardCode) {
      //   this.d3.hit();
      // }
      this.isHit(row, col);
      this.board[row][col] = "!"; // Mark the board cell as hit
      return "hit";
    }

    // Miss: Change the target to "m" and return the result
    if (target === "?") {
      this.board[row][col] = "m"; // Mark the board cell as missed
      return "miss";
    }
  }
}

// module.exports = { Gameboard };
export { Gameboard };
