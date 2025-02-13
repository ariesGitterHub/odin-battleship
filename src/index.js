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
  // getMessageElements,
} from "./js/domQueries.js";
import {
  handleBtnClearAllShips,
  handleBtnNumPlayer,
  handleBtnRotateShips,
  // handleBtnQuitGame,
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
  // handleResetPlaceShips,
  highlightEmptyCellOnlyOnHover,
  highlightPlaceShipsHelper,
  orientShipSvgOnShipGrid,
  // removeAllShipSvgsOnShipGrid,
} from "./js/functionsOther.js";
import { Gameboard } from "./js/classGameboard.js";
import { Player } from "./js/classPlayer.js";

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

  // const player1 = new Player(1, "human", testGame1);
  // const player2 = new Player(2, "machine", testGame2);

  // let player1;
  // let player2;

  createHeader();
  createBoardContainerDivs();
  createMessageElements();
  createBtnElements();

  // PHASE 1 - START
  function splashScreenStart() {
    const { gifContainer } = getHeaderElements();
    const { btnPvsC, btnPvsP, btnQuitGame, btnStartGame } = getBtnElements();
    const { p1FullBoard, p2FullBoard } = getBoardElements();
    const { startGameMsg } =
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
  }

  function setUpPlayerNumBtnEventListeners() {
    const { btnPvsC, btnPvsP } = getBtnElements();
    const { player1DeployShipsMsg, player2DeployShipsMsg } =
      handleMessageContent();

    btnPvsC.addEventListener("click", () => {
      handleBtnNumPlayer(1);
      clearMessage();
      addMessage(player1DeployShipsMsg);
      player2.playerType = "machine";
      console.log(
        // `Player 1: ${player1.playerType}, Player 2: ${player2.playerType}`
      );
    });

    btnPvsP.addEventListener("click", () => {
      handleBtnNumPlayer(2);
      clearMessage();
      addMessage(player2DeployShipsMsg);
      player2.playerType = "human";
      console.log(
        // `Player 1: ${player1.playerType}, Player 2: ${player2.playerType}`
      );
    });
  }

  splashScreenStart();
  // setUpPlayerNumBtnEventListeners();

  const player1 = new Player(1, "human", testGame1);
  const player2 = new Player(2, "machine", testGame2);
  // console.log(
  //   `Player 1: ${player1.playerType}, Player 2: ${player2.playerType}`
  // );

  displayBoardContent(player1.playerBoard.board, player2.playerBoard.board);

  let placedShipListArr1 = [];
  let placedShipListArr2 = [];
  let playerTurn = 0;

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

  function setUpQuitBtnEventListener(boardNum) {
    const { btnQuitGame } = getBtnElements();
    const { p1PlaceShips, p2PlaceShips, p1TargetZone, p2TargetZone } =
      getBoardElements();
    const board = player[boardNum].playerBoard.board;
    btnQuitGame.addEventListener("click", () => {
      testGame[boardNum].removeAllShips();
      handleBtnClearAllShips(boardNum);
      clearEmojiEffect(board, boardNum);
      placedShipListArr[boardNum] = [];
      playerTurn = 0;
      console.log(placedShipListArr[boardNum]);

      p1PlaceShips.style.display = "flex";
      p2PlaceShips.style.display = "flex";
      p1TargetZone.style.display = "none";
      p2TargetZone.style.display = "none";
      splashScreenStart();
    });
  }

  // setUpQuitBtnEventListener(1);
  // setUpQuitBtnEventListener(2);

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

  function setupRotateBtnEventListener(boardNum) {
    const rotate = handleBtnRotateShips(boardNum); // Get the rotation handler function
    const { btnRotate } = getBtnElements(boardNum);

    btnRotate.addEventListener("click", rotate);
  }
  // setupRotateBtnEventListener(1);
  // setupRotateBtnEventListener(2);

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

  // setupClearBtnEventListener(1);
  // setupClearBtnEventListener(2);

  //REFACTOR THIS!
  function setupRandomBtnEventListener(boardNum) {
    let { btnRandom } = getBtnElements(boardNum);

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

  // setupHighlightPlaceShipsEventListener(1);
  // setupHighlightPlaceShipsEventListener(2);

  // selectShipGameCoordinates(1);
  // selectShipGameCoordinates(2);

  // testGame1.receiveAttack(1, 7);

  function attackTargetCoordinates(boardNum) {
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
          console.log(`PLAYER TURN = ${playerTurn}`);
        }
      });
    });
  }

  attackTargetCoordinates(1);
  // setTimeout(() => {
  //    attackTargetCoordinates(2);
  // }, 5000);
  attackTargetCoordinates(2);

  // PHASE 3 - MATCH MECHANICS - PLAYER VS MACHINE
  function beginActualGameMatchPvsC() {
    const { btnStartGame, p2BtnRandom } = getBtnElements();
    const { p1PlaceShips, p1TargetZone } = getBoardElements();
    const { player1Attack, player2Attack } = handleMessageContent();

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
  }

  beginActualGameMatchPvsC();

  function takeTurnsPvsC() {
    const { player1Attack, player2Attack, player2ComputerAttack } =
      handleMessageContent();
    console.log(playerTurn);
    let randomRow = getRandomRow();
    let randomCol = getRandomCol();
    //     testGame1.receiveAttack(randomRow, randomCol);
    if (player2.playerType === "machine") {
      console.log(player2.playerType);
      if (playerTurn > 0 && playerTurn % 2 === 0) {
        clearMessage();
        addMessage(player1Attack);
      }
      if (playerTurn > 0 && playerTurn % 2 !== 0) {
        clearMessage();
        //TODO, add an "attack hits" or "attack misses" feature?
        addMessage(player2ComputerAttack);
        // setTimeout(() => {
        //   testGame1.receiveAttack(randomRow, randomCol);
        // }, 0);

console.log(testGame1.receiveAttack(randomRow, randomCol));

// START HERE ON THURSDAY...

        // testGame1.receiveAttack(randomRow, randomCol);
        addEmojiEffect(player1.playerBoard.board, 1);
        colorSunkShips(testGame1, 1);
        highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
        console.table(player1.playerBoard.board);
      }
    }
  }

  setUpPlayerNumBtnEventListeners();
  setUpQuitBtnEventListener(1);
  setUpQuitBtnEventListener(2);

  setupRotateBtnEventListener(1);
  setupRotateBtnEventListener(2);
  setupClearBtnEventListener(1);
  setupClearBtnEventListener(2);
      setupRandomBtnEventListener(1);
    setupRandomBtnEventListener(2);

      setupHighlightPlaceShipsEventListener(1);
      setupHighlightPlaceShipsEventListener(2);

        selectShipGameCoordinates(1);
        selectShipGameCoordinates(2);

  console.table(player1.playerBoard.board);
  console.table(player2.playerBoard.board);
  // }
});
