// Create Gameboard class.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.

// Use indexing as coordinates, e.g., first cell in this 10 x 10 grid is [0][0], 100th is [9][9].
// Idea: let "?" = neither hit nor miss, let "!" = hit, let "m" = miss, carrier = C5, battleship = B4, destroyer = D3, submarine = S3, patrol boat = P2

// const seaBoard = [
//   ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
//   ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
//   ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
//   ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
//   ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
//   ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
//   ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
//   ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
//   ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
//   ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"]
// ];

class Gameboard {
  constructor(board) {
    this.board = board;
  }

  // Method to receive an attack
  receiveAttack(row, col) {
    // Ensure the row and col are within the bounds of the board
    if (
      row < 0 ||
      row >= this.board.length ||
      col < 0 ||
      col >= this.board[0].length
    ) {
      return "invalid"; // Handle invalid coordinates
    }

    // Check the target at [row][col]
    let target = this.board[row][col];
    // const hitShip = [C5: ]

    // If the target was already selected, it should have a "!"" or "m".
    if (target === "!" || target === "m") {
      return "retry"; // The cell has already been attacked or is not a valid target
    }

    // Send the hit() to the correct ship
    if (target === "d3") {

    }

    // Hit: Change the target to "!" and return the result
    if (target !== "?" && target !== "!" && target !== "m") {
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

module.exports = { Gameboard };
