import "./styles/styles.css";
// import { createImg } from "./js/basicFunctions.js";
import a from "./assets/ship5A.svg";
import b from "./assets/ship4B.svg";
import d from "./assets/ship3D.svg";
import s from "./assets/ship3S.svg";
import c from "./assets/ship2C.svg";
// import p from "../assets/ship1P.svg";
import bA from "./assets/ship5A-b.svg";
import bB from "./assets/ship4B-b.svg";
import bD from "./assets/ship3D-b.svg";
import bS from "./assets/ship3S-b.svg";
import bC from "./assets/ship2C-b.svg";
// import bP from "../assets/ship1P-b.svg";
import rA from "./assets/ship5A-r.svg";
import rB from "./assets/ship4B-r.svg";
import rD from "./assets/ship3D-r.svg";
import rS from "./assets/ship3S-r.svg";
import rC from "./assets/ship2C-r.svg";
// import rP from "../assets/ship1P-r.svg";
import { createHeader } from "./js/uiHeader.js";
import {
  addMessage,
  clearMessage,
  createMessageElements,
} from "./js/uiMessages.js";
// import { imgMaker } from "./js/uiImages.js";
import {
  // addEmojiEffect1,
  // addEmojiEffect2,
  // addShipColor1,
  // addShipColor2,
  createGameContentDivs,
  createGameContent,
  // randomRotate,
} from "./js/uiBoardContent.js";
import { createStartContentElements } from "./js/uiStartContent.js";
import {
  addEmojiEffect1,
  addEmojiEffect2,
  highlightEmptyCellOnHover1,
  highlightEmptyCellOnHover2,
} from "./js/uiHitMissGrid.js";
import {
  // addShipColor1,
  // addShipColor2,
  // colorTargetCells1,
  placeShipSvgs1,
  placeShipSvgs2,
} from "./js/uiShipGrid.js";

createHeader();

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
testGame1.placeShip(testGame1.ships[5], "v", 9, 0);

const playerTwo = new Player(2, "machine", testGame2);
testGame2.placeShip(testGame2.ships[0], "h", 0, 2);
testGame2.placeShip(testGame2.ships[1], "h", 2, 1);
testGame2.placeShip(testGame2.ships[2], "v", 4, 2);
testGame2.placeShip(testGame2.ships[3], "h", 7, 2);
testGame2.placeShip(testGame2.ships[4], "v", 6, 8);
testGame2.placeShip(testGame2.ships[5], "h", 0, 9);

// Turn 1, Player 1 starts with attack on Player 2, so start with testGame2, then alternate
// testGame2.receiveAttack(0, 0); // Miss
// testGame1.receiveAttack(0, 0); // Miss

// Turn 2, hit 1st cell of each aircraft carrier ("a5")
// testGame2.receiveAttack(0, 2);
// testGame1.receiveAttack(1, 7);

// Turn 3, hit each side's patrol boat ("p1")
// testGame2.receiveAttack(0, 9);
// testGame1.receiveAttack(9, 0);

// Turn 4, hit each side's corvettes ("c2")
// testGame2.receiveAttack(6, 8);
// testGame1.receiveAttack(8, 7);

// Turn 5, hit each side's corvettes ("c2")
// testGame2.receiveAttack(7, 8);
// testGame1.receiveAttack(8, 8);

// Turn 6, hit each side's battleship ("b4")
// testGame2.receiveAttack(2, 1);
// testGame1.receiveAttack(2, 0);

// Turn 7, hit each side's battleship ("b4")
// testGame2.receiveAttack(2, 2);
// testGame1.receiveAttack(3, 0);

// Turn 8, hit each side's battleship ("b4")
// testGame2.receiveAttack(2, 3);
// testGame1.receiveAttack(4, 0);

// Turn 9, hit each side's battleship ("b4")
// testGame2.receiveAttack(2, 4);
// testGame1.receiveAttack(5, 0);

// Turn 10, hit each side's destroyer in the middle spot ("d3")
// testGame2.receiveAttack(5, 2);
// testGame1.receiveAttack(3, 3);

// Turn 11, hit each side's aircraft carrier in the middle spot ("a5")
// testGame2.receiveAttack(0, 4);
// testGame1.receiveAttack(3, 7);

// Turn 12, misses at same location ("")
// testGame2.receiveAttack(5, 4);
// testGame1.receiveAttack(5, 4);

// make player 1 lose prematurely...
// testGame1.receiveAttack(2, 7);
// testGame1.receiveAttack(3, 7);
// testGame1.receiveAttack(4, 7);
// testGame1.receiveAttack(5, 7);

// testGame1.receiveAttack(3, 2);
// testGame1.receiveAttack(3, 4);

// testGame1.receiveAttack(5, 5);
// testGame1.receiveAttack(6, 5);
// testGame1.receiveAttack(7, 5);


// console.log(`P1: a5 sunk status = ${testGame1.ships[0].isSunk()}`);
// console.log(`P1: b4 sunk status = ${testGame1.ships[1].isSunk()}`);
// console.log(`P1: d3 sunk status = ${testGame1.ships[2].isSunk()}`);
// console.log(`P1: s3 sunk status = ${testGame1.ships[3].isSunk()}`);
// console.log(`P1: c2 sunk status = ${testGame1.ships[4].isSunk()}`);
// console.log(`P1: p1 sunk status = ${testGame1.ships[5].isSunk()}`);

// console.log(`P2: a5 sunk status = ${testGame2.ships[0].isSunk()}`);
// console.log(`P2: b4 sunk status = ${testGame2.ships[1].isSunk()}`);
// console.log(`P2: d3 sunk status = ${testGame2.ships[2].isSunk()}`);
// console.log(`P2: s3 sunk status = ${testGame2.ships[3].isSunk()}`);
// console.log(`P2: c2 sunk status = ${testGame2.ships[4].isSunk()}`);
// console.log(`P2: p1 sunk status = ${testGame2.ships[5].isSunk()}`);


createGameContentDivs();
createGameContent(playerOne.playerBoard.board, playerTwo.playerBoard.board);



placeShipSvgs1("a", "v", 1, 7);
placeShipSvgs1("b", "v", 2, 0);
placeShipSvgs1("d", "h", 3, 2);
placeShipSvgs1("s", "v", 5, 5);
placeShipSvgs1("c", "h", 8, 7);

placeShipSvgs2("a", "h", 0, 2);
placeShipSvgs2("b", "h", 2, 1);
placeShipSvgs2("d", "v", 4, 2);
placeShipSvgs2("s", "h", 7, 2);
placeShipSvgs2("c", "v", 6, 8);

function colorSunkShips1(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellShipTarget = document.getElementById(`T-SG1: (${i},${j})`);
      const p1ShipBoard = document.querySelector("#p1-ship-board");
      const p2TargetShipBoard = document.querySelector("#p2-target-ship-board");
      if (testGame1.ships[0].isSunk() && board[i][j] === "A!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame1.ships[1].isSunk() && board[i][j] === "B!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame1.ships[2].isSunk() && board[i][j] === "D!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame1.ships[3].isSunk() && board[i][j] === "S!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame1.ships[4].isSunk() && board[i][j] === "C!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }

      if (
        testGame1.ships[0].isSunk() &&
        testGame1.ships[1].isSunk() &&
        testGame1.ships[2].isSunk() &&
        testGame1.ships[3].isSunk() &&
        testGame1.ships[4].isSunk()
      ) {
        p1ShipBoard.style.backgroundColor = "var(--loser)";
        p2TargetShipBoard.style.backgroundColor = "var(--loser)";
      }
    }
  }
}

function colorSunkShips2(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellShipTarget = document.getElementById(`T-SG2: (${i},${j})`);
      const p2ShipBoard = document.querySelector("#p2-ship-board");
      const p1TargetShipBoard = document.querySelector("#p1-target-ship-board");
      if (testGame2.ships[0].isSunk() && board[i][j] === "A!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame2.ships[1].isSunk() && board[i][j] === "B!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame2.ships[2].isSunk() && board[i][j] === "D!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame2.ships[3].isSunk() && board[i][j] === "S!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame2.ships[4].isSunk() && board[i][j] === "C!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }

      if (
        testGame2.ships[0].isSunk() &&
        testGame2.ships[1].isSunk() &&
        testGame2.ships[2].isSunk() &&
        testGame2.ships[3].isSunk() &&
        testGame2.ships[4].isSunk()
      ) {
        p2ShipBoard.style.backgroundColor = "var(--loser)";
        p1TargetShipBoard.style.backgroundColor = "var(--loser)";
      }
    }
  }
}

// function gameEngine() {

// const btnPvsC = document.querySelector("#btn-pvsc");
// const btnPvsP = document.querySelector("#btn-pvsp");
// const gifContainer = document.querySelector("#gif-container");
// const p1FullBoard = document.querySelector("#p1-full-board");
// btnPvsC.addEventListener("click", () => {
//   clearMessage();
//   addMessage("Player One drag and position your fleet. Use the rotate button to change axis, or use the random button to auto-position ships.")
//   btnPvsC.style.display = "none";
//   btnPvsP.style.display = "none";
//   gifContainer.style.display = "none";
//   p1FullBoard.style.display = "flex";
// })

// }

// gameEngine()

// function rotatePlaceShips() {
//   const p0BtnRotate = document.querySelector("#p0-btn-rotate");
//   const p0X5Grid = document.querySelector("#p0-x5-grid");
//   let currentRotation = 0
//   let rotationValue = 0
//   p0BtnRotate.addEventListener("click", () => {
//     currentRotation += 90
//     p0X5Grid.style.transform = `rotate(${currentRotation}deg`;
//   })
// }

function rotatePlaceShips() {
  const p0BtnRotate = document.querySelector("#p0-btn-rotate");
  const p0X5Grid = document.querySelector("#p0-x5-grid");
const placeShipClass = document.querySelectorAll(".place-ship");
  let currentRotation = 0; // 0 = horizontal axis
  let rotationCount = 0;
  p0BtnRotate.addEventListener("click", () => {
    rotationCount += 1;
    if (rotationCount % 2 !== 0) {
      currentRotation = 90;
      placeShipClass.forEach(axis => {
        axis.dataset.axis = "v";
      })
    } else {
      currentRotation = 0;
      placeShipClass.forEach((axis) => {
        axis.dataset.axis = "h";
      });
    }
    console.log(rotationCount);

    p0X5Grid.style.transform = `rotate(${currentRotation}deg`;
  });
}
rotatePlaceShips();

function highlightPlaceShips() {
  const shipA = document.querySelector("#place-a");
  const shipB = document.querySelector("#place-b");
  const shipD = document.querySelector("#place-d");
  const shipS = document.querySelector("#place-s");
  const shipC = document.querySelector("#place-c");

  const placeShipClass = document.querySelectorAll(".place-ship");

  placeShipClass.forEach((ship) =>
    ship.addEventListener("click", () => {
      // Change if statements to a switch...later
      if (ship.src === bA && ship.dataset.selected === "") {
        // ship.style.scale = "2"
        ship.src = rA;
        ship.dataset.selected = "yes";
        shipB.src = bB;
        shipB.dataset.selected = "";
        shipD.src = bD;
        shipD.dataset.selected = "";
        shipS.src = bS;
        shipS.dataset.selected = "";
        shipC.src = bC;
        shipC.dataset.selected = "";

      } else if (ship.src === rA && ship.dataset.selected === "yes") {
        ship.src = bA;
        ship.dataset.selected = "";
        shipB.src = bB;
        shipD.src = bD;
        shipS.src = bS;
        shipC.src = bC;
      }

      if (ship.src === bB && ship.dataset.selected === "") {
        ship.src = rB;
        ship.dataset.selected = "yes";
        shipA.src = bA;
        shipA.dataset.selected = "";
        shipD.src = bD;
        shipD.dataset.selected = "";
        shipS.src = bS;
        shipS.dataset.selected = "";
        shipC.src = bC;
        shipC.dataset.selected = "";
      } else if (ship.src === rB && ship.dataset.selected === "yes") {
        ship.src = bB;
        ship.dataset.selected = "";
        shipA.src = bA;
        shipD.src = bD;
        shipS.src = bS;
        shipC.src = bC;
      }

      if (ship.src === bD && ship.dataset.selected === "") {
        ship.src = rD;
        ship.dataset.selected = "yes";
        shipA.src = bA;
        shipA.dataset.selected = "";
        shipB.src = bB;
        shipB.dataset.selected = "";
        shipS.src = bS;
        shipS.dataset.selected = "";
        shipC.src = bC;
        shipC.dataset.selected = "";
      } else if (ship.src === rD && ship.dataset.selected === "yes") {
        ship.src = bD;
        ship.dataset.selected = "";
        shipA.src = bA;
        shipB.src = bB;
        shipS.src = bS;
        shipC.src = bC;
      }

      if (ship.src === bS && ship.dataset.selected === "") {
        ship.src = rS;
        ship.dataset.selected = "yes";
        shipA.src = bA;
        shipA.dataset.selected = "";
        shipB.src = bB;
        shipB.dataset.selected = "";
        shipD.src = bD;
        shipD.dataset.selected = "";
        shipC.src = bC;
        shipC.dataset.selected = "";
      } else if (ship.src === rS && ship.dataset.selected === "yes") {
        ship.src = bS;
                ship.dataset.selected = "";
        shipA.src = bA;
        shipB.src = bB;
        shipD.src = bD;
        shipC.src = bC;
      }

      if (ship.src === bC && ship.dataset.selected === "") {
        ship.src = rC;
        ship.dataset.selected = "yes";
        shipA.src = bA;
        shipA.dataset.selected = "";
        shipB.src = bB;
        shipB.dataset.selected = "";
        shipD.src = bD;
        shipD.dataset.selected = "";
        shipS.src = bS;
        shipS.dataset.selected = "";
      } else if (ship.src === rC && ship.dataset.selected === "yes") {
        ship.src = bC;
        ship.dataset.selected = "";
        shipA.src = bA;
        shipB.src = bB;
        shipD.src = bD;
        shipS.src = bS;
      }
    })
  );
}
highlightPlaceShips();




// testGame1.placeShip(testGame1.ships[0], "v", 1, 7);
// placeShipSvgs1("a", "v", 1, 7);


// testGame1.receiveAttack(1, 7);
// testGame2.receiveAttack(0, 2);






// function targetCoordinates1() {
//   const hitMissCells1 = document.querySelectorAll(".hit-miss-cells1");
//   // const hitMissCells2 = document.querySelectorAll(".hit-miss-cells2");

//   hitMissCells1.forEach(cell => cell.addEventListener("click", () => {
//     let targetId = cell.id
//     let regex = /\((\d+),(\d+)\)/;
//     let matches = targetId.match(regex);
//     let row;
//     let col;
//     // let target;
//     if (matches) {
//       row = matches[1]; // 1
//       col = matches[2]; // 7
//       // console.log(row, col);
//     }
//     console.log(`${row}, ${col}`);
    
//     return (`${row}, ${col}`)
    
//   }))
// }
// // playGame1(playerOne.playerBoard.board);
// //  targetCoordinates1();

// testGame1.receiveAttack(1, 7);
// testGame1.receiveAttack(targetCoordinates1());

function targetCoordinates1(board) {


  const hitMissCells1 = document.querySelectorAll(".hit-miss-cells1");

  hitMissCells1.forEach((cell) => {
    cell.addEventListener("click", () => {
      let targetId = cell.id;
      let regex = /\((\d+),(\d+)\)/;
      let matches = targetId.match(regex);
      let row, col;

      if (matches) {
        row = +matches[1]; // Converts the string to a number
        col = +matches[2]; // Converts the string to a number
        console.log(`Coordinates clicked: ${row}, ${col}`);
        console.log(typeof row === "number");
        console.log(testGame1.receiveAttack(row, col));
        addEmojiEffect1(playerOne.playerBoard.board);
        colorSunkShips1(playerOne.playerBoard.board);
      }
        // You can now pass the coordinates to another function or update your state


      // testGame1.receiveAttack(row, col);
    });
  });
}
    testGame1.receiveAttack(1, 7);
// Call the function to set up the event listeners
// targetCoordinates1();

addEmojiEffect1(playerOne.playerBoard.board);
addEmojiEffect2(playerTwo.playerBoard.board);
colorSunkShips1(playerOne.playerBoard.board);
colorSunkShips2(playerTwo.playerBoard.board);
highlightEmptyCellOnHover1(playerOne.playerBoard.board);
highlightEmptyCellOnHover2(playerTwo.playerBoard.board);
createMessageElements();
addMessage("Below, select the number of players to begin your game.");
// console.log(seaBoard1);
// console.log(seaBoard2);
targetCoordinates1();
console.table(playerOne.playerBoard.board);
console.table(playerTwo.playerBoard.board);