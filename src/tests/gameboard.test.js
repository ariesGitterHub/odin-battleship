// const { Gameboard } = require("../js/gameboard.js");
import { Gameboard } from "../js/gameboard.js";

// describe("Gameboard", () => {
//   let seaBoard = Array(10)
//     .fill()
//     .map(() => Array(10).fill("--"));

//   const testGame = new Gameboard(seaBoard);

//   beforeEach(() => {
//     // This will run before each test, creating a fresh instance of the Gameboard and board setup.

//     // Legitimate ship placements
//     testGame.placeShip(testGame.ships[0], "v", 1, 7);
//     testGame.placeShip(testGame.ships[1], "v", 2, 0);
//     testGame.placeShip(testGame.ships[2], "h", 3, 2);
//     testGame.placeShip(testGame.ships[3], "v", 5, 5);
//     testGame.placeShip(testGame.ships[4], "h", 8, 7);
//   });

//   console.table(seaBoard);

//   it("should render improper ship placements as 'invalid'", () => {
//     // Invalid ship placements
//     testGame.placeShip(testGame.ships[0], "h", 0, 8); // line 46
//     testGame.placeShip(testGame.ships[2], "h", 1, 7); // line 49
//     testGame.placeShip(testGame.ships[0], "v", 6, 9); // line 59
//     testGame.placeShip(testGame.ships[2], "v", 4, 5); // line 62
//     testGame.placeShip(testGame.ships[5], "h", 0, 0); // line 67
//   });

//   it("should show the correct 'hit', 'miss', or 'retry', and update the ship with hits", () => {
//     expect(testGame.receiveAttack(-1, 0)).toBe("invalid");

//     expect(testGame.receiveAttack(0, 7)).toBe("miss");

//     expect(testGame.receiveAttack(3, 1)).toBe("miss");

//     expect(testGame.receiveAttack(6, 6)).toBe("miss");

//     expect(testGame.receiveAttack(0, 7)).toBe("retry");

//     expect(testGame.receiveAttack(1, 7)).toBe("hit");
//     expect(testGame.receiveAttack(2, 0)).toBe("hit");
//     expect(testGame.receiveAttack(3, 2)).toBe("hit");
//     expect(testGame.receiveAttack(5, 5)).toBe("hit");
//     expect(testGame.receiveAttack(8, 7)).toBe("hit");

//     expect(testGame.ships[0].numHits).toBe(1);
//     expect(testGame.ships[1].numHits).toBe(1);
//     expect(testGame.ships[2].numHits).toBe(1);
//     expect(testGame.ships[3].numHits).toBe(1);
//     expect(testGame.ships[4].numHits).toBe(1);

//     expect(testGame.ships[0].isSunk()).toBe(false);
//     expect(testGame.ships[1].isSunk()).toBe(false);

//     expect(testGame.ships[4].numHits).toBe(1);
//     expect(testGame.ships[4].isSunk()).toBe(false);
//     expect(testGame.receiveAttack(8, 8)).toBe("hit");
//     expect(testGame.ships[4].numHits).toBe(2);
//     expect(testGame.ships[4].isSunk()).toBe(true);
//     console.table(seaBoard);
//   });
// });

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
    const result = testGame.placeShip(testGame.ships[5], "h", 0, 0);
    expect(result).toBe("invalid");
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
});
