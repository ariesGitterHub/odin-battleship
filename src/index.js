import "./styles/styles.css";
import { createHeader } from "./js/createHeader.js";
import { createMessageElements } from "./js/createMessage.js";
import {
  createBoardContainerDivs,
  displayBoardContent,
} from "./js/createBoard.js";
import { createBtnElements } from "./js/createBtns.js";
import {
  getBoardElements,
  getBtnElements,
  getHeaderElements,
  getMessageElements,
} from "./js/domQueries.js";
import {
  handleBtnClearAllShips,
  handleBtnNumPlayer,
  handleBtnRotateShips,
  handleBtnQuitGame,
} from "./js/functionsBtns.js";
import {
  addEmojiEffect,
  addMessage,
  clearEmojiEffect,
  clearMessage,
  colorSunkShips,
  getRandomAxis,
  getRandomCol,
  getRandomRow,
  handleHighlightPlaceShip,
  handleMessageContent,
  handleResetPlaceShips,
  highlightEmptyCellOnlyOnHover,
  highlightPlaceShipsHelper,
  orientShipSvgOnShipGrid,
  removeAllShipSvgsOnShipGrid,
} from "./js/functionsOther.js";
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
  createBoardContainerDivs();
  createMessageElements();
  createBtnElements();

  // PHASE 1 - START
  function splashScreenStart() {
    let player1 = 0;
    let player2 = 0;

    const { gifContainer } = getHeaderElements();
    const { btnPvsC, btnPvsP, btnQuitGame, btnStartGame } = getBtnElements();
    const { p1FullBoard, p2FullBoard } = getBoardElements();
    const { startGameMsg, player1DeployShipsMsg, player2DeployShipsMsg } =
      handleMessageContent();

    gifContainer.style.display = "flex";
    btnPvsC.style.display = "flex";
    btnPvsP.style.display = "flex";
    btnQuitGame.style.display = "none";
    btnStartGame.style.display = "none";
    p1FullBoard.style.display = "none";
    p2FullBoard.style.display = "none";

    clearMessage();
    addMessage(startGameMsg);
    // START HERE!!!
    btnPvsC.addEventListener("click", () => {
      handleBtnNumPlayer(1);
      clearMessage();
      addMessage(player1DeployShipsMsg);
      player1 = new Player(1, "human", testGame1);
      player2 = new Player(2, "machine", testGame2);
      console.log(
        `Player 1: ${player1.playerType}, Player 2: ${player2.playerType}`
      );
    });

    btnPvsP.addEventListener("click", () => {
      handleBtnNumPlayer(2);
      clearMessage();
      addMessage(player2DeployShipsMsg);
      player1 = new Player(1, "human", testGame1);
      player2 = new Player(2, "human", testGame2);
      console.log(
        `Player 1: ${player1.playerType}, Player 2: ${player2.playerType}`
      );
    });

    // NEED A PASS SCREEN NEXT!!!

    return {
      player1,
      player2,
    };
  }

  splashScreenStart();

  displayBoardContent(player1.playerBoard.board, player2.playerBoard.board);

  // HERE IS WHERE TO START THE PLACEMENT FUNCTIONS..
  // review this: https://stackoverflow.com/questions/17992543/how-do-i-drag-an-image-smoothly-around-the-screen-using-pure-javascript/17992765
  // -dragging the ship to the desired cell,
  // -triggers the placeShip method below

  let placedShipListArr1 = [];
  let placedShipListArr2 = [];
  let playerTurn = 0;

  // below, two
  let currentGameType = [];

  const player = {
    1: player1,
    2: player2,
  };

  const testGame = {
    1: testGame1,
    2: testGame2,
  };

  const placedShipListArr = {
    1: placedShipListArr1,
    2: placedShipListArr2,
  };

  // Use this array below to track ships in order to create an undo last ship btn and its logic. Also use thsi to trigger the start match btn.

  function setUpQuitBtnEventListener(boardNum) {
    const { btnQuitGame } = getBtnElements();
    const { p1PlaceShips, p2PlaceShips, p1TargetZone, p2TargetZone } = getBoardElements();
    const board = player[boardNum].playerBoard.board;
    btnQuitGame.addEventListener("click", () => {
      // player1 = null;
      // player2 = null;
      // handleBtnQuitGame();
      // testGame1.removeAllShips();
      // testGame2.removeAllShips();
      testGame[boardNum].removeAllShips();
      // handleResetPlaceShips(1);
      // handleResetPlaceShips(2);
      // handleBtnClearAllShips(1);
      // handleBtnClearAllShips(2);
      // placedShipListArr1 = [];
      // placedShipListArr2 = [];
      
      handleBtnClearAllShips(boardNum);
      clearEmojiEffect(board, boardNum);
      placedShipListArr[boardNum] = [];
      playerTurn = 0;
      console.log(placedShipListArr[boardNum]);
      
      p1PlaceShips.style.display = "flex";
      p2PlaceShips.style.display = "flex";
      p1TargetZone.style.display = "none";
      p2TargetZone.style.display = "none";

      // placedShipListArr2 = [];
      // removeAllShipSvgsOnShipGrid(1);
      // removeAllShipSvgsOnShipGrid(2);
      splashScreenStart();
    });
    // btnQuitGame.addEventListener("click", splashScreenStart());
  }

  setUpQuitBtnEventListener(1);
  setUpQuitBtnEventListener(2);

  // Select player 1 ships by clicking on grid cells...

  // function recordAction(action) {
  //   actionHistory.push(action); // push new actions into the stack
  // }

  // Eventually refactor and move this...
  // Better version...
  function selectShipGameCoordinates(boardNum) {
    const hitMissCells = document.querySelectorAll(
      `.hit-miss-cells${boardNum}`
    );
    // TODO-how do I rewrite below to account for domQueries references?
    const shipPlaces = {
      a: document.querySelector(`#place-a${boardNum}`),
      b: document.querySelector(`#place-b${boardNum}`),
      d: document.querySelector(`#place-d${boardNum}`),
      s: document.querySelector(`#place-s${boardNum}`),
      c: document.querySelector(`#place-c${boardNum}`),
    };

    const ships = {
      a: testGame[boardNum].ships[0],
      b: testGame[boardNum].ships[1],
      d: testGame[boardNum].ships[2],
      s: testGame[boardNum].ships[3],
      c: testGame[boardNum].ships[4],
    };

    hitMissCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const selectedShipImg = document.querySelector('[data-selected="yes"]');
        if (!selectedShipImg) return; // If no ship is selected, return

        let cellId = cell.id;
        let regex = /\((\d+),(\d+)\)/;
        let matches = cellId.match(regex);

        if (matches) {
          const row = +matches[1];
          const col = +matches[2];
          const getDataShip = selectedShipImg.dataset.ship;
          const getDataAxis = selectedShipImg.dataset.axis;
          const ship = ships[getDataShip]; // Get the ship object from the map

          if (ship) {
            const result = testGame[boardNum].placeShip(
              ship,
              getDataAxis,
              row,
              col
            );

            if (result !== "invalid") {
              orientShipSvgOnShipGrid(
                boardNum,
                getDataShip,
                getDataAxis,
                row,
                col
              );

              // Hide the corresponding place element and reset selection
              shipPlaces[getDataShip].style.display = "none";
              shipPlaces[getDataShip].dataset.selected = "";
              placedShipListArr[boardNum].push(ship.boardCode);
              console.log(testGame[boardNum].allShipsArePlaced());
              console.log(player[boardNum].playerBoard.board);
              console.log(placedShipListArr[boardNum]);
              checkIfPlaceShipsAreAllPlaced(boardNum);
            }
          }
        }
      });
    });
  }

  // PHASE 2 - TRANSITION TO START OF MATCH
  function checkIfPlaceShipsAreAllPlaced(boardNum) {
    const { btnStartGame } = getBtnElements();
    const { p1TargetZone, p2TargetZone } = getBoardElements();
    // TODO, add more messages as needed...
    const { startMatchPvsC } = handleMessageContent();
    if (
      placedShipListArr[boardNum].length === 5 &&
      p1TargetZone.style.display !== "flex" &&
      p2TargetZone.style.display !== "flex"
    ) {
      console.log(`All p${boardNum} ships are placed`);
      btnStartGame.style.display = "flex";

      //TODO - ADD PLAYER VS PLAYER LATER
      if (player2.playerType === "machine") {
        addMessage(startMatchPvsC);
      }
    } else {
      btnStartGame.style.display = "none";
    }
  }

  // rotatePlaceShips(1);
  // rotatePlaceShips(2);
  function setupRotateBtnEventListener(boardNum) {
    const rotate = handleBtnRotateShips(boardNum); // Get the rotation handler function
    const { btnRotate } = getBtnElements(boardNum);

    btnRotate.addEventListener("click", rotate);
  }
  setupRotateBtnEventListener(1);
  setupRotateBtnEventListener(2);

  // function clearPlaceShips(boardNum) {
  //   const btnClearId = document.querySelector(`#p${boardNum}-btn-clear`);
  //   const shipCellsId = document.querySelectorAll(`.ship-cells${boardNum}`);
  //   const placeA = document.querySelector(`#place-a${boardNum}`);
  //   const placeB = document.querySelector(`#place-b${boardNum}`);
  //   const placeD = document.querySelector(`#place-d${boardNum}`);
  //   const placeS = document.querySelector(`#place-s${boardNum}`);
  //   const placeC = document.querySelector(`#place-c${boardNum}`);

  //   // const allPlaceShipsClass = document.querySelectorAll(
  //   //   `.all-p${boardNum}-place-ships`
  //   // );

  //   btnClearId.addEventListener("click", () => {
  //     placeA.style.display = "flex";
  //     // placeA.dataset.selected = "";
  //     placeB.style.display = "flex";
  //     // placeB.dataset.selected = "";
  //     placeD.style.display = "flex";
  //     // placeD.dataset.selected = "";
  //     placeS.style.display = "flex";
  //     // placeS.dataset.selected = "";
  //     placeC.style.display = "flex";
  //     // placeC.dataset.selected = "";

  //     testGame1.removeAllShips();
  //     // highlightPlaceShips(boardNum);
  //     // unHighlightPlaceShips(boardNum);
  //     handleUnhighlightPlaceShips(boardNum);
  //     removeAllShipSvgsOnShipGrid(boardNum);

  //     console.log(testGame1);
  //   });
  // }

  function setupClearBtnEventListener(boardNum) {
    const { btnClear } = getBtnElements(boardNum);

    btnClear.addEventListener("click", () => {
      handleBtnClearAllShips(boardNum);
      placedShipListArr[boardNum] = [];
      checkIfPlaceShipsAreAllPlaced(boardNum);
      testGame[boardNum].removeAllShips();
      console.log(testGame[boardNum]);
    });
  }

  // clearPlaceShips(1);
  // clearPlaceShips(2);
  setupClearBtnEventListener(1);
  setupClearBtnEventListener(2);

  // function randomShipPlacementCoordinateHelper() {
  //     let randomRow = Math.floor(Math.random() * 10);
  //     let randomCol = Math.floor(Math.random() * 10);
  //     let randomAxis;
  //     let randomAxisNum = Math.floor(Math.random() * 10);
  //     if (randomAxisNum % 2 === 0) {
  //       randomAxis = "v"
  //     } else {
  //       randomAxis = "h"
  //     }
  //       // const randomShipCoordinateResult = `(${row}, ${col})`;
  //       // return randomShipCoordinateResult;
  //       return {
  //         randomRow,
  //         randomCol,
  //         randomAxis,
  //       };
  //   }

  //REFACTOR THIS!
  function setupRandomBtnEventListener(boardNum) {
    let { btnRandom } = getBtnElements(boardNum);

    // const hitMissCells = document.querySelectorAll(`.hit-miss-cells${boardNum}`);
    // const shipPlaces = {
    //   a: document.querySelector(`#place-a${boardNum}`),
    //   b: document.querySelector(`#place-b${boardNum}`),
    //   d: document.querySelector(`#place-d${boardNum}`),
    //   s: document.querySelector(`#place-s${boardNum}`),
    //   c: document.querySelector(`#place-c${boardNum}`),
    // };

    const { placeA, placeB, placeD, placeC, placeS } =
      getBoardElements(boardNum);

    const ships = {
      a: testGame[boardNum].ships[0],
      b: testGame[boardNum].ships[1],
      d: testGame[boardNum].ships[2],
      s: testGame[boardNum].ships[3],
      c: testGame[boardNum].ships[4],
    };

    let randomAxis;
    let randomRow;
    let randomCol;

    btnRandom.addEventListener("click", () => {
      while (placeA.style.display !== "none") {
        console.log("checkA");
        randomAxis = getRandomAxis();
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        console.log(
          `axisA${boardNum}: ${randomAxis} , rowA${boardNum}: ${randomRow}, colA${boardNum}: ${randomCol}`
        );
        let result = testGame[boardNum].placeShip(
          ships.a,
          randomAxis,
          randomRow,
          randomCol
        );
        if (result !== "invalid") {
          orientShipSvgOnShipGrid(
            boardNum,
            ships.a.boardCode,
            randomAxis,
            randomRow,
            randomCol
          );
          placedShipListArr[boardNum].push(ships.a.boardCode);
          console.log(placedShipListArr[boardNum]);

          placeA.style.display = "none";
        }
      }

      while (placeB.style.display !== "none") {
        console.log("checkB");
        randomAxis = getRandomAxis();
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        console.log(
          `axisB${boardNum}: ${randomAxis} , rowB${boardNum}: ${randomRow}, colB${boardNum}: ${randomCol}`
        );
        let result = testGame[boardNum].placeShip(
          ships.b,
          randomAxis,
          randomRow,
          randomCol
        );
        if (result !== "invalid") {
          orientShipSvgOnShipGrid(
            boardNum,
            ships.b.boardCode,
            randomAxis,
            randomRow,
            randomCol
          );
          placedShipListArr[boardNum].push(ships.b.boardCode);
          console.log(placedShipListArr[boardNum]);
          placeB.style.display = "none";
        }
      }

      while (placeD.style.display !== "none") {
        console.log("checkD");
        randomAxis = getRandomAxis();
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        console.log(
          `axisD${boardNum}: ${randomAxis} , rowD${boardNum}: ${randomRow}, colD${boardNum}: ${randomCol}`
        );
        let result = testGame[boardNum].placeShip(
          ships.d,
          randomAxis,
          randomRow,
          randomCol
        );
        if (result !== "invalid") {
          orientShipSvgOnShipGrid(
            boardNum,
            ships.d.boardCode,
            randomAxis,
            randomRow,
            randomCol
          );
          placedShipListArr[boardNum].push(ships.d.boardCode);
          console.log(placedShipListArr[boardNum]);
          placeD.style.display = "none";
        }
      }

      while (placeS.style.display !== "none") {
        console.log("checkS");
        randomAxis = getRandomAxis();
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        console.log(
          `axisS${boardNum}: ${randomAxis} , rowS${boardNum}: ${randomRow}, colS${boardNum}: ${randomCol}`
        );
        let result = testGame[boardNum].placeShip(
          ships.s,
          randomAxis,
          randomRow,
          randomCol
        );
        if (result !== "invalid") {
          orientShipSvgOnShipGrid(
            boardNum,
            ships.s.boardCode,
            randomAxis,
            randomRow,
            randomCol
          );
          placedShipListArr[boardNum].push(ships.s.boardCode);
          console.log(placedShipListArr[boardNum]);
          placeS.style.display = "none";
        }
      }

      while (placeC.style.display !== "none") {
        console.log("checkS");
        randomAxis = getRandomAxis();
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        console.log(
          `axisC${boardNum}: ${randomAxis} , rowC${boardNum}: ${randomRow}, colC${boardNum}: ${randomCol}`
        );
        let result = testGame[boardNum].placeShip(
          ships.c,
          randomAxis,
          randomRow,
          randomCol
        );
        if (result !== "invalid") {
          orientShipSvgOnShipGrid(
            boardNum,
            ships.c.boardCode,
            randomAxis,
            randomRow,
            randomCol
          );
          placedShipListArr[boardNum].push(ships.c.boardCode);
          console.log(placedShipListArr[boardNum]);
          placeC.style.display = "none";
        }
      }
      checkIfPlaceShipsAreAllPlaced(boardNum);
      console.log(testGame1);
         console.log(testGame2);
    });
  }

  setupRandomBtnEventListener(1);
  setupRandomBtnEventListener(2);

  // highlightPlaceShips(1);
  // highlightPlaceShips(2);

  function setupHighlightPlaceShipsEventListener(boardNum) {
    //const boardNum = 1; // example, set to the correct board number
    const shipData = highlightPlaceShipsHelper(boardNum); // Set up ships and get ship data

    const { allPlaceShipsClass } = getBoardElements(boardNum);

    allPlaceShipsClass.forEach((ship) => {
      ship.addEventListener("click", () => {
        // Call the handler with the necessary parameters
        handleHighlightPlaceShip(ship, boardNum, shipData);
      });
    });
  }

  setupHighlightPlaceShipsEventListener(1);
  setupHighlightPlaceShipsEventListener(2);
  // selectShipGameCoordinates(player1.playerBoard.board, 1);
  selectShipGameCoordinates(1);
  selectShipGameCoordinates(2);

  // testGame1.placeShip(testGame1.ships[0], "v", 1, 7);
  // testGame1.placeShip(testGame1.ships[1], "v", 2, 0);
  // testGame1.placeShip(testGame1.ships[2], "h", 3, 2);
  // testGame1.placeShip(testGame1.ships[3], "v", 5, 5);
  // testGame1.placeShip(testGame1.ships[4], "h", 8, 7);
  // testGame1.placeShip(testGame1.ships[5], "v", 9, 0);
  // - which then triggers the orientShipSvgOnShipGrid below
  // orientShipSvgOnShipGrid(1, "a", "v", 1, 7);
  // orientShipSvgOnShipGrid(1, "b", "v", 2, 0);
  // orientShipSvgOnShipGrid(1, "d", "h", 3, 2);
  // orientShipSvgOnShipGrid(1, "s", "v", 5, 5);
  // orientShipSvgOnShipGrid(1, "c", "h", 8, 7);
  // - need to handle undo, clear, and random buttons...

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

  testGame1.receiveAttack(1, 7);

  function attackTargetCoordinates(boardNum) {
    // const player = {
    //   1: player1,
    //   2: player2,
    // };

    // const testGame = {
    //   1: testGame1,
    //   2: testGame2,
    // };

    // let randomRow = getRandomRow();
    // let randomCol = getRandomCol();

    // Validate that the boardNum is valid
    if (!player[boardNum] || !testGame[boardNum]) {
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
    const board = player[boardNum].playerBoard.board;
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
          // console.log(`Coordinates clicked: ${row}, ${col}`);
          // console.log(typeof row === "number");
          // console.log(testGame[boardNum].receiveAttack(row, col));
          testGame[boardNum].receiveAttack(row, col);
          addEmojiEffect(board, boardNum);
          colorSunkShips(testGame[boardNum], boardNum);
          // Highlight the board again
          highlightEmptyCellOnlyOnHover(board, boardNum);
          playerTurn += 1;
          takeTurnsPvsC();

          // testGame1.receiveAttack(0, 0);
          console.log(`PLAYER TURN = ${playerTurn}`);
          
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

  // PHASE 3 - MATCH MECHANICS - PLAYER VS MACHINE
  function beginActualGameMatchPvsC() {
    const { btnStartGame, p2BtnRandom } = getBtnElements();
    const { p1PlaceShips, p1TargetZone } = getBoardElements();
    const { player1Attack, player2Attack}  = handleMessageContent();

    if (player2.playerType === "machine") {
      btnStartGame.addEventListener("click", () => {
        setTimeout(() => {
          p2BtnRandom.click(); // This simulates a user click
        }, 200);
        // console.table(player2.playerBoard.board);
        p1PlaceShips.style.display = "none";
        p1TargetZone.style.display = "flex";
        // btnStartGame.style.display = "none"; // handled in phase 2
        addMessage(player1Attack);
      });
    }

        // if (player2.playerType === "machine" && playerTurn > 0 && playerTurn % 2 === 0) {
        //   // playerTurn +=1
        //   console.log("this1");
        //   clearMessage();
        //   addMessage(player2Attack);
        // }

        // if (player2.playerType === "machine" && playerTurn % 2 !== 0) {
        //   console.log("that2");
        //   clearMessage();
        //   addMessage(player2Attack);
        // }
  }
  beginActualGameMatchPvsC();

  function takeTurnsPvsC() {
    const { player1Attack, player2Attack, player2ComputerAttack } = handleMessageContent();
    console.log(playerTurn);
    let randomRow = getRandomRow();
    let randomCol = getRandomCol();
    //     testGame1.receiveAttack(randomRow, randomCol);
    if (player2.playerType === "machine") {
      console.log(player2.playerType);
      if (playerTurn > 0 && playerTurn % 2 === 0) {
        clearMessage();
        addMessage(player1Attack)
      }
      if (playerTurn > 0 && playerTurn % 2 !== 0) {
        clearMessage();
        addMessage(player2ComputerAttack);
        
        testGame1.receiveAttack(randomRow, randomCol);
        addEmojiEffect(player1.playerBoard.board, 1);
        colorSunkShips(testGame1, 1);
        highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
        console.table(player1.playerBoard.board);
      }
    }
  }

  // function randomComputerAttack() {
  // let randomRow = getRandomRow();
  // let randomCol = getRandomCol();
  //   if (player2.playerType === "machine") {
  //     if (playerTurn > 0 && playerTurn % 2 !== 0) {
  //       testGame1.receiveAttack(randomRow, randomCol);
  //     }
  //   }
  // }

  // takeTurnsPvsC();
  // Initial set up, changes with attacks
  console.table(player1.playerBoard.board);
  console.table(player2.playerBoard.board);
// testGame1.receiveAttack(0, 0);
  // console.log(testGame1);
  // console.log(testGame2);
});
