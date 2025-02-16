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
  clearColorSunkShips,
  clearEmojiEffect,
  clearMessage,
  colorSunkShips,
  getRandomAxis,
  getRandomCol,
  getRandomRow,
  getUniqueRandomCoordinates,
  handleHighlightPlaceShip,
  handleMessageContent,
  // handleResetPlaceShips,
  highlightEmptyCellOnlyOnHover,
  highlightPlaceShipsHelper,
  mp3Click,
  mp3Fire,
  mp3Hit,
  mp3Miss,
  mp3Sink,
  orientShipSvgOnShipGrid,
  // removeAllShipSvgsOnShipGrid,
} from "./js/functionsOther.js";
import { Gameboard } from "./js/classGameboard.js";
import { Player } from "./js/classPlayer.js";

document.addEventListener("DOMContentLoaded", () => {
  // Input the number of desired rows and cols here.
  const numRows = 10;
  const numCols = 10;

  // Create the grids
  let seaBoard1 = Array(numRows)
    .fill()
    .map(() => Array(numCols).fill("--"));
  let seaBoard2 = Array(numRows)
    .fill()
    .map(() => Array(numCols).fill("--"));

  // Create instances of the gameboards
  const testGame1 = new Gameboard(seaBoard1);
  const testGame2 = new Gameboard(seaBoard2);

  // Create instances of the players and their gameboards
  const player1 = new Player(1, "human", testGame1);
  const player2 = new Player(2, "machine", testGame2);

  // Helper array that tracks if all ships have been placed
  let placedShipListArr1 = [];
  let placedShipListArr2 = [];
  let playerTurn = 0;
  let lastPlayer2ComputerAttack;
  let randomRowStored;
  let randomColStored;

  // Helpers that aid with boardNum parameters in later functions
  const player = { 1: player1, 2: player2 };
  const testGame = { 1: testGame1, 2: testGame2 };
  const placedShipListArr = { 1: placedShipListArr1, 2: placedShipListArr2 };

  // Create UI elements
  createHeader();
  createBoardContainerDivs();
  createMessageElements();
  createBtnElements();

  // Arrange gameboard content
  displayBoardContent(player1.playerBoard.board, player2.playerBoard.board);

  highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
  highlightEmptyCellOnlyOnHover(player2.playerBoard.board, 2);

  // PHASE 1 - Start with the basic splash screen
  function splashScreenStart() {
    const { gifContainer } = getHeaderElements();
    const { btnPvsC, btnPvsP, btnQuitGame, btnStartGame } = getBtnElements();
    const { p1FullBoard, p2FullBoard } = getBoardElements();
    const { startGameMsg } = handleMessageContent();

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

  // Set up btn eventListeners that handle the number of players
  function setUpPlayerNumBtnEventListeners() {
    const { btnPvsC, btnPvsP } = getBtnElements();
    const { player1DeployShipsMsg, player2DeployShipsMsg } =
      handleMessageContent();

    btnPvsC.addEventListener("click", () => {
      mp3Click();
      handleBtnNumPlayer(1);
      clearMessage();
      addMessage(player1DeployShipsMsg);
      player2.playerType = "machine";
      // console.log(`Player 1: ${player1.playerType}, Player 2: $player2.playerType}`);
    });

    btnPvsP.addEventListener("click", () => {
      mp3Click();
      handleBtnNumPlayer(1);
      clearMessage();
      addMessage(player1DeployShipsMsg);
      player2.playerType = "human";
      // console.log(`Player 1: ${player1.playerType}, Player 2: $player2.playerType}`);
    });
  }

  splashScreenStart();

  // Set up btn eventListener to quit the game
  // TODO - come back an properly implement this, do not rely on location.reload()
  function setUpQuitBtnEventListener(boardNum) {
    const { btnQuitGame } = getBtnElements();
    const { p1PlaceShips, p2PlaceShips, p1TargetZone, p2TargetZone } =
      getBoardElements();
    // const board = player[boardNum].playerBoard.board;
    // const boardShips = player[boardNum].playerBoard.ships;
    btnQuitGame.addEventListener("click", () => {
      mp3Click();
      window.location.reload();
      // testGame[boardNum].removeAllShips();
      // boardShips.forEach((ship) => {ship.clearHitsAndSunkStatus()});
      // handleBtnClearAllShips(boardNum);
      // // clearColorSunkShips(testGame[boardNum], boardNum);
      // clearEmojiEffect(board, boardNum);
      // placedShipListArr[boardNum] = [];
      // playerTurn = 0;
      // console.log(placedShipListArr[boardNum]);

      // p1PlaceShips.style.display = "flex";
      // p2PlaceShips.style.display = "flex";
      // p1TargetZone.style.display = "none";
      // p2TargetZone.style.display = "none";
      // splashScreenStart();
    });
  }

  // Set up btn eventListener that handles place ship rotation from h to v
  function setupRotateBtnEventListener(boardNum) {
    const rotate = handleBtnRotateShips(boardNum);
    const { btnRotate } = getBtnElements(boardNum);
    btnRotate.addEventListener("click", () => {
      mp3Click();
      rotate();
    });
  }

  // Set up btn eventListener that handles clearing placed ships on the gameboard
  function setupClearBtnEventListener(boardNum) {
    const { btnClear } = getBtnElements(boardNum);
    btnClear.addEventListener("click", () => {
      mp3Click();
      handleBtnClearAllShips(boardNum);
      placedShipListArr[boardNum] = [];
      forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn(boardNum);
      testGame[boardNum].removeAllShips();
    });
  }

  // TODO - set up Undo Btn

  // function setupRandomBtnEventListener(boardNum) {
  //   let { btnRandom } = getBtnElements(boardNum);

  //   const { placeA, placeB, placeD, placeC, placeS } =
  //     getBoardElements(boardNum);

  //   const ships = {
  //     a: testGame[boardNum].ships[0],
  //     b: testGame[boardNum].ships[1],
  //     d: testGame[boardNum].ships[2],
  //     s: testGame[boardNum].ships[3],
  //     c: testGame[boardNum].ships[4],
  //   };

  //   let randomAxis;
  //   let randomRow;
  //   let randomCol;

  //   btnRandom.addEventListener("click", () => {
  //     mp3Click();
  //     while (placeA.style.display !== "none") {
  //       // console.log("checkA");
  //       randomAxis = getRandomAxis();
  //       randomRow = getRandomRow();
  //       randomCol = getRandomCol();
  //       // console.log(
  //       //   `axisA${boardNum}: ${randomAxis} , rowA${boardNum}: ${randomRow}, colA${boardNum}: ${randomCol}`
  //       // );
  //       let result = testGame[boardNum].placeShip(
  //         ships.a,
  //         randomAxis,
  //         randomRow,
  //         randomCol
  //       );
  //       if (result !== "invalid") {
  //         orientShipSvgOnShipGrid(
  //           boardNum,
  //           ships.a.boardCode,
  //           randomAxis,
  //           randomRow,
  //           randomCol
  //         );
  //         placedShipListArr[boardNum].push(ships.a.boardCode);
  //         // console.log(placedShipListArr[boardNum]);

  //         placeA.style.display = "none";
  //       }
  //     }

  //     while (placeB.style.display !== "none") {
  //       // console.log("checkB");
  //       randomAxis = getRandomAxis();
  //       randomRow = getRandomRow();
  //       randomCol = getRandomCol();
  //       // console.log(
  //       //   `axisB${boardNum}: ${randomAxis} , rowB${boardNum}: ${randomRow}, colB${boardNum}: ${randomCol}`
  //       // );
  //       let result = testGame[boardNum].placeShip(
  //         ships.b,
  //         randomAxis,
  //         randomRow,
  //         randomCol
  //       );
  //       if (result !== "invalid") {
  //         orientShipSvgOnShipGrid(
  //           boardNum,
  //           ships.b.boardCode,
  //           randomAxis,
  //           randomRow,
  //           randomCol
  //         );
  //         placedShipListArr[boardNum].push(ships.b.boardCode);
  //         // console.log(placedShipListArr[boardNum]);
  //         placeB.style.display = "none";
  //       }
  //     }

  //     while (placeD.style.display !== "none") {
  //       // console.log("checkD");
  //       randomAxis = getRandomAxis();
  //       randomRow = getRandomRow();
  //       randomCol = getRandomCol();
  //       // console.log(
  //       //   `axisD${boardNum}: ${randomAxis} , rowD${boardNum}: ${randomRow}, colD${boardNum}: ${randomCol}`
  //       // );
  //       let result = testGame[boardNum].placeShip(
  //         ships.d,
  //         randomAxis,
  //         randomRow,
  //         randomCol
  //       );
  //       if (result !== "invalid") {
  //         orientShipSvgOnShipGrid(
  //           boardNum,
  //           ships.d.boardCode,
  //           randomAxis,
  //           randomRow,
  //           randomCol
  //         );
  //         placedShipListArr[boardNum].push(ships.d.boardCode);
  //         // console.log(placedShipListArr[boardNum]);
  //         placeD.style.display = "none";
  //       }
  //     }

  //     while (placeS.style.display !== "none") {
  //       // console.log("checkS");
  //       randomAxis = getRandomAxis();
  //       randomRow = getRandomRow();
  //       randomCol = getRandomCol();
  //       // console.log(
  //       //   `axisS${boardNum}: ${randomAxis} , rowS${boardNum}: ${randomRow}, colS${boardNum}: ${randomCol}`
  //       // );
  //       let result = testGame[boardNum].placeShip(
  //         ships.s,
  //         randomAxis,
  //         randomRow,
  //         randomCol
  //       );
  //       if (result !== "invalid") {
  //         orientShipSvgOnShipGrid(
  //           boardNum,
  //           ships.s.boardCode,
  //           randomAxis,
  //           randomRow,
  //           randomCol
  //         );
  //         placedShipListArr[boardNum].push(ships.s.boardCode);
  //         // console.log(placedShipListArr[boardNum]);
  //         placeS.style.display = "none";
  //       }
  //     }

  //     while (placeC.style.display !== "none") {
  //       // console.log("checkS");
  //       randomAxis = getRandomAxis();
  //       randomRow = getRandomRow();
  //       randomCol = getRandomCol();
  //       // console.log(
  //       //   `axisC${boardNum}: ${randomAxis} , rowC${boardNum}: ${randomRow}, colC${boardNum}: ${randomCol}`
  //       // );
  //       let result = testGame[boardNum].placeShip(
  //         ships.c,
  //         randomAxis,
  //         randomRow,
  //         randomCol
  //       );
  //       if (result !== "invalid") {
  //         orientShipSvgOnShipGrid(
  //           boardNum,
  //           ships.c.boardCode,
  //           randomAxis,
  //           randomRow,
  //           randomCol
  //         );
  //         placedShipListArr[boardNum].push(ships.c.boardCode);
  //         // console.log(placedShipListArr[boardNum]);
  //         placeC.style.display = "none";
  //       }
  //     }
  //     forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn(boardNum);

  //     console.log(`All player ${boardNum} ships are placed`);
  //     console.log(testGame1);
  //     console.log(testGame2);
  //   });
  // }

  // Better DRY version of above

  function setupRandomBtnEventListener(boardNum) {
    let { btnRandom } = getBtnElements(boardNum);
    const { placeA, placeB, placeD, placeC, placeS } =
      getBoardElements(boardNum);

    // Store the ships in an array for easier iteration
    const ships = [
      { ship: testGame[boardNum].ships[0], place: placeA },
      { ship: testGame[boardNum].ships[1], place: placeB },
      { ship: testGame[boardNum].ships[2], place: placeD },
      { ship: testGame[boardNum].ships[3], place: placeS },
      { ship: testGame[boardNum].ships[4], place: placeC },
    ];

    btnRandom.addEventListener("click", () => {
      mp3Click();

      // Iterate over the ships and place them
      ships.forEach(({ ship, place }) => {
        while (place.style.display !== "none") {
          const randomAxis = getRandomAxis();
          const randomRow = getRandomRow();
          const randomCol = getRandomCol();

          let result = testGame[boardNum].placeShip(
            ship,
            randomAxis,
            randomRow,
            randomCol
          );

          if (result !== "invalid") {
            orientShipSvgOnShipGrid(
              boardNum,
              ship.boardCode,
              randomAxis,
              randomRow,
              randomCol
            );
            placedShipListArr[boardNum].push(ship.boardCode);
            place.style.display = "none"; // Hide the place once the ship is placed
          }
        }
      });

      forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn(boardNum);
      console.log(`All player ${boardNum} ships are placed`);
      console.log(testGame1);
      console.log(testGame2);
    });
  }

  // For any highlighted ship, select the cell location where you want to place the beginning of that ship on the game grid
  function manuallySelectShipPlacementCoordinates(boardNum) {
    // const hitMissCells = document.querySelectorAll(
    //   `.hit-miss-cells${boardNum}`
    // );
    const { hitMissCellsClass, placeA, placeB, placeD, placeS, placeC } =
      getBoardElements(boardNum);
    const shipPlaces = {
      a: placeA,
      b: placeB,
      d: placeD,
      s: placeS,
      c: placeC,
    };

    // const ships = {
    //   a: testGame[boardNum].ships[0],
    //   b: testGame[boardNum].ships[1],
    //   d: testGame[boardNum].ships[2],
    //   s: testGame[boardNum].ships[3],
    //   c: testGame[boardNum].ships[4],
    // };

    // Better code than above...
    const shipKeys = ["a", "b", "d", "s", "c"];
    const ships = shipKeys.reduce((accumulator, key, index) => {
      accumulator[key] = testGame[boardNum].ships[index];
      return accumulator;
    }, {});

    // Even shorter version of above, but too abstracted for my liking...
    // const ships = ["a", "b", "d", "s", "c"].reduce(
    //   (acc, key, i) => ({
    //     ...acc,
    //     [key]: testGame[boardNum].ships[i],
    //   }),
    //   {}
    // );

    hitMissCellsClass.forEach((cell) => {
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

            // If placement is invalid, the player will know visually because the ship will not be placed in that location
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
              forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn(
                boardNum
              );

              // if (debug) {
              console.log(testGame[boardNum].allShipsArePlaced());
              console.log(player[boardNum].playerBoard.board);
              console.log(placedShipListArr[boardNum]);
              // }
            }
          }
        }
      });
    });
  }

  // PHASE 2 - Now that the ships are placed
  // Two different tracks here, 1) PvsC and 2) PvsP
  // PvsC Only...
  let s = 1; // DELETE
  // function checkIfPlaceShipsAreAllPlacedThenShowStartBtn(boardNum) {
  //   const { btnStartGame, btnPassDevice } = getBtnElements();
  //   const { p1PlaceShips, p2PlaceShips, p1TargetZone, p2TargetZone } = getBoardElements();
  //   // TODO, add more messages as needed...
  //   const { startMatchPvsC, player1PassPlaceShip, player2PassPlaceShip } =
  //     handleMessageContent();
  //   if (
  //     // placedShipListArr[boardNum].length === 5 &&
  //     placedShipListArr1.length === 5 &&
  //     p1TargetZone.style.display !== "flex" &&
  //     p2TargetZone.style.display !== "flex"
  //   ) {
  //     // btnStartGame.style.display = "flex";
  //     // btnPassDevice.style.display = "none"; // It's none in CSS too, this is for clarity, for now

  //     // Player vs Machine, only Player 1 needs to interact with UI
  //     if (player2.playerType === "machine") {
  //       addMessage(startMatchPvsC);
  //       btnStartGame.style.display = "flex";
  //       btnPassDevice.style.display = "none"; // It's none in CSS too, this is for clarity, for now
  //     }
  //     // Player vs Player, Player 1 starts interaction with UI
  //     if (player2.playerType === "human") {
  //       addMessage(player1PassPlaceShip);
  //       // btnStartGame.innerText = "Pass to Player 2";
  //       btnStartGame.style.display = "none";
  //       btnPassDevice.style.display = "flex"; // It's none in CSS too, this is for clarity, for now
  //     }

  //     if (player2.playerType === "human" && placedShipListArr2.length === 5) {
  //       addMessage(player2PassPlaceShip);
  //       // btnStartGame.innerText = "Pass to Player 2";
  //       btnStartGame.style.display = "none";
  //       btnPassDevice.style.display = "flex"; // It's none in CSS too, this is for clarity, for now
  //       p2PlaceShips.style.display = "none";
  //       p2TargetZone.style.display = "flex";
  //     }
  //   } else {
  //     btnStartGame.style.display = "none";
  //     btnPassDevice.style.display = "none";
  //   }
  // }

  function forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn(
    boardNum
  ) {
    const { btnStartGame, p2BtnRandom } = getBtnElements();
    const { p1PlaceShips, p1TargetZone } = getBoardElements();
    const { startMatchPvsC } = handleMessageContent();
    if (
      player2.playerType === "machine" &&
      placedShipListArr1.length === 5 &&
      p1TargetZone.style.display !== "flex"
    ) {
      btnStartGame.style.display = "flex";
      p2BtnRandom.click();
      // p1PlaceShips.style.display = "none";
      // p1TargetZone.style.display = "flex";
      // btnStartGame.style.display = "none"; // handled in phase 2
      addMessage(startMatchPvsC);
    } else {
      btnStartGame.style.display = "none";
    }
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

  function manuallyAttackTargetCoordinates(boardNum) {
    // Validate that the boardNum is valid
    // if (!player[boardNum] || !testGame[boardNum]) {
    //   console.error(`Invalid board number: ${boardNum}`);
    //   return;
    // }

    // const hitMissTargetCells = document.querySelectorAll(
    //   `.hit-miss-target-cells${boardNum}`
    // );

    const { hitMissTargetCellsClass } = getBoardElements(boardNum);
    const board = player[boardNum].playerBoard.board;
    highlightEmptyCellOnlyOnHover(board, boardNum);

    hitMissTargetCellsClass.forEach((cell) => {
      cell.addEventListener("click", () => {
        let targetId = cell.id;
        let regex = /\((\d+),(\d+)\)/;
        let matches = targetId.match(regex);
        let row, col;

        if (matches && cell.innerText === "" && playerTurn % 2 === 0) {
          // const { player1Attack } = handleMessageContent();

          row = +matches[1]; // Reminder, this converts the string to a number
          col = +matches[2]; // Same as above
          // console.log(`Coordinates clicked: ${row}, ${col}`);
          // console.log(typeof row === "number");
          // console.log(testGame[boardNum].receiveAttack(row, col));
          testGame[boardNum].receiveAttack(row, col);
          clearMessage();
          // TODO - add below to handleMessageContent
          addMessage(`PLAYER 1 attacks coordinates (${row}, ${col}). Wait for PLAYER 2's counterattack.`);
          mp3Fire();
          addEmojiEffect(board, boardNum);
          colorSunkShips(testGame[boardNum], boardNum);
          // Highlight the board again
          highlightEmptyCellOnlyOnHover(board, boardNum);
          // console.log(`Turn before P! = ${playerTurn}`);
          playerTurn += 1;
          console.log(
            `Attack on testGame${boardNum} by P1, Turn flips to: ${playerTurn}`
          );

          player2ComputerAttack();

          // if (player2.playerType == "machine" && playerTurn % 2 !== 0) {
          //   setTimeout(() => {
          //     const { player2ComputerAttack } = handleMessageContent();
          //     clearMessage();
          //     let { randomRow, randomCol } = getUniqueRandomCoordinates();
          //     let hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
          //     // TODO - fix below later in handleMessageContent
          //     addMessage(
          //       `PLAYER 2 attacks! It's a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}). PLAYER 1's turn.`
          //     );
          //     playerTurn += 1;
          //     console.log(
          //       `Attack on testGame1 by P2, Turn flips to: ${playerTurn}`
          //     );
          //     mp3Fire();
          //     addEmojiEffect(player1.playerBoard.board, 1);
          //     colorSunkShips(testGame1, 1);
          //     highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
          //   }, 3000);
          // }
        }
      });
    });
  }

  function player2ComputerAttack() {
    if (
      player2.playerType == "machine" &&
      playerTurn % 2 !== 0 &&
      lastPlayer2ComputerAttack !== "HIT!!!"
    ) {
      setTimeout(() => {
        const { player2ComputerAttack } = handleMessageContent();
        clearMessage();
        let { randomRow, randomCol } = getUniqueRandomCoordinates();
        let hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
        // TODO - fix below later in handleMessageContent
        addMessage(
          `PLAYER 2 attacks! It's a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}). PLAYER 1's turn.`
        );
        playerTurn += 1;
        console.log(`Attack on testGame1 by P2, Turn flips to: ${playerTurn}`);
        mp3Fire();
        addEmojiEffect(player1.playerBoard.board, 1);
        colorSunkShips(testGame1, 1);
        highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);

        if (hitOrMiss === "hit") {
          console.log("FUCKTASTIC!!!!");
          lastPlayer2ComputerAttack = "HIT!!!";
          randomRowStored = randomRow;
          randomColStored = randomCol;
        } else {
          console.log("Boooooos-ville...");
        }
      }, 3000);
    }
        if (
          player2.playerType == "machine" &&
          playerTurn % 2 !== 0 &&
          lastPlayer2ComputerAttack === "HIT!!!"
        ) {
          setTimeout(() => {
            const { player2ComputerAttack } = handleMessageContent();
            clearMessage();
            let { randomRow, randomCol } = getUniqueRandomCoordinates();
            let hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
            // TODO - fix below later in handleMessageContent
            addMessage(
              `PLAYER 2 attacks! It's a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}). PLAYER 1's turn.`
            );
            playerTurn += 1;
            console.log(
              `Attack on testGame1 by P2, Turn flips to: ${playerTurn}`
            );
            mp3Fire();
            addEmojiEffect(player1.playerBoard.board, 1);
            colorSunkShips(testGame1, 1);
            highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);

            if (hitOrMiss === "hit") {
              console.log("FUCKTASTIC!!!!");
              lastPlayer2ComputerAttack = "HIT!!!";
              randomRowStored = randomRow;
              randomColStored = randomCol;
            } else {
              console.log("Boooooos-ville...");
            }
          }, 3000);
        } 
  }

  function player2ComputerEnhancedAttack() {

  }

  manuallyAttackTargetCoordinates(1);
  manuallyAttackTargetCoordinates(2);

  // PHASE 3 - MATCH MECHANICS - PLAYER VS MACHINE
  function forPvsCMatchesBeginActualGameWithStartBtn() {
    const { btnStartGame } = getBtnElements();
    const { p1PlaceShips, p1TargetZone, p2PlaceShips, p2TargetZone } =
      getBoardElements();
    const { player1Attack } = handleMessageContent();

    if (player2.playerType === "machine") {
      btnStartGame.addEventListener("click", () => {
        mp3Click();
        p1PlaceShips.style.display = "none";
        p1TargetZone.style.display = "flex";
        btnStartGame.style.display = "none";
        //DELETE WHEN DONE - below is for testing purposes
        p2PlaceShips.style.display = "none";
        p2TargetZone.style.display = "flex";
        addMessage(player1Attack);
        //  manageTurns(2);
      });
    }
  }

  forPvsCMatchesBeginActualGameWithStartBtn();

  // function takeTurnsPvsC() {
  //   const { player1Attack, player2ComputerAttack } = handleMessageContent();
  //   if (player2.playerType === "machine") {
  //     // console.log(player2.playerType);
  //     if (playerTurn > 0 && playerTurn % 2 === 0) {
  //       // clearMessage();
  //       // addMessage(player1Attack);
  //     }
  //     if (playerTurn > 0 && playerTurn % 2 !== 0) {
  //       clearMessage();

  //       let { randomRow, randomCol } = getUniqueRandomCoordinates();
  //       let hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
  //       // setTimeout(() => {
  //       // hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
  //       // }, 500);
  //       addMessage(
  //         `${player2ComputerAttack} and it is a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}).`
  //       );
  //       // console.log(
  //       //   `Last attack by P2 was a ${hitOrMiss} at (${randomRow}, ${randomCol})`
  //       // );

  //       //console.log(testGame1.receiveAttack(randomRow, randomCol));
  //       // console.log(`Turn before P2 = ${playerTurn}`);
  //       playerTurn += 1;
  //       // console.log(`Turn after P2 = ${playerTurn}`);
  //       mp3Fire();
  //       // console.log(randomRow, randomCol);
  //       // START HERE ON THURSDAY...

  //       // testGame1.receiveAttack(randomRow, randomCol);
  //       addEmojiEffect(player1.playerBoard.board, 1);
  //       colorSunkShips(testGame1, 1);
  //       highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
  //       // console.table(player1.playerBoard.board);
  //     }
  //   }
  // }

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

  manuallySelectShipPlacementCoordinates(1);
  manuallySelectShipPlacementCoordinates(2);

  // console.table(player1.playerBoard.board);
  // console.table(player2.playerBoard.board);
  // }
});
