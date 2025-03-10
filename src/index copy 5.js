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
  // clearColorSunkShips,
  // clearEmojiEffect,
  clearMessage,
  colorSunkShips,
  getRandomAxis,
  getRandomCol,
  getRandomRow,
  // getUniqueEnhancedCoordinates,
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
  stopGameThereIsAWinner,
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
  // let placedShipListArr1 = [];
  // let placedShipListArr2 = [];
  const placedShipListSet1 = new Set();
  const placedShipListSet2 = new Set();
  const placedShipListArr1 = Array.from(placedShipListSet1);
  const placedShipListArr2 = Array.from(placedShipListSet2);

  let isPvsPStarted = false;
  let playerTurn = 0;
  let hitOrMiss;
  let randomRowStored;
  let randomColStored;
  let lastPlayer2ComputerPriorAttack;
  const currentSetTimeoutValue = 3200;
  // const currentSetTimeoutValue = 0;

  // Helpers that aid with boardNum parameters in later functions
  const player = { 1: player1, 2: player2 };
  const testGame = { 1: testGame1, 2: testGame2 };
 
  const placedShipListSet = { 1: placedShipListSet1, 2: placedShipListSet2 };
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

  function setUpPassDeviceBtnEventListener(boardNum) {
    const { btnPassDevice, btnUnlockDevice } = getBtnElements();
    const {
      p1FullBoard,
      p1PlaceShips,
      p1DeploymentZone,
      p1TargetZone,
      p2FullBoard,
      p2PlaceShips,
      p2DeploymentZone,
      p2TargetZone,
    } = getBoardElements();

    btnPassDevice.addEventListener("click", () => {
      mp3Click();
      btnPassDevice.style.display = "none";
      btnUnlockDevice.style.display = "flex";
      // Clicking means you accept ship placements...it also switches btn to say Unlock Device
      if (
        p1FullBoard.style.display === "flex" &&
        placedShipListArr1.length !== 5
      ) {
        p1FullBoard.style.display = "none";
        p1PlaceShips.style.display = "none";
        // Add a function call here, player 1 has effectively approved their ship placements for the match.
      }
      if (
        p2FullBoard.style.display === "flex" &&
        placedShipListArr2.length !== 5
      ) {
        p2FullBoard.style.display = "none";
        p2PlaceShips.style.display = "none";
        // Add a function call here, player 2 has effectively approved their ship placements for the match. THE MATCH IS NOW READY TO BEGIN AFTER THE DEVICE IS PASSED AND UNLOCKED...
      }
    });
  }

  // forPvsPMatchesShowPassDeviceBtn()
  function setUpUnlockDeviceBtnEventListener(boardNum) {
    const { btnPassDevice, btnUnlockDevice } = getBtnElements();
    const {
      p1FullBoard,
      p1PlaceShips,
      p1DeploymentZone,
      p1TargetZone,
      p2FullBoard,
      p2PlaceShips,
      p2DeploymentZone,
      p2TargetZone,
    } = getBoardElements();

    btnUnlockDevice.addEventListener("click", () => {
      mp3Click();
      // btnPassDevice.style.display = "flex"; // Delete this.
      btnUnlockDevice.style.display = "none";
      // Now in to unlocking the device and letting player2 place ships.
      if (p2PlaceShips.style.display !== "none" && placedShipListArr2 !== 5) {
        p2FullBoard.style.display = "flex";
      }
      // START PvsP GAME
      if (playerTurn === 0 && p2FullBoard.style.display === "none") {
        p1FullBoard.style.display = "flex";
        p1TargetZone.style.display = "flex";
        // forPvsPMatchesBeginActualPlayByTurns();
      }
      // if (playerTurn === 0 && placedShipListArr1 === 5 && placedShipListArr2 === 5) {
      //     p1FullBoard.style.display = "flex";
      //     p1TargetZone.style.display = "flex";
      // }
      if (isPvsPStarted && playerTurn > 0 && playerTurn % 2 !== 0) {
        p2FullBoard.style.display = "flex";
        p2TargetZone.style.display = "flex";
        p1FullBoard.style.display === "none";
      }
      if (isPvsPStarted && playerTurn > 0 && playerTurn % 2 === 0) {
        p1FullBoard.style.display = "flex";
        p1TargetZone.style.display = "flex";
        p2FullBoard.style.display === "none";
      }
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
    const { btnClear, btnStartGame, btnPassDevice, btnUnlockDevice } =
      getBtnElements(boardNum);
    btnClear.addEventListener("click", () => {
      mp3Click();
      handleBtnClearAllShips(boardNum);
      // placedShipListArr[boardNum] = []; // Just found out, not working as planned....needs to be a SET!!!!
      // forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn(boardNum);
      // forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn();
      // forPvsPMatchesShowPassDeviceBtn();
      btnStartGame.style.display = "none";
      btnPassDevice.style.display = "none";
      btnUnlockDevice.style.display = "none";
      testGame[boardNum].removeAllShips();
      // placedShipListSet1 = [];
      // placedShipListArr2 = [];
      placedShipListSet1.clear();
      placedShipListSet2.clear();
      console.log(placedShipListArr1);
      console.log(placedShipListArr2);
    });
  }

  // TODO - set up Undo Btn

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
            // placedShipListArr[boardNum].push(ship.boardCode);
            placedShipListSet[boardNum].add(ship.boardCode);
            console.log(`random btn click input = ${placedShipListArr[boardNum]}`);
            console.log(placedShipListSet[boardNum]);
            
            place.style.display = "none"; // Hide the place once the ship is placed
          }
        }
      });

      // forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn(boardNum);
      forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn();
      forPvsPMatchesShowPassDeviceBtn();
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
              // placedShipListArr[boardNum].push(ship.boardCode);
              // placedShipListArr[boardNum].push(ship.boardCode);
              placedShipListSet[boardNum].add(ship.boardCode);
              // forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn(boardNum);
              forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn();
              forPvsPMatchesShowPassDeviceBtn();
              // if (debug) {
              console.log(testGame[boardNum].allShipsArePlaced());
              console.log(player[boardNum].playerBoard.board);
              // console.log(placedShipListArr[boardNum]);
              console.log(placedShipListSet[boardNum]);
              // }
            }
          }
        }
      });
    });
  }

  // PHASE 2 - Now that the ships are placed
  // Two different tracks here: 1) PvsC, 2) PvsP

  function forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn() {
    // boardNum
    const { btnStartGame, p2BtnRandom } = getBtnElements();
    const { p1PlaceShips, p1TargetZone } = getBoardElements();
    const { startMatchPvsC } = handleMessageContent();
    if (
      player2.playerType === "machine" &&
      // placedShipListArr1.length === 5 &&
      placedShipListSet1.size === 5 &&     
      p1TargetZone.style.display !== "flex"
    ) {
      console.log(player2.playerType);
      // console.log(`Arr1 = ${placedShipListArr1}`);
      console.log(placedShipListSet1.size);

      btnStartGame.style.display = "flex";
      p2BtnRandom.click();
      addMessage(startMatchPvsC);
    } else {
      btnStartGame.style.display = "none";
    }
  }

  function forPvsPMatchesShowPassDeviceBtn() {
    const { btnStartGame, btnPassDevice } = getBtnElements();
    const {
      p1FullBoard,
      p1PlaceShips,
      p1TargetZone,
      p2FullBoard,
      p2PlaceShips,
      p2TargetZone,
    } = getBoardElements();
    // const { startMatchPvsC } = handleMessageContent();
    if (
      player2.playerType === "human" &&
      isPvsPStarted === false &&
      placedShipListSet1.size === 5 &&
      p1TargetZone.style.display !== "flex"
    ) {
      console.log(player2.playerType);
      // btnStartGame.style.display = "none";
      btnPassDevice.style.display = "flex";
      // btnPassDevice.innerText = "Pass device to PLAYER 2"
      // addMessage(startMatchPvsC);
    } else if (
      player2.playerType === "human" &&
      isPvsPStarted === false &&
      placedShipListSet2.size === 5 &&
      p2TargetZone.style.display !== "flex"
    ) {
      console.log(player2.playerType);
      // btnStartGame.style.display = "none";
      btnPassDevice.style.display = "flex";
      // addMessage(startMatchPvsC);
    } else if (
      player2.playerType === "human" &&
      isPvsPStarted === true &&
      placedShipListSet1.size === 5 &&
      p1PlaceShips.style.display !== "flex" &&
      playerTurn % 2 !== 0
    ) {
      btnPassDevice.style.display = "flex";
    } else if (
      player2.playerType === "human" &&
      isPvsPStarted === true &&
      placedShipListSet2.size === 5 &&
      p2PlaceShips.style.display !== "flex" &&
      playerTurn % 2 === 0
    ) {
      btnPassDevice.style.display = "flex";
    } else {
      // btnStartGame.style.display = "none";
      btnPassDevice.style.display = "none";
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

    const { p1FullBoard, p2FullBoard } = getBoardElements();
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

        if (player2.playerType === "human") {
          isPvsPStarted = true;
          console.log(`humanA: ${isPvsPStarted}`);
        } else {
          isPvsPStarted = false;
          console.log(`humanB: ${isPvsPStarted}`);
        }
        if (
          matches &&
          cell.innerText === "" &&
          playerTurn % 2 === 0 &&
          p1FullBoard.style.display === "flex"
        ) {
          // const { player1Attack } = handleMessageContent();

          row = +matches[1]; // Reminder, +matches converts the string to a number
          col = +matches[2]; // Same as above
          // console.log(`Coordinates clicked: ${row}, ${col}`);
          // console.log(typeof row === "number");
          // console.log(testGame[boardNum].receiveAttack(row, col));
          testGame[boardNum].receiveAttack(row, col);


          mp3Fire();
          addEmojiEffect(board, boardNum);
          colorSunkShips(testGame[boardNum], boardNum);
          // Highlight the board again
          highlightEmptyCellOnlyOnHover(board, boardNum);
          stopGameThereIsAWinner(1);
          stopGameThereIsAWinner(2);
          // console.log(`Turn before P! = ${playerTurn}`);
          playerTurn += 1;
          console.log(
            `Attack on testGame${boardNum} by P1, Turn flips to: ${playerTurn}`
          );
          player2ComputerAttack();
          forPvsPMatchesShowPassDeviceBtn();
          clearMessage();
          if (player2.playerType === "machine") {
            addMessage(
            `PLAYER 1 attacks coordinates (${row}, ${col}). Wait for PLAYER 2's counterattack.`
          );
          } else {
            addMessage(
            `PLAYER 1 attacks coordinates (${row}, ${col}). Use PASS DEVICE BUTTON and pass device to PLAYER 2.`
          );
          }
        } 
        if (
          matches &&
          cell.innerText === "" &&
          player2.playerType === "human" &&
          playerTurn % 2 !== 0 && 
          p2FullBoard.style.display === "flex"
        ) {
          // const { player1Attack } = handleMessageContent();

          row = +matches[1]; // Reminder, +matches converts the string to a number
          col = +matches[2]; // Same as above
          // console.log(`Coordinates clicked: ${row}, ${col}`);
          // console.log(typeof row === "number");
          // console.log(testGame[boardNum].receiveAttack(row, col));
          testGame[boardNum].receiveAttack(row, col);

          // clearMessage();
          // // TODO - add below to handleMessageContent
          // addMessage(
          //   `PLAYER 2 attacks coordinates (${row}, ${col}). Wait for PLAYER 1's counterattack.`
          // );
          mp3Fire();
          addEmojiEffect(board, boardNum);
          colorSunkShips(testGame[boardNum], boardNum);
          // Highlight the board again
          highlightEmptyCellOnlyOnHover(board, boardNum);
          // stopGameThereIsAWinner(1);
          stopGameThereIsAWinner(2);
          // console.log(`Turn before P! = ${playerTurn}`);
          playerTurn += 1;
          console.log(
            `Attack on testGame${boardNum} by P2, Turn flips to: ${playerTurn}`
          );
          // player2ComputerAttack();
          forPvsPMatchesShowPassDeviceBtn();
          clearMessage();
          if (player2.playerType === "human") {
            addMessage(
              `PLAYER 2 attacks coordinates (${row}, ${col}). Use PASS DEVICE BUTTON and pass device to PLAYER 1.`
            );
          } 
        }
      });
    });
  }

  function player2ComputerAttack() {
    if (player2.playerType === "machine" && playerTurn % 2 !== 0) {
      setTimeout(() => {
        clearMessage();
        let { randomRow, randomCol } = getUniqueRandomCoordinates(
          hitOrMiss,
          randomRowStored,
          randomColStored,
          lastPlayer2ComputerPriorAttack
        );
        hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
        // TODO - fix below later in handleMessageContent
        addMessage(
          `PLAYER 2 attacked! It's a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}). PLAYER 1's turn.`
        );
        playerTurn += 1;
        console.log(`Attack on testGame1 by P2, Turn flips to: ${playerTurn}`);
        mp3Fire();
        addEmojiEffect(player1.playerBoard.board, 1);
        colorSunkShips(testGame1, 1);
        highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
        stopGameThereIsAWinner();

        if (hitOrMiss === "hit") {
          console.log("This attack was a hit!");
          randomRowStored = randomRow;
          randomColStored = randomCol;
          stopGameThereIsAWinner();
        } else {
          console.log("That attack missed...");
          stopGameThereIsAWinner();
        }
      }, currentSetTimeoutValue);
    }
  }

  // function forPvsPTakeTurnsAttacking() {
  //   if (playerTurn % 2 === 0 && placedShipListSet1.size === 5) {
  //     manuallyAttackTargetCoordinates(1);
  //   } else if (
  //     player2.playerType === "human" &&
  //     playerTurn % 2 !== 0 &&
  //     placedShipListSet1.size === 5
  //   ) {
  //     manuallyAttackTargetCoordinates(2);
  //   } else {
  //   }
  //   return manuallyAttackTargetCoordinates(1);
  // } 


  
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

        //TODO - DELETE WHEN DONE - below is for testing purposes
        // p2PlaceShips.style.display = "none";
        // p2TargetZone.style.display = "flex";

        addMessage(player1Attack);
      });
    }
  }

  // function forPvsPMatchesBeginActualPlayByTurns() {
  //   const { btnPassDevice, btnUnlockDevice } = getBtnElements();
  //   const {
  //     p1FullBoard,
  //     p1PlaceShips,
  //     p1DeploymentZone,
  //     p1TargetZone,
  //     p2FullBoard,
  //     p2PlaceShips,
  //     p2DeploymentZone,
  //     p2TargetZone,
  //   } = getBoardElements();

  //   if (p1FullBoard.style.display === "flex" && playerTurn % 2 !== 0) {
  //     btnPassDevice.style.display = "flex";
  //   } else {
  //     btnPassDevice.style.display = "none";
  //     btnUnlockDevice.style.display = "none";
  //   }
  // }

  forPvsCMatchesBeginActualGameWithStartBtn();

  setUpPlayerNumBtnEventListeners();
  // setUpQuitBtnEventListener(1);
  // setUpQuitBtnEventListener(2);
  // TODO - maybe - change this to above if I decide to dive in and improve the function.
  setUpQuitBtnEventListener();
  setUpPassDeviceBtnEventListener();
  setUpUnlockDeviceBtnEventListener();

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
