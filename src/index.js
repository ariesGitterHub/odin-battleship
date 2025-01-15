import "./styles/styles.css";
// console.log("Odin Battleship is running!");
import { createImg } from "./js/basicFunctions.js";
import ship5A from "./assets/ship5A.svg";
import ship4B from "./assets/ship4B.svg";
import { createHeader } from "./js/uiHeader.js";
// import { imgMaker } from "./js/uiImages.js";
import {
  // addEmojiEffect1,
  // addEmojiEffect2,
  // addShipColor1,
  // addShipColor2,
  createContainers,
  createGameContent,
  // randomRotate,
} from "./js/uiBoardContent.js";
import { addEmojiEffect1, addEmojiEffect2 } from "./js/uiHitMissGrid.js";
import { addShipColor1, addShipColor2 } from "./js/uiShipGrid.js";

// import { playerX } from "./js/uiPlayerContent.js";
// import a5h from "../assets/a5h.png";
createHeader();

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

import { Gameboard } from "./js/gameboard.js";
import { Player } from "./js/player.js";

const numRows = 10;
const numCols = 10;

let seaBoard1 = Array(numRows)
  .fill()
  .map(() => Array(numCols).fill("--"));
let seaBoard2 = Array(numRows)
  .fill()
  .map(() => Array(numCols).fill("--"));

const testGame1 = new Gameboard(seaBoard1);
const testGame2 = new Gameboard(seaBoard2);

const playerOne = new Player(1, "human", testGame1);
testGame1.placeShip(testGame1.ships[0], "v", 1, 7);
testGame1.placeShip(testGame1.ships[1], "v", 2, 0);
testGame1.placeShip(testGame1.ships[2], "h", 3, 2);
testGame1.placeShip(testGame1.ships[3], "v", 5, 5);
testGame1.placeShip(testGame1.ships[4], "h", 8, 7);
// testGame1.placeShip(testGame1.ships[5], "v", 9, 0);

const playerTwo = new Player(2, "machine", testGame2);
testGame2.placeShip(testGame2.ships[0], "h", 0, 2);
testGame2.placeShip(testGame2.ships[1], "h", 2, 1);
testGame2.placeShip(testGame2.ships[2], "v", 4, 2);
testGame2.placeShip(testGame2.ships[3], "h", 7, 2);
testGame2.placeShip(testGame2.ships[4], "v", 6, 8);
// testGame2.placeShip(testGame2.ships[5], "h", 0, 9);

// Turn 1, Player 1 starts with attack on Player 2, so start with testGame2, then alternate
testGame2.receiveAttack(0, 0); // Miss
testGame1.receiveAttack(0, 0); // Miss

// Turn 2, hit 1st cell of each aircraft carrier ("a5")
testGame2.receiveAttack(0, 2);
testGame1.receiveAttack(1, 7);

// Turn 3, hit each side's patrol boat ("p1")
testGame2.receiveAttack(0, 9);
testGame1.receiveAttack(9, 0);

// Turn 4, hit each side's corvettes ("c2")
testGame2.receiveAttack(6, 8);
testGame1.receiveAttack(8, 7);

// Turn 5, hit each side's corvettes ("c2")
testGame2.receiveAttack(7, 8);
testGame1.receiveAttack(8, 8);

// Turn 6, hit each side's battleship ("b4")
testGame2.receiveAttack(2, 1);
testGame1.receiveAttack(2, 0);

// Turn 7, hit each side's battleship ("b4")
testGame2.receiveAttack(2, 2);
testGame1.receiveAttack(3, 0);

// Turn 8, hit each side's battleship ("b4")
testGame2.receiveAttack(2, 3);
testGame1.receiveAttack(4, 0);

// Turn 9, hit each side's battleship ("b4")
testGame2.receiveAttack(2, 4);
testGame1.receiveAttack(5, 0);

console.table(playerOne.playerBoard.board);
console.log(`P1: a5 sunk status = ${testGame1.ships[0].isSunk()}`);
console.log(`P1: b4 sunk status = ${testGame1.ships[1].isSunk()}`);
console.log(`P1: d3 sunk status = ${testGame1.ships[2].isSunk()}`);
console.log(`P1: s3 sunk status = ${testGame1.ships[3].isSunk()}`);
console.log(`P1: c2 sunk status = ${testGame1.ships[4].isSunk()}`);
// console.log(`P1: p1 sunk status = ${testGame1.ships[5].isSunk()}`);
console.table(playerTwo.playerBoard.board);
console.log(`P2: a5 sunk status = ${testGame2.ships[0].isSunk()}`);
console.log(`P2: b4 sunk status = ${testGame2.ships[1].isSunk()}`);
console.log(`P2: d3 sunk status = ${testGame2.ships[2].isSunk()}`);
console.log(`P2: s3 sunk status = ${testGame2.ships[3].isSunk()}`);
console.log(`P2: c2 sunk status = ${testGame2.ships[4].isSunk()}`);
// console.log(`P2: p1 sunk status = ${testGame2.ships[5].isSunk()}`);
console.log(seaBoard1);
console.log(seaBoard2);

// playerX();
// createGameContent(seaBoard1);
// createGameContent(seaBoard2);
// addShipColor("", seaBoard2);
createContainers();
createGameContent(playerOne.playerBoard.board, playerTwo.playerBoard.board);
// createGameContent(playerTwo.playerBoard.board);

addShipColor1(playerOne.playerBoard.board);
addShipColor2(playerTwo.playerBoard.board);
addEmojiEffect1(playerOne.playerBoard.board);
addEmojiEffect2(playerTwo.playerBoard.board);
// randomRotate();
// const test = document.querySelector("#test");

// const didi = document.createElement("p");
// didi.innerText = "TTTTTT";
// test.appendChild(didi);
// const img = document.createElement("img");
// img.src = a5h;
// test.appendChild(img);

// let cell = document.getElementById('2,7');
// cell.style.backgroundColor = "purple";

const testCellP1A5 = document.getElementById("P1: (1,7)");

const a51 = createImg({
  src: ship5A,
  alt: "aircraft carrier image",
  class: "ship",
});
a51.style.transform = "translateY(4rem) rotate(90deg)";

testCellP1A5.appendChild(a51);

const testCellP2A5 = document.getElementById("P2: (0,2)");

const a52 = createImg({
  src: ship5A,
  alt: "aircraft carrier image",
  class: "ship",
});
//a52.style.transform = "rotate(90deg)";
a52.style.transform = "translateX(4rem)";
testCellP2A5.appendChild(a52);

const testCellP1B4 = document.getElementById("P1: (2,0)");

const b41 = createImg({
  src: ship4B,
  alt: "destroyer image",
  class: "ship",
});
// b41.style.transform = "rotate(90deg)";
b41.style.transform = "translateY(3rem) rotate(90deg)";
// b41.style.transform = "rotate(90deg)";

testCellP1B4.appendChild(b41);

const testCellP2B4 = document.getElementById("P2: (2,1)");

const b42 = createImg({
  src: ship4B,
  alt: "destroyer image",
  class: "ship",
});
//a52.style.transform = "rotate(90deg)";
b42.style.transform = "translateX(3rem)";

testCellP2B4.appendChild(b42);