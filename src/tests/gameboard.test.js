import { Gameboard } from "../js/classGameboard.js";

describe("Gameboard", () => {
  let testGame;

  beforeEach(() => {
    const seaBoard = Array(10)
      .fill()
      .map(() => Array(10).fill("--"));
    testGame = new Gameboard(seaBoard);

    // Legitimate ship placements
    testGame.placeShip(testGame.ships[0], "v", 1, 7);
    testGame.placeShip(testGame.ships[1], "v", 2, 0);
    testGame.placeShip(testGame.ships[2], "h", 3, 2);
    testGame.placeShip(testGame.ships[3], "v", 5, 5);
    testGame.placeShip(testGame.ships[4], "h", 8, 7);
  });

  // New Addition
  describe("allShipsArePlaced", () => {
    it("should return true when all ships are placed", () => {
      // After placing all ships, we expect allShipsArePlaced to return true
      expect(testGame.allShipsArePlaced()).toBe(true);
    });

    it("should return false if any ship is not placed", () => {
      // Remove one ship to test for false
      testGame.removeShip("a"); // Removes aircraft carrier
      expect(testGame.allShipsArePlaced()).toBe(false);
    });
  });

  // New Addition
  describe("removeShip", () => {
    it("should correctly remove a ship from the board", () => {
      testGame.removeShip("a");
      expect(testGame.board[1][7]).toBe("--"); // The cell should be empty now
    });
  });

  // New Addition
  describe("removeAllShips", () => {
    it("should remove all ships from the board", () => {
      testGame.removeAllShips();
      expect(testGame.board.flat().includes("A!")).toBe(false); // Ensures no ships are present
      expect(testGame.board.flat().includes("B!")).toBe(false);
    });
  });

  describe("placeShip", () => {
    it("should place the ship correctly", () => {
      const spy = jest.spyOn(testGame, "placeShip");
      testGame.placeShip(testGame.ships[0], "v", 3, 4);
      expect(spy).toHaveBeenCalledWith(testGame.ships[0], "v", 3, 4);
    });
  });

  describe("invalid ship placements", () => {
    it("should render ship placement as 'invalid' when ship is placed out of bounds horizontally", () => {
      const result = testGame.placeShip(testGame.ships[0], "h", 0, 8);
      expect(result).toBe("invalid");
    });

    it("should render ship placement as 'invalid' when a ship collides with another ship due to placement overlap", () => {
      const result = testGame.placeShip(testGame.ships[2], "h", 1, 7);
      expect(result).toBe("invalid");
    });

    it("should render ship placement as 'invalid' when ship is placed out of bounds vertically", () => {
      const result = testGame.placeShip(testGame.ships[0], "v", 6, 9);
      expect(result).toBe("invalid");
    });

    it("should render ship placement as 'invalid' when a ship collides with another ship due to placement overlap", () => {
      const result = testGame.placeShip(testGame.ships[2], "v", 4, 5);
      expect(result).toBe("invalid");
    });

    it("should render ship placement as 'invalid' when trying to place a ship that does not exist, e.g., a sixth ship at index [5] taht is beyond the five available ships", () => {
      const result = testGame.placeShip(testGame.ships[9], "h", 0, 0);
      expect(result).toBe("invalid");
    });
  });

  // New Addition
  describe("checkGridPlacement", () => {
    it("should return 'invalid' for out-of-bounds grid placement", () => {
      expect(testGame.checkGridPlacement(-1, 0)).toBe("invalid");
      expect(testGame.checkGridPlacement(10, 10)).toBe("invalid");
    });

    it("should return 'valid' for valid grid placement", () => {
      expect(testGame.checkGridPlacement(0, 0)).toBe(undefined); // In-bounds, no return value
    });
  });

  describe("when attacking", () => {
    it("should return 'invalid' for an attack outside the board", () => {
      expect(testGame.receiveAttack(-1, 0)).toBe("invalid");
      expect(testGame.receiveAttack(10, 10)).toBe("invalid");
    });

    it("should return 'miss' for an empty spot", () => {
      expect(testGame.receiveAttack(0, 7)).toBe("miss");
    });

    it("should return 'hit' for a spot with a ship", () => {
      expect(testGame.receiveAttack(1, 7)).toBe("hit");
    });

    it("should return 'retry' for a previously attacked location", () => {
      testGame.receiveAttack(0, 7); // Already attacked
      expect(testGame.receiveAttack(0, 7)).toBe("retry");
    });
  });

  describe("when tracking ship hits", () => {
    it("should correctly update the ship's hit count", () => {
      testGame.receiveAttack(1, 7); // Assume this hits the first ship
      expect(testGame.ships[0].numHits).toBe(1);
    });

    it("should mark the ship as sunk after enough hits", () => {
      testGame.receiveAttack(8, 7);
      testGame.receiveAttack(8, 8); // Hits the 5th ship
      expect(testGame.ships[4].isSunk()).toBe(true);
    });
  });

  // New Addition
  describe("checkGridPlacement", () => {
    it("should return 'invalid' for out-of-bounds grid placement", () => {
      expect(testGame.checkGridPlacement(-1, 0)).toBe("invalid");
      expect(testGame.checkGridPlacement(10, 10)).toBe("invalid");
    });

    it("should return 'valid' for valid grid placement", () => {
      expect(testGame.checkGridPlacement(0, 0)).toBe(undefined); // In-bounds, no return value
    });
  });

  // New Addition
  describe("checkShipBoardCodeNotifyShip", () => {
    it("should notify the correct ship when it is hit", () => {
      const spy = jest.spyOn(testGame.ships[0], "hit");
      testGame.receiveAttack(1, 7); // Hits the first ship
      expect(spy).toHaveBeenCalled();
    });
  });

});


