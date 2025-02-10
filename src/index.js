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
  clearMessage,
  colorSunkShips,
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
  createBoardContainerDivs();
  createMessageElements();
  createBtnElements();

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
    });

    btnPvsP.addEventListener("click", () => {
      handleBtnNumPlayer(2);
      clearMessage();
      addMessage(player2DeployShipsMsg);
      player1 = new Player(1, "human", testGame1);
      player2 = new Player(2, "human", testGame2);
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

  function setUpQuitBtnEventListener() {
    const { btnQuitGame } = getBtnElements();
    btnQuitGame.addEventListener("click", () => {
      // player1 = null;
      // player2 = null;
      // handleBtnQuitGame();
      testGame1.removeAllShips();
      testGame2.removeAllShips();
      // handleResetPlaceShips(1);
      // handleResetPlaceShips(2);
      handleBtnClearAllShips(1);
      placedShipListArr1 = [];
      placedShipListArr2 = [];
      handleBtnClearAllShips(2);
      // placedShipListArr2 = [];
      // removeAllShipSvgsOnShipGrid(1);
      // removeAllShipSvgsOnShipGrid(2);
      splashScreenStart();
    });
    // btnQuitGame.addEventListener("click", splashScreenStart());
  }

  setUpQuitBtnEventListener();

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

  function checkIfPlaceShipsAreAllPlaced(boardNum) {
    const { btnStartGame } = getBtnElements();
    // const { startGameMsg, player1DeployShipsMsg, player2DeployShipsMsg } =
    //   handleMessageContent();
    if (placedShipListArr[boardNum].length === 5) {
      console.log(`All p${boardNum} ships are placed`);
      btnStartGame.style.display = "flex";
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
      placedShipListArr1 = [];
      // placedShipListArr2 = [];
      testGame1.removeAllShips();
      console.log(testGame1);
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

  function checkShipPlacementCell(board, ship, axis, row, col) {
    // Checks if the ship is in the ships array
    if (ship) {
      for (let i = 0; i < ship.length; i++) {
        // takes the initial, desired placement cell, and loops through the length of a particular ship and checks the horizontal axis...
        if (axis === "h") {
          // ...to see if all cells are on the grid
          if (
            row < 0 ||
            row >= board.length ||
            col + i < 0 ||
            col + i >= board[0].length
          ) {
            return "invalid";
          }
          // ...and if all those same cells are "--", i.e., open for placement and not already occupied by another ship
          if (board[row][col + i] !== "--") {
            return "invalid";
          }
        }
        // takes the initial, desired placement cell, and loops through the length of a particular ship and checks the vertical axis...
        if (axis === "v") {
          // ...to see if all cells are on the grid
          if (
            row + i < 0 ||
            row + i >= board.length ||
            col < 0 ||
            col >= board[0].length
          ) {
            return "invalid";
          }
          // ...and if all those same cells are "--", i.e., open for placement and not already occupied by another ship
          if (board[row + i][col] !== "--") {
            return "invalid";
          }
        }
      }
    }
    // Returns invalid if the ship at that given index is not in the ships array
    else {
      return "invalid";
    }
  }

  function getRandomRow(min = 0, max = 9) {
    const randomRow = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomRow;
  }

  function getRandomCol(min = 0, max = 9) {
    const randomCol = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomCol;
  }

  function getRandomAxis(min = 0, max = 9) {
    const randomAxisNum = Math.floor(Math.random() * (max - min + 1)) + min;
    let randomAxis;
    if (randomAxisNum % 2 === 0) {
      randomAxis = "v";
    } else {
      randomAxis = "h";
    }
    return randomAxis;
  }

  console.log(
    `axis: ${getRandomAxis()}, row: ${getRandomRow()}, col: ${getRandomCol()}`
  );

  function setupRandomBtnEventListener(boardNum) {
    let { btnRandom } = getBtnElements(boardNum);

    // const hitMissCells = document.querySelectorAll(`.hit-miss-cells${boardNum}`);
    const shipPlaces = {
      a: document.querySelector(`#place-a${boardNum}`),
      b: document.querySelector(`#place-b${boardNum}`),
      d: document.querySelector(`#place-d${boardNum}`),
      s: document.querySelector(`#place-s${boardNum}`),
      c: document.querySelector(`#place-c${boardNum}`),
    };

    // const shipPlacesA = shipPlaces.a

    const ships = {
      a: testGame[boardNum].ships[0],
      b: testGame[boardNum].ships[1],
      d: testGame[boardNum].ships[2],
      s: testGame[boardNum].ships[3],
      c: testGame[boardNum].ships[4],
    };

    // let axisA = getRandomAxis();
    // let rowA = getRandomRow();
    // let colA = getRandomCol();
    // console.log(`axisA: ${axisA} , rowA: ${rowA}, colA: ${colA}`);

    let randomAxis;
    let randomRow;
    let randomCol;
    // let placementCheck;

    btnRandom.addEventListener("click", () => {
      while (shipPlaces.a.style.display !== "none") {
        console.log("checkA");
        randomAxis = getRandomAxis();
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        console.log(
          `axisA: ${randomAxis} , rowA: ${randomRow}, colA: ${randomCol}`
        );
        let result = testGame[boardNum].placeShip(
          testGame[boardNum].ships[0],
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
          shipPlaces.a.style.display = "none";
        }
      }

      while (shipPlaces.b.style.display !== "none") {
        console.log("checkB");
        randomAxis = getRandomAxis();
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        console.log(
          `axisB: ${randomAxis} , rowB: ${randomRow}, colB: ${randomCol}`
        );
        let result = testGame[boardNum].placeShip(
          testGame[boardNum].ships[1],
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
          shipPlaces.b.style.display = "none";
        }
      }
      
      while (shipPlaces.d.style.display !== "none") {
        console.log("checkD");
        randomAxis = getRandomAxis();
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        console.log(
          `axisD: ${randomAxis} , rowD: ${randomRow}, colD: ${randomCol}`
        );
        let result = testGame[boardNum].placeShip(
          testGame[boardNum].ships[2],
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
          shipPlaces.d.style.display = "none";
        }
      }

      while (shipPlaces.s.style.display !== "none") {
        console.log("checkS");
        randomAxis = getRandomAxis();
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        console.log(
          `axisS: ${randomAxis} , rowS: ${randomRow}, colS: ${randomCol}`
        );
        let result = testGame[boardNum].placeShip(
          testGame[boardNum].ships[3],
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
          shipPlaces.s.style.display = "none";
        }
      }

            while (shipPlaces.c.style.display !== "none") {
              console.log("checkS");
              randomAxis = getRandomAxis();
              randomRow = getRandomRow();
              randomCol = getRandomCol();
              console.log(
                `axisC: ${randomAxis} , rowC: ${randomRow}, colC: ${randomCol}`
              );
              let result = testGame[boardNum].placeShip(
                testGame[boardNum].ships[4],
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
                shipPlaces.c.style.display = "none";
              }
            }

      console.log(testGame1);
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

  function attackTargetCoordinates(boardNum) {
    // const player = {
    //   1: player1,
    //   2: player2,
    // };

    // const testGame = {
    //   1: testGame1,
    //   2: testGame2,
    // };

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
  console.table(player2.playerBoard.board);

  // console.log(testGame1);
  // console.log(testGame2);
});
