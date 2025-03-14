// Old Test Code

// At this point it is appropriate to begin crafting your User Interface.

// Set up a new game by creating Players. For now just populate each player’s Gameboard with predetermined coordinates. You are going to implement a system for allowing players to place their ships later.

// We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class/factory.

// You’ll need methods to render each player’s Gameboard, so put them in an appropriate module.

// Your event listeners should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function, step back and figure out which class or module that function should belong to.

// For attacks, let the user click on a coordinate in the enemy Gameboard. Send the user input to methods on your objects, and re-render the boards to display the new information.

// Players should take turns playing the game by attacking the enemy Gameboard. If you feel the need to keep track of the current player’s turn, it’s appropriate to manage that in this module, instead of another mentioned object.

// The game is played against the computer, so make the ‘computer’ players capable of making random plays. The computer does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).

// Create conditions so that the game ends once one player’s ships have all been sunk. This function is also appropriate for this module.

// Finish it up by implementing a system that allows players to place their ships. For example, you can let them type coordinates for each ship or have a button to cycle through random placements.

// REMINDER: Initially, I had planned on using six ships, but the smallest, the patrol boat, was only 1 square by 1 square and proved to slow the game down too much hunting for it on the gameboard.

import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";

let seaBoard1 = Array(10)
  .fill()
  .map(() => Array(10).fill("--"));
let seaBoard2 = Array(10)
  .fill()
  .map(() => Array(10).fill("--"));

const testGame1 = new Gameboard(seaBoard1);
const testGame2 = new Gameboard(seaBoard2);

// const playerOne = new Player(1, "human", new Gameboard(seaBoard))
const playerOne = new Player(1, "human", testGame1);
testGame1.placeShip(testGame1.ships[0], "v", 1, 7);
testGame1.placeShip(testGame1.ships[1], "v", 2, 0);
testGame1.placeShip(testGame1.ships[2], "h", 3, 2);
testGame1.placeShip(testGame1.ships[3], "v", 5, 5);
testGame1.placeShip(testGame1.ships[4], "h", 8, 7);
testGame1.placeShip(testGame1.ships[5], "v", 9, 0);

// const playerTwo = new Player(2, "machine", new Gameboard(seaBoard));
const playerTwo = new Player(2, "machine", testGame2);
testGame2.placeShip(testGame2.ships[0], "h", 0, 2);
testGame2.placeShip(testGame2.ships[1], "h", 2, 1);
testGame2.placeShip(testGame2.ships[2], "v", 4, 2);
testGame2.placeShip(testGame2.ships[3], "h", 7, 2);
testGame2.placeShip(testGame2.ships[4], "v", 6, 8);
testGame2.placeShip(testGame2.ships[5], "h", 0, 9);

// Turn 1, Player 1 starts with attack on Player 2, so start with testGame2, then alternate
testGame2.receiveAttack(0, 0); // Miss
testGame1.receiveAttack(0, 0); // Miss

// Turn 2, hit 1st cell of each aircraft carrier ("a5")
testGame2.receiveAttack(0, 2);
testGame1.receiveAttack(1, 7);

// Turn 3, hit each side's patrol boat ("p1")
testGame2.receiveAttack(0, 9);
testGame1.receiveAttack(9, 0);

console.table(playerOne.playerBoard.board);
console.log(`P1: a5 sunk status = ${testGame2.ships[0].isSunk()}`);
console.log(`P1: b4 sunk status = ${testGame2.ships[1].isSunk()}`);
console.log(`P1: d3 sunk status = ${testGame2.ships[2].isSunk()}`);
console.log(`P1: s3 sunk status = ${testGame2.ships[3].isSunk()}`);
console.log(`P1: c2 sunk status = ${testGame2.ships[4].isSunk()}`);
console.log(`P1: p1 sunk status = ${testGame2.ships[5].isSunk()}`);
console.table(playerTwo.playerBoard.board);
console.log(`P2: a5 sunk status = ${testGame2.ships[0].isSunk()}`);
console.log(`P2: b4 sunk status = ${testGame2.ships[1].isSunk()}`);
console.log(`P2: d3 sunk status = ${testGame2.ships[2].isSunk()}`);
console.log(`P2: s3 sunk status = ${testGame2.ships[3].isSunk()}`);
console.log(`P2: c2 sunk status = ${testGame2.ships[4].isSunk()}`);


// Deleted from classShip.js, no longer needed
  // No longer used
  // clearHitsAndSunkStatus() {
  //   if (this.numHits > 0) {
  //     this.numHits = 0;
  //   }
  //   if (this.sunkStatus) {
  //     this.sunkStatus = false;
  //   }
  // }