import "./styles/styles.css";

// import { createImg } from "./js/basicFunctions.js";
// import nA from "./assets/ship5A.svg";
// import nB from "./assets/ship4B.svg";
// import nD from "./assets/ship3D.svg";
// import nS from "./assets/ship3S.svg";
// import nC from "./assets/ship2C.svg";
// import nP from "../assets/ship1P.svg";
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
import { createHeader } from "./js/ui0-0Header.js";
import {
  addMessage,
  clearMessage,
  createMessageElements,
} from "./js/ui1-0Messages.js";
// import { imgMaker } from "./js/uiImages.js";
import {
  // addEmojiEffect1,
  // addEmojiEffect2,
  // addShipColor1,
  // addShipColor2,
  createGameContentDivs,
  createGameContent,
  // randomRotate,
} from "./js/ui3-0FullBoardElements.js";
import { createStartContentElements } from "./js/ui2-0StartContent.js";
import {
  addEmojiEffect,
  // addEmojiEffect1,
  // addEmojiEffect2,
  highlightEmptyCellOnlyOnHover,
  // highlightEmptyCellOnlyOnHover1,
  // highlightEmptyCellOnlyOnHover2,
} from "./js/ui3-2HitMissGrid.js";
import {
  colorSunkShips,
  // colorSunkShips1,
  // colorSunkShips2,
  // addShipColor1,
  // addShipColor2,
  // colorTargetCells1,
  orientShipSvgOnShipGrid,
  // orientShipSvgOnShipGrid1,
  // orientShipSvgOnShipGrid2,
} from "./js/ui3-1ShipGrid.js";

createHeader();

import { Gameboard } from "./js/classGameboard.js";
import { Player } from "./js/classPlayer.js";

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

const player1 = new Player(1, "human", testGame1);
testGame1.placeShip(testGame1.ships[0], "v", 1, 7);
testGame1.placeShip(testGame1.ships[1], "v", 2, 0);
testGame1.placeShip(testGame1.ships[2], "h", 3, 2);
testGame1.placeShip(testGame1.ships[3], "v", 5, 5);
testGame1.placeShip(testGame1.ships[4], "h", 8, 7);
testGame1.placeShip(testGame1.ships[5], "v", 9, 0);

const player2 = new Player(2, "machine", testGame2);
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
createGameContent(player1.playerBoard.board, player2.playerBoard.board);

orientShipSvgOnShipGrid(1, "a", "v", 1, 7);
orientShipSvgOnShipGrid(1, "b", "v", 2, 0);
orientShipSvgOnShipGrid(1, "d", "h", 3, 2);
orientShipSvgOnShipGrid(1, "s", "v", 5, 5);
orientShipSvgOnShipGrid(1, "c", "h", 8, 7);

orientShipSvgOnShipGrid(2, "a", "h", 0, 2);
orientShipSvgOnShipGrid(2, "b", "h", 2, 1);
orientShipSvgOnShipGrid(2, "d", "v", 4, 2);
orientShipSvgOnShipGrid(2, "s", "h", 7, 2);
orientShipSvgOnShipGrid(2, "c", "v", 6, 8);

createStartContentElements();

function rotatePlaceShips1() {
  const p1BtnRotate = document.querySelector("#p1-btn-rotate");
  const p1X5Grid = document.querySelector("#p1-x5-grid");
  const allP1PlaceShips = document.querySelectorAll(".all-p1-place-ships");
  let currentRotation = 0; // 0 = horizontal axis
  let rotationCount = 0;
  p1BtnRotate.addEventListener("click", () => {
    rotationCount += 1;
    if (rotationCount % 2 !== 0) {
      currentRotation = 90;
      allP1PlaceShips.forEach((axis) => {
        axis.dataset.axis = "v";
      });
    } else {
      currentRotation = 0;
      allP1PlaceShips.forEach((axis) => {
        axis.dataset.axis = "h";
      });
    }

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

    p2X5Grid.style.transform = `rotate(${currentRotation}deg`;
  });
}
rotatePlaceShips2();


// WEDNESDAY START HERE...
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






document.addEventListener("DOMContentLoaded", () => {
  function attackTargetCoordinates1(board) {
    const hitMissTargetCells1 = document.querySelectorAll(
      ".hit-miss-target-cells1"
    );
    // highlightEmptyCellOnlyOnHover1(player1.playerBoard.board);
    highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
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
          addEmojiEffect(player1.playerBoard.board, 1);
          colorSunkShips(testGame1, 1);
          // highlightEmptyCellOnlyOnHover1(player1.playerBoard.board);
          highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
        }
      });
    });
  }

  function attackTargetCoordinates2(board) {
    const hitMissTargetCells2 = document.querySelectorAll(
      ".hit-miss-target-cells2"
    );
    // highlightEmptyCellOnlyOnHover2(player2.playerBoard.board);
        highlightEmptyCellOnlyOnHover(player2.playerBoard.board, 2);
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
          addEmojiEffect(player2.playerBoard.board, 2);
          colorSunkShips(testGame2, 2);
          // highlightEmptyCellOnlyOnHover2(player2.playerBoard.board);
          highlightEmptyCellOnlyOnHover(player2.playerBoard.board, 2);
        }
      });
    });
  }

  attackTargetCoordinates1();
  attackTargetCoordinates2();
});



console.table(player1.playerBoard.board);
console.table(player2.playerBoard.board);
