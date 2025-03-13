import { Ship } from "./classShip.js";

class Gameboard {
  constructor(board, ships = []) {
    this.board = board;
    this.ships =
      ships.length > 0
        ? ships
        : [
            new Ship("aircraft carrier", 5, "a", "A!"),
            new Ship("battleship", 4, "b", "B!"),
            new Ship("destroyer", 3, "d", "D!"),
            new Ship("submarine", 3, "s", "S!"),
            new Ship("corvette", 2, "c", "C!"),
            // new Ship("patrol boat", 1, "p"), // Commented out patrol boat, because it's too small, and slows down game-play, keep for reference in case I ever add it back on a whim
          ];
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
        // Takes the initial, desired placement cell, and loops through the length of a particular ship and checks the horizontal axis
        if (axis === "h") {
          // Checks if all cells are on the grid
          if (
            row < 0 ||
            row >= this.board.length ||
            col + i < 0 ||
            col + i >= this.board[0].length
          ) {
            return "invalid";
          }
          // Checks if all those same cells are "--", i.e., open for placement and not already occupied by another ship
          if (this.board[row][col + i] !== "--") {
            return "invalid";
          }
        }
        // Takes the initial, desired placement cell, and loops through the length of a particular ship and checks the vertical axis
        if (axis === "v") {
          // Checks if all cells are on the grid
          if (
            row + i < 0 ||
            row + i >= this.board.length ||
            col < 0 ||
            col >= this.board[0].length
          ) {
            return "invalid";
          }
          // Again, checks if all those same cells are "--", i.e., open for placement and not already occupied by another ship
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
    // Name the ship you want to place by ships array index
    // Use starting coordinate [row][col] as the key to finding the rest
    // Use axis to control the direction that the following coordinates will lay forth
    // Edge case: check each row/col using a loop to ensure all are within the bounds of the board
    // Make sure two ships don't try to occupy or overwrite each other
    // Make sure you only place ships in the ship array, e.g., x5 ships have an index range of [0] to [4], ship [5] is not there
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

  // Checks the value this.board[row][col] to see if its value is a ship's boardCode (e.g., "a", an aircraft carrier, or "d", a destroyer); it then tells that given ship that it has been hit
  checkShipBoardCodeNotifyShip(row, col) {
    let hitTarget = this.board[row][col];
    this.ships.forEach((ship) => {
      if (hitTarget === ship.boardCode) {
        ship.hit();
      }
    });
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
    if (
      target === "A!" ||
      target === "B!" ||
      target === "D!" ||
      target === "S!" ||
      target === "C!" ||
      target === "mm"
    ) {
      return "retry"; // The cell has already been attacked or is not a valid target
    }
    if (this.board[row][col] !== "--") {
      // Notify the correct ship that it was
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
      // if (this.board[row][col] === "p") {
      //   this.checkShipBoardCodeNotifyShip(row, col);
      //   this.board[row][col] = "P!";
      //   return "hit";
      // }
    }
    // Miss = "mm": Change the target to "mm" and return the result
    else {
      this.board[row][col] = "mm";
      return "miss";
    }
  }
}

export { Gameboard };
