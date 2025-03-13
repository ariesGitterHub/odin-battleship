import { Player } from "../js/classPlayer.js";

describe("Player", () => {
  let playerOne;
  let playerTwo;

  beforeEach(() => {
    playerOne = new Player(1, "human");
    playerTwo = new Player(2, "machine");
  });

  it("should console.log the results for now", () => console.log(playerOne));
});
