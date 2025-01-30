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

import {
  attackTargetCoordinates,
  highlightPlaceShips,
  rotatePlaceShips,
} from "./js/eventListeners.js";

import { Gameboard } from "./js/classGameboard.js";
import { Player } from "./js/classPlayer.js";

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

document.addEventListener("DOMContentLoaded", () => {

  // let player1;
  // let player2;
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
  // testGame1.placeShip(testGame1.ships[0], "v", 1, 7);
  // testGame1.placeShip(testGame1.ships[1], "v", 2, 0);
  // testGame1.placeShip(testGame1.ships[2], "h", 3, 2);
  // testGame1.placeShip(testGame1.ships[3], "v", 5, 5);
  // testGame1.placeShip(testGame1.ships[4], "h", 8, 7);
  // testGame1.placeShip(testGame1.ships[5], "v", 9, 0);

  // orientShipSvgOnShipGrid(1, "a", "v", 1, 7);
  // orientShipSvgOnShipGrid(1, "b", "v", 2, 0);
  // orientShipSvgOnShipGrid(1, "d", "h", 3, 2);
  // orientShipSvgOnShipGrid(1, "s", "v", 5, 5);
  // orientShipSvgOnShipGrid(1, "c", "h", 8, 7);

  const player2 = new Player(2, "machine", testGame2);
  // testGame2.placeShip(testGame2.ships[0], "h", 0, 2);
  // testGame2.placeShip(testGame2.ships[1], "h", 2, 1);
  // testGame2.placeShip(testGame2.ships[2], "v", 4, 2);
  // testGame2.placeShip(testGame2.ships[3], "h", 7, 2);
  // testGame2.placeShip(testGame2.ships[4], "v", 6, 8);
  // testGame2.placeShip(testGame2.ships[5], "h", 0, 9);

  // orientShipSvgOnShipGrid(2, "a", "h", 0, 2);
  // orientShipSvgOnShipGrid(2, "b", "h", 2, 1);
  // orientShipSvgOnShipGrid(2, "d", "v", 4, 2);
  // orientShipSvgOnShipGrid(2, "s", "h", 7, 2);
  // orientShipSvgOnShipGrid(2, "c", "v", 6, 8);

  createHeader();
  createGameContentDivs();
  createGameContent(player1.playerBoard.board, player2.playerBoard.board);

  rotatePlaceShips(1);
  rotatePlaceShips(2);
  highlightPlaceShips(1);
  highlightPlaceShips(2);

  createMessageElements();
  createStartContentElements();

  function startGame() {
    // const player1;
    // const player2;
    const gifContainer = document.querySelector("#gif-container");
    const btnPvsC = document.querySelector("#btn-pvsc");
    const btnPvsP = document.querySelector("#btn-pvsp");
    const btnQuitGame = document.querySelector("#btn-quit-game");
    const btnStartGame = document.querySelector("#btn-start-game");

    const p1FullBoard = document.querySelector("#p1-full-board");

    // Temp
    // const p1TargetZone = document.querySelector("#p1-target-zone");

    const startMsg = "Please select the number of players below.";
    const deployMsg =
      "DEPLOY YOUR SHIPS. Rotate ships to the desired vertical or horizontal axis. Click on a ship to highlight it in red, then drag it to the desired deployment zone square.";

    addMessage(startMsg);

    btnPvsC.addEventListener("click", () => {
      // player1 = new Player(1, "human", testGame1);
      // player2 = new Player(2, "machine", testGame2);
      gifContainer.style.display = "none";
      btnPvsC.style.display = "none";
      btnPvsP.style.display = "none";
      btnQuitGame.style.display = "flex";
      p1FullBoard.style.display = "flex";
      clearMessage();
      addMessage(deployMsg);
      // p1TargetZone.style.display = "flex";


    });



    // TODO add btnStartGame once ships are deployed!
    btnQuitGame.addEventListener("click", () => {
      // player1 = null;
      // player2 = null,
      gifContainer.style.display = "flex";
      btnPvsC.style.display = "flex";
      btnPvsP.style.display = "flex";
      btnQuitGame.style.display = "none";
      p1FullBoard.style.display = "none";
      clearMessage();
      addMessage(startMsg);
    });

    // return {
    //   player1,
    //   player2,
    // };
  }
  startGame();



  // function attackTargetCoordinates1(board) {
  //   const hitMissTargetCells1 = document.querySelectorAll(
  //     ".hit-miss-target-cells1"
  //   );
  //   // highlightEmptyCellOnlyOnHover1(player1.playerBoard.board);
  //   highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
  //   hitMissTargetCells1.forEach((cell) => {
  //     cell.addEventListener("click", () => {
  //       let targetId = cell.id;
  //       let regex = /\((\d+),(\d+)\)/;
  //       let matches = targetId.match(regex);
  //       let row, col;

  //       if (matches) {
  //         row = +matches[1]; // Reminder, this converts the string to a number
  //         col = +matches[2]; // Same as above
  //         console.log(`Coordinates clicked: ${row}, ${col}`);
  //         console.log(typeof row === "number");
  //         console.log(testGame1.receiveAttack(row, col));
  //         addEmojiEffect(player1.playerBoard.board, 1);
  //         colorSunkShips(testGame1, 1);
  //         // highlightEmptyCellOnlyOnHover1(player1.playerBoard.board);
  //         highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
  //       }
  //     });
  //   });
  // }

  // function attackTargetCoordinates2(board) {
  //   const hitMissTargetCells2 = document.querySelectorAll(
  //     ".hit-miss-target-cells2"
  //   );
  //   // highlightEmptyCellOnlyOnHover2(player2.playerBoard.board);
  //       highlightEmptyCellOnlyOnHover(player2.playerBoard.board, 2);
  //   hitMissTargetCells2.forEach((cell) => {
  //     cell.addEventListener("click", () => {
  //       let targetId = cell.id;
  //       let regex = /\((\d+),(\d+)\)/;
  //       let matches = targetId.match(regex);
  //       let row, col;

  //       if (matches) {
  //         row = +matches[1]; // Reminder, this converts the string to a number
  //         col = +matches[2]; // Same as above
  //         console.log(`Coordinates clicked: ${row}, ${col}`);
  //         console.log(typeof row === "number");
  //         console.log(testGame2.receiveAttack(row, col));
  //         addEmojiEffect(player2.playerBoard.board, 2);
  //         colorSunkShips(testGame2, 2);
  //         // highlightEmptyCellOnlyOnHover2(player2.playerBoard.board);
  //         highlightEmptyCellOnlyOnHover(player2.playerBoard.board, 2);
  //       }
  //     });
  //   });
  // }

  function attackTargetCoordinates(boardNum) {
    const players = {
      1: player1,
      2: player2,
    };

    const testGame = {
      1: testGame1,
      2: testGame2,
    };

    // Validate that the boardNum is valid
    if (!players[boardNum] || !testGame[boardNum]) {
      console.error(`Invalid board number: ${boardNum}`);
      return;
    }

    const hitMissTargetCells = document.querySelectorAll(
      `.hit-miss-target-cells${boardNum}`
    );

    // Ensure the cells exist
    if (!hitMissTargetCells.length) {
      console.error(`No target cells found for board number: ${boardNum}`);
      return;
    }

    // Highlight the player's board
    const board = players[boardNum].playerBoard.board;
    highlightEmptyCellOnlyOnHover(board, boardNum);
    // highlightEmptyCellOnlyOnHover(testGame[boardNum], boardNum);
    hitMissTargetCells.forEach((cell) => {
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
          console.log(testGame[boardNum].receiveAttack(row, col));
          addEmojiEffect(board, boardNum);
          colorSunkShips(testGame[boardNum], boardNum);

          // Highlight the board again
          highlightEmptyCellOnlyOnHover(board, boardNum);
          // highlightEmptyCellOnlyOnHover(board, boardNum);
        }
      });
    });
  }
  // attackTargetCoordinates(player1.playerBoard.board, 1);
  // attackTargetCoordinates(player2.playerBoard.board, 2);
  attackTargetCoordinates(1);
  attackTargetCoordinates(2);
  // attackTargetCoordinates1();
  // attackTargetCoordinates2();

  // Initial set up, changes with attacks
  console.table(player1.playerBoard.board);
  // console.table(player2.playerBoard.board);
  // console.log(testGame1);
  // console.log(testGame2);
});
