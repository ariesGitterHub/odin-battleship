// const { Gameboard } = require("../js/gameboard.js");
import { Gameboard } from "../js/gameboard.js";


describe("Gameboard", () => {
  let seaBoard = [
    ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "d3", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "d3", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "d3", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
  ];

// let seaBoard = Array(10).fill().map(() => Array(10).fill('?'));

// const d3 = new Ship("destroyer", 3, "d3");

  const testGame = new Gameboard(seaBoard);

  it("should show the correct 'hit', 'miss', or 'retry' status and update the ship with hits", () => {
    expect(testGame.receiveAttack(-1, 0)).toBe("invalid");
    expect(testGame.receiveAttack(0, 0)).toBe("miss");
    expect(testGame.receiveAttack(0, 1)).toBe("miss");
    expect(testGame.receiveAttack(0, 2)).toBe("miss");
    expect(testGame.receiveAttack(0, 0)).toBe("retry");
    expect(testGame.receiveAttack(1, 7)).toBe("hit");
    expect(testGame.d3.numHits).toBe(1);
    expect(testGame.receiveAttack(2, 7)).toBe("hit");
    expect(testGame.d3.numHits).toBe(2);
    expect(testGame.d3.isSunk()).toBe(false);
    expect(testGame.receiveAttack(3, 7)).toBe("hit");
    expect(testGame.d3.numHits).toBe(3);
    expect(testGame.d3.isSunk()).toBe(true);
    expect(testGame.receiveAttack(0, 7)).toBe("miss");
    expect(testGame.receiveAttack(1, 7)).toBe("retry");
  });

});
