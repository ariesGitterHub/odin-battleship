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
import hA from "./assets/ship5A-h.svg";
import hB from "./assets/ship4B-h.svg";
import hD from "./assets/ship3D-h.svg";
import hS from "./assets/ship3S-h.svg";
import hC from "./assets/ship2C-h.svg";
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
  addEmojiEffect,
  // addEmojiEffect1,
  // addEmojiEffect2,
  highlightEmptyCellOnlyOnHover1,
  highlightEmptyCellOnlyOnHover2,
} from "./js/uiHitMissGrid.js";
import {
  // colorSunkShips,
  // colorSunkShips1,
  // colorSunkShips2,
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

// function rotatePlaceShips1() {
//   const p0BtnRotate = document.querySelector("#p0-btn-rotate");
//   const p0X5Grid = document.querySelector("#p0-x5-grid");
//   let currentRotation = 0
//   let rotationValue = 0
//   p0BtnRotate.addEventListener("click", () => {
//     currentRotation += 90
//     p0X5Grid.style.transform = `rotate(${currentRotation}deg`;
//   })
// }

function rotatePlaceShips1() {
  const p1BtnRotate = document.querySelector("#p1-btn-rotate");
  const p1X5Grid = document.querySelector("#p1-x5-grid");
  const placeShipClass = document.querySelectorAll(".place-ship");
  let currentRotation = 0; // 0 = horizontal axis
  let rotationCount = 0;
  p1BtnRotate.addEventListener("click", () => {
    rotationCount += 1;
    if (rotationCount % 2 !== 0) {
      currentRotation = 90;
      placeShipClass.forEach((axis) => {
        axis.dataset.axis = "v";
      });
    } else {
      currentRotation = 0;
      placeShipClass.forEach((axis) => {
        axis.dataset.axis = "h";
      });
    }
    console.log(rotationCount);

    p1X5Grid.style.transform = `rotate(${currentRotation}deg`;
  });
}
rotatePlaceShips1();

function rotatePlaceShips2() {
  const p2BtnRotate = document.querySelector("#p2-btn-rotate");
  const p2X5Grid = document.querySelector("#p2-x5-grid");
  const placeShipClass = document.querySelectorAll(".place-ship");
  let currentRotation = 0; // 0 = horizontal axis
  let rotationCount = 0;
  p2BtnRotate.addEventListener("click", () => {
    rotationCount += 1;
    if (rotationCount % 2 !== 0) {
      currentRotation = 90;
      placeShipClass.forEach((axis) => {
        axis.dataset.axis = "v";
      });
    } else {
      currentRotation = 0;
      placeShipClass.forEach((axis) => {
        axis.dataset.axis = "h";
      });
    }
    console.log(rotationCount);

    p2X5Grid.style.transform = `rotate(${currentRotation}deg`;
  });
}
rotatePlaceShips2();

function highlightPlaceShips1() {
  const shipA1 = document.querySelector("#place-a1");
  const shipB1 = document.querySelector("#place-b1");
  const shipD1 = document.querySelector("#place-d1");
  const shipS1 = document.querySelector("#place-s1");
  const shipC1 = document.querySelector("#place-c1");

  const allP1PlaceShips = document.querySelectorAll(".all-p1-place-ships");

  allP1PlaceShips.forEach((ship) =>
    ship.addEventListener("click", () => {
      // Change if statements to a switch...later
      if (ship.src === bA && ship.dataset.selected === "") {
        // ship.style.scale = "2"
        ship.src = hA;
        ship.dataset.selected = "yes";
        shipB1.src = bB;
        shipB1.dataset.selected = "";
        shipD1.src = bD;
        shipD1.dataset.selected = "";
        shipS1.src = bS;
        shipS1.dataset.selected = "";
        shipC1.src = bC;
        shipC1.dataset.selected = "";
      } else if (ship.src === hA && ship.dataset.selected === "yes") {
        ship.src = bA;
        ship.dataset.selected = "";
        shipB1.src = bB;
        shipD1.src = bD;
        shipS1.src = bS;
        shipC1.src = bC;
      }

      if (ship.src === bB && ship.dataset.selected === "") {
        ship.src = hB;
        ship.dataset.selected = "yes";
        shipA1.src = bA;
        shipA1.dataset.selected = "";
        shipD1.src = bD;
        shipD1.dataset.selected = "";
        shipS1.src = bS;
        shipS1.dataset.selected = "";
        shipC1.src = bC;
        shipC1.dataset.selected = "";
      } else if (ship.src === hB && ship.dataset.selected === "yes") {
        ship.src = bB;
        ship.dataset.selected = "";
        shipA1.src = bA;
        shipD1.src = bD;
        shipS1.src = bS;
        shipC1.src = bC;
      }

      if (ship.src === bD && ship.dataset.selected === "") {
        ship.src = hD;
        ship.dataset.selected = "yes";
        shipA1.src = bA;
        shipA1.dataset.selected = "";
        shipB1.src = bB;
        shipB1.dataset.selected = "";
        shipS1.src = bS;
        shipS1.dataset.selected = "";
        shipC1.src = bC;
        shipC1.dataset.selected = "";
      } else if (ship.src === hD && ship.dataset.selected === "yes") {
        ship.src = bD;
        ship.dataset.selected = "";
        shipA1.src = bA;
        shipB1.src = bB;
        shipS1.src = bS;
        shipC1.src = bC;
      }

      if (ship.src === bS && ship.dataset.selected === "") {
        ship.src = hS;
        ship.dataset.selected = "yes";
        shipA1.src = bA;
        shipA1.dataset.selected = "";
        shipB1.src = bB;
        shipB1.dataset.selected = "";
        shipD1.src = bD;
        shipD1.dataset.selected = "";
        shipC1.src = bC;
        shipC1.dataset.selected = "";
      } else if (ship.src === hS && ship.dataset.selected === "yes") {
        ship.src = bS;
        ship.dataset.selected = "";
        shipA1.src = bA;
        shipB1.src = bB;
        shipD1.src = bD;
        shipC1.src = bC;
      }

      if (ship.src === bC && ship.dataset.selected === "") {
        ship.src = hC;
        ship.dataset.selected = "yes";
        shipA1.src = bA;
        shipA1.dataset.selected = "";
        shipB1.src = bB;
        shipB1.dataset.selected = "";
        shipD1.src = bD;
        shipD1.dataset.selected = "";
        shipS1.src = bS;
        shipS1.dataset.selected = "";
      } else if (ship.src === hC && ship.dataset.selected === "yes") {
        ship.src = bC;
        ship.dataset.selected = "";
        shipA1.src = bA;
        shipB1.src = bB;
        shipD1.src = bD;
        shipS1.src = bS;
      }
    })
  );
}
highlightPlaceShips1();

function highlightPlaceShips2() {
  const shipA2 = document.querySelector("#place-a2");
  const shipB2 = document.querySelector("#place-b2");
  const shipD2 = document.querySelector("#place-d2");
  const shipS2 = document.querySelector("#place-s2");
  const shipC2 = document.querySelector("#place-c2");

  const allP2PlaceShips = document.querySelectorAll(".all-p2-place-ships");

  allP2PlaceShips.forEach((ship) =>
    ship.addEventListener("click", () => {
      // Change if statements to a switch...later
      if (ship.src === bA && ship.dataset.selected === "") {
        // ship.style.scale = "2"
        ship.src = hA;
        ship.dataset.selected = "yes";
        shipB2.src = bB;
        shipB2.dataset.selected = "";
        shipD2.src = bD;
        shipD2.dataset.selected = "";
        shipS2.src = bS;
        shipS2.dataset.selected = "";
        shipC2.src = bC;
        shipC2.dataset.selected = "";
      } else if (ship.src === hA && ship.dataset.selected === "yes") {
        ship.src = bA;
        ship.dataset.selected = "";
        shipB2.src = bB;
        shipD2.src = bD;
        shipS2.src = bS;
        shipC2.src = bC;
      }

      if (ship.src === bB && ship.dataset.selected === "") {
        ship.src = hB;
        ship.dataset.selected = "yes";
        shipA2.src = bA;
        shipA2.dataset.selected = "";
        shipD2.src = bD;
        shipD2.dataset.selected = "";
        shipS2.src = bS;
        shipS2.dataset.selected = "";
        shipC2.src = bC;
        shipC2.dataset.selected = "";
      } else if (ship.src === hB && ship.dataset.selected === "yes") {
        ship.src = bB;
        ship.dataset.selected = "";
        shipA2.src = bA;
        shipD2.src = bD;
        shipS2.src = bS;
        shipC2.src = bC;
      }

      if (ship.src === bD && ship.dataset.selected === "") {
        ship.src = hD;
        ship.dataset.selected = "yes";
        shipA2.src = bA;
        shipA2.dataset.selected = "";
        shipB2.src = bB;
        shipB2.dataset.selected = "";
        shipS2.src = bS;
        shipS2.dataset.selected = "";
        shipC2.src = bC;
        shipC2.dataset.selected = "";
      } else if (ship.src === hD && ship.dataset.selected === "yes") {
        ship.src = bD;
        ship.dataset.selected = "";
        shipA2.src = bA;
        shipB2.src = bB;
        shipS2.src = bS;
        shipC2.src = bC;
      }

      if (ship.src === bS && ship.dataset.selected === "") {
        ship.src = hS;
        ship.dataset.selected = "yes";
        shipA2.src = bA;
        shipA2.dataset.selected = "";
        shipB2.src = bB;
        shipB2.dataset.selected = "";
        shipD2.src = bD;
        shipD2.dataset.selected = "";
        shipC2.src = bC;
        shipC2.dataset.selected = "";
      } else if (ship.src === hS && ship.dataset.selected === "yes") {
        ship.src = bS;
        ship.dataset.selected = "";
        shipA2.src = bA;
        shipB2.src = bB;
        shipD2.src = bD;
        shipC2.src = bC;
      }

      if (ship.src === bC && ship.dataset.selected === "") {
        ship.src = hC;
        ship.dataset.selected = "yes";
        shipA2.src = bA;
        shipA2.dataset.selected = "";
        shipB2.src = bB;
        shipB2.dataset.selected = "";
        shipD2.src = bD;
        shipD2.dataset.selected = "";
        shipS2.src = bS;
        shipS2.dataset.selected = "";
      } else if (ship.src === hC && ship.dataset.selected === "yes") {
        ship.src = bC;
        ship.dataset.selected = "";
        shipA2.src = bA;
        shipB2.src = bB;
        shipD2.src = bD;
        shipS2.src = bS;
      }
    })
  );
}
highlightPlaceShips2();

function colorSunkShips(board) {
  const shipBoardId = board === testGame1 ? "#p1-ship-board" : "#p2-ship-board";
  const targetShipBoardId =
    board === testGame1 ? "#p2-target-ship-board" : "#p1-target-ship-board";

  for (let i = 0; i < board.board.length; i++) {
    for (let j = 0; j < board.board[i].length; j++) {
      let cellShipTarget = document.getElementById(
        `T-SG${board === testGame1 ? 1 : 2}: (${i},${j})`
      );

      ["A!", "B!", "D!", "S!", "C!"].forEach((shipCode, index) => {
        if (board.ships[index].isSunk() && board.board[i][j] === shipCode) {
          cellShipTarget.style.backgroundColor = "var(--text)";
        }
      });

      if (board.ships.every((ship) => ship.isSunk())) {
        document.querySelector(shipBoardId).style.backgroundColor =
          "var(--loser)";
        document.querySelector(targetShipBoardId).style.backgroundColor =
          "var(--loser)";
      }
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {
  function attackTargetCoordinates1(board) {
    const hitMissTargetCells1 = document.querySelectorAll(
      ".hit-miss-target-cells1"
    );
    highlightEmptyCellOnlyOnHover1(playerOne.playerBoard.board);
    hitMissTargetCells1.forEach((cell) => {
      cell.addEventListener("click", () => {
        let targetId = cell.id;
        let regex = /\((\d+),(\d+)\)/;
        let matches = targetId.match(regex);
        let row, col;

        if (matches) {
          row = +matches[1]; // Reminder, this converts the string to a number
          col = +matches[2]; // Same as above
          console.log(`Coordinates clicked: ${row}, ${col}`);
          console.log(typeof row === "number");
          console.log(testGame1.receiveAttack(row, col));
          // addEmojiEffect1(playerOne.playerBoard.board);
          // addEmojiEffect1(playerOne.playerBoard.board);
          addEmojiEffect(playerOne.playerBoard.board, 1);
          // colorSunkShips1(testGame1);
          colorSunkShips(testGame1, 1);
          highlightEmptyCellOnlyOnHover1(playerOne.playerBoard.board);
        }
      });
    });
  }

  function attackTargetCoordinates2(board) {
    const hitMissTargetCells2 = document.querySelectorAll(
      ".hit-miss-target-cells2"
    );
    highlightEmptyCellOnlyOnHover2(playerTwo.playerBoard.board);
    hitMissTargetCells2.forEach((cell) => {
      cell.addEventListener("click", () => {
        let targetId = cell.id;
        let regex = /\((\d+),(\d+)\)/;
        let matches = targetId.match(regex);
        let row, col;

        if (matches) {
          row = +matches[1]; // Reminder, this converts the string to a number
          col = +matches[2]; // Same as above
          console.log(`Coordinates clicked: ${row}, ${col}`);
          console.log(typeof row === "number");
          console.log(testGame2.receiveAttack(row, col));
          // addEmojiEffect2(playerTwo.playerBoard.board);
          addEmojiEffect(playerTwo.playerBoard.board, 2);
          // colorSunkShips2(testGame2);
          colorSunkShips(testGame2, 2);
          highlightEmptyCellOnlyOnHover2(playerTwo.playerBoard.board);
        }
      });
    });
  }
  // addEmojiEffect1(playerOne.playerBoard.board);
  // addEmojiEffect2(playerTwo.playerBoard.board);
  // colorSunkShips1(playerOne.playerBoard.board);
  // colorSunkShips2(playerTwo.playerBoard.board);
  // highlightEmptyCellOnlyOnHover1(playerOne.playerBoard.board);
  // highlightEmptyCellOnlyOnHover2(playerTwo.playerBoard.board);
  attackTargetCoordinates1();
  attackTargetCoordinates2();
});



console.table(playerOne.playerBoard.board);
console.table(playerTwo.playerBoard.board);
