import { Gameboard } from "../js/gameboard.js";
import { Player } from "../js/player.js";

describe("Player", () => {
  let playerOne;
  let playerTwo;

  beforeEach(() => {
    // const seaBoard = Array(10) //????????????
    //   .fill()
    //   .map(() => Array(10).fill("--"));
    playerOne = new Player(1, "human");
    playerTwo = new Player(2, "machine");
  });

  it("should console.log the results for now", () =>
  console.log(playerOne));
});
