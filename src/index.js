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
  // handleBtnQuitGame,
} from "./js/functionsBtns.js";
import {
  addEmojiEffect,
  addMessage,
  // checkForSunkFleet,
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
  mp3PlacePop,
  mp3RemovePop,
  mp3Fire,
  mp3Hit,
  mp3Miss,
  mp3Sink,
  orientShipSvgOnShipGrid,
  // removeAllShipSvgsOnShipGrid,
  removeSingleShipSvgOnShipGrid,
  // stopGameThereIsAWinner,
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
  const player2 = new Player(2, "computer", testGame2);

  // Helper array that tracks if all ships have been placed
  let placedShipListArr1 = [];
  let placedShipListArr2 = [];
  const placedShipListSet1 = new Set();
  const placedShipListSet2 = new Set();

  let isPvsPStarted = false;
  let playerTurn = 0;
  let hitOrMiss;
  let randomRowStored;
  let randomColStored;
  let lastPlayer2ComputerPriorAttack;
  const currentSetTimeoutValue = 2000;
  let stopGameHaveWinner = false;
  let player1IsVictorious = false;
  let player2IsVictorious = false;

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
    const { messages } = getMessageElements();
    const {
      mainBtnContainer,
      btnPvsC,
      btnPvsP,
      btnQuitGame,
      btnStartGame,
      btnHideScreen,
      btnUnlockScreen,
    } = getBtnElements();
    const { p1FullBoard, p2FullBoard } = getBoardElements();

    gifContainer.style.display = "flex";
    messages.style.display = "none";
    mainBtnContainer.style.flexDirection = "column";
    btnPvsC.style.display = "flex";
    btnPvsP.style.display = "flex";
    btnQuitGame.style.display = "none";
    btnStartGame.style.display = "none";
    btnHideScreen.style.display = "none";
    btnUnlockScreen.style.display = "none";
    p1FullBoard.style.display = "none";
    p2FullBoard.style.display = "none";
  }

  // Set up btn eventListeners that handle the number of players
  function setupPlayerNumBtnEventListeners() {
    const { header, gifContainer } = getHeaderElements();
    const { messages } = getMessageElements();
    const { mainBtnContainer, btnPvsC, btnPvsP, btnQuitGame } =
      getBtnElements();
    const { p1FullBoard, p2FullBoard } = getBoardElements();
    const { player1DeployShipsMsg } = handleMessageContent();

    btnPvsC.addEventListener("click", () => {
      mp3Click();
      header.style.display = "none";
      messages.style.display = "flex";
      mainBtnContainer.style.flexDirection = "row";
      btnPvsC.style.display = "none";
      btnPvsP.style.display = "none";
      btnQuitGame.style.display = "flex";
      p1FullBoard.style.display = "flex";
      p2FullBoard.style.display = "none";

      clearMessage();
      addMessage(player1DeployShipsMsg);
      player2.playerType = "computer";
    });

    btnPvsP.addEventListener("click", () => {
      mp3Click();
      header.style.display = "none";
      messages.style.display = "flex";
      mainBtnContainer.style.flexDirection = "row";
      btnPvsC.style.display = "none";
      btnPvsP.style.display = "none";
      btnQuitGame.style.display = "flex";
      p1FullBoard.style.display = "flex";
      p2FullBoard.style.display = "none";
      player2.playerType = "human";
      clearMessage();
      addMessage(player1DeployShipsMsg);
    });
  }

  splashScreenStart();

  // Set up btn eventListener to quit the game
  // TODO - come back and properly implement this, do not rely on location.reload()
  function setupQuitBtnEventListener(boardNum) {
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

  function setupHideScreenBtnEventListener(boardNum) {
    const { btnHideScreen, btnUnlockScreen } = getBtnElements();
    const { p1FullBoard, p1PlaceShips, p2FullBoard, p2PlaceShips } =
      getBoardElements();
    const { player1UnlockScreen, player2UnlockScreen } = handleMessageContent();

    btnHideScreen.addEventListener("click", () => {
      mp3Click();
      btnHideScreen.style.display = "none";
      btnUnlockScreen.style.display = "flex";
      if (
        player2.playerType === "human" &&
        !isPvsPStarted &&
        p1FullBoard.style.display === "flex" &&
        placedShipListSet1.size === 5
      ) {
        p1FullBoard.style.display = "none";
        p1PlaceShips.style.display = "none";
        clearMessage();
        addMessage(player2UnlockScreen);
      }
      if (
        player2.playerType === "human" &&
        !isPvsPStarted &&
        p2FullBoard.style.display === "flex" &&
        placedShipListSet2.size === 5
      ) {
        p2FullBoard.style.display = "none";
        p2PlaceShips.style.display = "none";
        clearMessage();
        addMessage(player1UnlockScreen);
      }
      if (
        player2.playerType === "human" &&
        isPvsPStarted &&
        p1FullBoard.style.display === "flex" &&
        placedShipListSet1.size === 5
      ) {
        p1FullBoard.style.display = "none";
        clearMessage();
        addMessage(player2UnlockScreen);
      }
      if (
        player2.playerType === "human" &&
        isPvsPStarted &&
        p2FullBoard.style.display === "flex" &&
        placedShipListSet2.size === 5
      ) {
        p2FullBoard.style.display = "none";
        clearMessage();
        addMessage(player1UnlockScreen);
      }
    });
  }

  function setupUnlockScreenBtnEventListener(boardNum) {
    const { btnUnlockScreen } = getBtnElements();
    const {
      p1FullBoard,
      p1TargetZone,
      p2FullBoard,
      p2PlaceShips,
      p2TargetZone,
    } = getBoardElements();
    const {
      player2DeployShipsMsg,
      player1ClickCellToAttack,
      player2ClickCellToAttack,
    } = handleMessageContent();

    btnUnlockScreen.addEventListener("click", () => {
      mp3Click();
      btnUnlockScreen.style.display = "none";
      // Player 1 has clicked ACCEPT DEPLOYMENT, now to unhide player 2 so they can place ships
      if (
        player2.playerType === "human" &&
        !isPvsPStarted &&
        p2FullBoard.style.display !== "flex" &&
        placedShipListSet2.size !== 5
      ) {
        p2FullBoard.style.display = "flex";
        clearMessage();
        addMessage(player2DeployShipsMsg);
      }
      // START PvsP GAME
      if (
        player2.playerType === "human" &&
        !isPvsPStarted &&
        playerTurn === 0 &&
        p1FullBoard.style.display !== "flex" &&
        placedShipListSet2.size === 5
      ) {
        p1FullBoard.style.display = "flex";
        p1TargetZone.style.display = "flex"; // PULLS UP NEEDED TARGET ZONE
        clearMessage();
        addMessage(player1ClickCellToAttack);
      }
      if (
        player2.playerType === "human" &&
        isPvsPStarted &&
        playerTurn > 0 &&
        playerTurn % 2 !== 0 &&
        p2FullBoard.style.display !== "flex"
      ) {
        p2FullBoard.style.display = "flex";
        p2TargetZone.style.display = "flex"; // PULLS UP NEEDED TARGET ZONE
        p1FullBoard.style.display = "none";
        clearMessage();
        addMessage(player2ClickCellToAttack);
      }
      if (
        player2.playerType === "human" &&
        isPvsPStarted &&
        playerTurn > 0 &&
        playerTurn % 2 === 0 &&
        p1FullBoard.style.display !== "flex"
      ) {
        p1FullBoard.style.display = "flex";
        p1TargetZone.style.display = "flex";
        p2FullBoard.style.display = "none";
        clearMessage();
        addMessage(player1ClickCellToAttack);
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

  function setupUndoBtnEventListener(boardNum) {
    const { btnStartGame, btnHideScreen, btnUndo } = getBtnElements(boardNum);

    btnUndo.addEventListener("click", () => {
      mp3Click();
      btnStartGame.style.display = "none";
      btnHideScreen.style.display = "none";
      if (placedShipListSet[boardNum].size === 0) {
        console.log("Nothing to undo.");
        return;
      } else {
        placedShipListArr1 = Array.from(placedShipListSet1);
        placedShipListArr2 = Array.from(placedShipListSet2);

        console.log(`Arr1 = ${placedShipListArr1}`);
        console.log(`Arr2 = ${placedShipListArr2}`);

        let lastShip;
        if (boardNum === 1) {
          lastShip = placedShipListArr1[placedShipListArr1.length - 1];
        } else if (boardNum === 2) {
          lastShip = placedShipListArr2[placedShipListArr2.length - 1];
        }

        testGame[boardNum].removeShip(lastShip);
        console.log(`lastShip = ${lastShip}`);
        placedShipListSet[boardNum].delete(lastShip);
        removeSingleShipSvgOnShipGrid(boardNum, lastShip);

        console.log(placedShipListSet1);
        console.log(placedShipListSet2);

        console.log(testGame1);
        console.log(testGame2);
      }
    });
  }

  setupUndoBtnEventListener(1);
  setupUndoBtnEventListener(2);

  // Set up btn eventListener that handles clearing placed ships on the gameboard
  function setupClearBtnEventListener(boardNum) {
    const { btnClear, btnStartGame, btnHideScreen, btnUnlockScreen } =
      getBtnElements(boardNum);
    const { player1DeployShipsMsg, player2DeployShipsMsg } =
      handleMessageContent();
    const { p1FullBoard, p2FullBoard } = getBoardElements();
    btnClear.addEventListener("click", () => {
      mp3Click();

      handleBtnClearAllShips(boardNum);
      btnStartGame.style.display = "none";
      btnHideScreen.style.display = "none";
      btnUnlockScreen.style.display = "none";
      testGame[boardNum].removeAllShips();
      placedShipListArr1 = [];
      placedShipListArr2 = [];
      placedShipListSet1.clear();
      placedShipListSet2.clear();

      if (placedShipListSet[boardNum] === 0) {
        mp3RemovePop();
      }

      clearMessage();
      if (p1FullBoard.style.display === "flex") {
        addMessage(player1DeployShipsMsg);
      } else if (p2FullBoard.style.display === "flex") {
        addMessage(player2DeployShipsMsg);
      }
    });
  }

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
          mp3PlacePop();
          if (result !== "invalid") {
            orientShipSvgOnShipGrid(
              boardNum,
              ship.boardCode,
              randomAxis,
              randomRow,
              randomCol
            );
            placedShipListSet[boardNum].add(ship.boardCode);
            console.log(
              `random btn click input = ${placedShipListSet[boardNum]}`
            );
            console.log(placedShipListSet[boardNum]);

            place.style.display = "none"; // Hide the ship once the ship is placed
          }
        }
      });

      forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn();
      forPvsPMatchesShowHideScreenBtn();
      console.log(`All player ${boardNum} ships are placed`);
      console.log(testGame1);
      console.log(testGame2);
    });
  }

  // For any highlighted ship, select the cell location where you want to place the beginning of that ship on the game grid
  function manuallySelectShipPlacementCoordinates(boardNum) {
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
              mp3PlacePop();
              shipPlaces[getDataShip].style.display = "none";
              shipPlaces[getDataShip].dataset.selected = "";
              placedShipListSet[boardNum].add(ship.boardCode);
              forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn();
              forPvsPMatchesShowHideScreenBtn();
              // if (debug) {
              console.log(testGame[boardNum].allShipsArePlaced());
              console.log(player[boardNum].playerBoard.board);
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
    const { btnStartGame, p2BtnRandom } = getBtnElements();
    const { p1PlaceShips, p1TargetZone } = getBoardElements();
    const { clickStartGameInPvsC } = handleMessageContent();
    if (
      player2.playerType === "computer" &&
      placedShipListSet1.size === 5 &&
      // placedShipListArr1.length === 5 &&
      p1TargetZone.style.display !== "flex"
    ) {
      console.log(player2.playerType);
      console.log(placedShipListSet1.size);

      btnStartGame.style.display = "flex";
      p2BtnRandom.click();
      clearMessage();
      addMessage(clickStartGameInPvsC);
    } else {
      btnStartGame.style.display = "none";
    }
  }

  function forPvsPMatchesShowHideScreenBtn() {
    const { btnHideScreen } = getBtnElements();
    const { p1FullBoard, p2FullBoard } = getBoardElements();

    if (
      player2.playerType === "human" &&
      !isPvsPStarted &&
      placedShipListSet1.size === 5 &&
      placedShipListSet2.size !== 5 &&
      p2FullBoard.style.display !== "flex"
    ) {
      console.log(player2.playerType);
      btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player1)";
      btnHideScreen.style.borderColor = "var(--player1-text)";
      btnHideScreen.style.color = "var(--enemy)";
      // btnHideScreen.innerText = "Accept Deployment";
      btnHideScreen.innerText = "Accept";
    } else if (
      player2.playerType === "human" &&
      !isPvsPStarted &&
      placedShipListSet2.size === 5 &&
      p1FullBoard.style.display !== "flex"
    ) {
      console.log(player2.playerType);
      btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player2)";
      btnHideScreen.style.borderColor = "var(--player2-text)";
      btnHideScreen.style.color = "var(--enemy)";
      // btnHideScreen.innerText = "Accept Deployment";
      btnHideScreen.innerText = "Accept";
    } else if (
      player2.playerType === "human" &&
      isPvsPStarted &&
      p2FullBoard.style.display !== "flex" &&
      playerTurn % 2 !== 0
    ) {
      btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player2)";
      btnHideScreen.style.borderColor = "var(--player2-text)";
      btnHideScreen.style.color = "var(--enemy)";
      // btnHideScreen.innerText = "Switch to PLAYER 2";
      btnHideScreen.innerText = "Switch";
    } else if (
      player2.playerType === "human" &&
      isPvsPStarted &&
      p1FullBoard.style.display !== "flex" &&
      playerTurn % 2 === 0
    ) {
      btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player1)";
      btnHideScreen.style.borderColor = "var(--player1-text)";
      btnHideScreen.style.color = "var(--enemy)";
      // btnHideScreen.innerText = "Switch to PLAYER 1";
      btnHideScreen.innerText = "Switch";
    } else {
      btnHideScreen.style.display = "none";
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
    const { player1Wins, player2Wins } = handleMessageContent();
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
          hitOrMiss = testGame[boardNum].receiveAttack(row, col);

          mp3Fire();
          addEmojiEffect(board, boardNum);
          colorSunkShips(testGame[boardNum], boardNum);
          checkForSunkFleet(testGame[boardNum], boardNum);
          // Highlight the board again
          highlightEmptyCellOnlyOnHover(board, boardNum);

          // console.log(`Turn before P! = ${playerTurn}`);
          playerTurn += 1;
          console.log(
            `Attack on testGame${boardNum} by P1, Turn flips to: ${playerTurn}`
          );
          player2ComputerAttack();
          forPvsPMatchesShowHideScreenBtn();
          clearMessage();
          if (player2.playerType === "computer") {
            // addMessage(
            //   `PLAYER 1 attacks. It's a ${hitOrMiss} at coordinates (${row}, ${col}). Wait for PLAYER 2's counterattack.`
            // );
            addMessage(
              `PLAYER 1's attack is a ${hitOrMiss} at coordinates (${row}, ${col}). Wait for PLAYER 2's counterattack.`
            );
            endGame();
          } else {
            // addMessage(
            //   `PLAYER 1 attacks. It's ${hitOrMiss} at coordinates (${row}, ${col}). SWITCH to PLAYER 2 to start the next turn.`
            // );
            // addMessage(
            //   `PLAYER 1 attacks. It's a ${hitOrMiss} at coordinates (${row}, ${col}). SWITCH to PLAYER 2.`
            // );
            addMessage(
              `PLAYER 1's attack is a ${hitOrMiss} at coordinates (${row}, ${col}). SWITCH to PLAYER 2.`
            );
            endGame();
          }
        }
        if (
          !stopGameHaveWinner && 
          matches &&
          cell.innerText === "" &&
          player2.playerType === "human" &&
          playerTurn % 2 !== 0 &&
          p2FullBoard.style.display === "flex"
        ) {
          row = +matches[1]; // Reminder, +matches converts the string to a number
          col = +matches[2]; // Same as above

          hitOrMiss = testGame[boardNum].receiveAttack(row, col);

          mp3Fire();
          addEmojiEffect(board, boardNum);
          colorSunkShips(testGame[boardNum], boardNum);
          checkForSunkFleet(testGame[boardNum], boardNum);
          // Highlight the board again
          highlightEmptyCellOnlyOnHover(board, boardNum);

          playerTurn += 1;
          console.log(
            `Attack on testGame${boardNum} by P2, Turn flips to: ${playerTurn}`
          );
          forPvsPMatchesShowHideScreenBtn();
          clearMessage();
          if (player2.playerType === "human") {
            // addMessage(
            //   `PLAYER 2 attacks. It's a ${hitOrMiss} at coordinates (${row}, ${col}). SWITCH to PLAYER 1.`
            // );
            addMessage(
              `PLAYER 2's attack is a ${hitOrMiss} at coordinates (${row}, ${col}). SWITCH to PLAYER 1.`
            );
            endGame();
          }
        } 
      });
    });
  
  }

  function player2ComputerAttack() {
    if (!stopGameHaveWinner && player2.playerType === "computer" && playerTurn % 2 !== 0) {
      setTimeout(() => {
        clearMessage();
        let { randomRow, randomCol } = getUniqueRandomCoordinates(
          hitOrMiss,
          randomRowStored,
          randomColStored,
          lastPlayer2ComputerPriorAttack
        );
        hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);

        // addMessage(
        //   `PLAYER 2 attacked! It's a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}). PLAYER 1, it is now your turn to attack.`
        // );

        addMessage(
          `PLAYER 2's attack is a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}). PLAYER 1, it's your turn to attack.`
        );
        
        playerTurn += 1;
        console.log(`Attack on testGame1 by P2, Turn flips to: ${playerTurn}`);
        mp3Fire();
        addEmojiEffect(player1.playerBoard.board, 1);
        colorSunkShips(testGame1, 1);
        checkForSunkFleet(testGame1);
        highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
        endGame();
        if (hitOrMiss === "hit") {
          console.log("This attack was a hit!");
          randomRowStored = randomRow;
          randomColStored = randomCol;
        } else {
          console.log("That attack missed...");
        }
      }, currentSetTimeoutValue);
    }
  }

  manuallyAttackTargetCoordinates(1);
  manuallyAttackTargetCoordinates(2);

  // PHASE 3 - MATCH MECHANICS - PLAYER VS MACHINE
  function forPvsCMatchesBeginActualGameWithStartBtn() {
    const { btnStartGame } = getBtnElements();
    const { p1PlaceShips, p1TargetZone, p2PlaceShips, p2TargetZone } =
      getBoardElements();
    const { player1ClickCellToAttack } = handleMessageContent();

    if (player2.playerType === "computer") {
      btnStartGame.addEventListener("click", () => {
        mp3Click();
        p1PlaceShips.style.display = "none";
        p1TargetZone.style.display = "flex";
        btnStartGame.style.display = "none";

        //TODO - DELETE WHEN DONE - below is for testing purposes
        // p2PlaceShips.style.display = "none";
        // p2TargetZone.style.display = "flex";
        clearMessage();
        addMessage(player1ClickCellToAttack);
      });
    }
  }

  // function forPvsPMatchesBeginActualPlayByTurns() {
  //   const { btnHideScreen, btnUnlockScreen } = getBtnElements();
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
  //     btnHideScreen.style.display = "flex";
  //   } else {
  //     btnHideScreen.style.display = "none";
  //     btnUnlockScreen.style.display = "none";
  //   }
  // }

  function checkForSunkFleet(board) {
    if (board.ships.every((ship) => ship.isSunk())) {
      mp3Sink();
      stopGameHaveWinner = true; // When all ships are sunk...
      console.log(`!!!!stopGameHaveWinner indicates ${stopGameHaveWinner}`);
      if (board === testGame1) {
        player2IsVictorious = true
      } else if (board === testGame2) {
        player1IsVictorious = true
      }
      console.log(`Player 1 WINS  = ${player1IsVictorious}`);
            console.log(`Player 2 WINS  = ${player2IsVictorious}`);
    }
  }

  function endGame() {   
    const { messages } = getMessageElements();
    const { player1Wins, player2Wins } = handleMessageContent();

    if (player1IsVictorious) {
      clearMessage();
       addMessage(player1Wins);
       messages.style.backgroundColor = "var(--player1)";
       messages.style.borderColor = "var(--player1-text)";
       messages.style.color = "var(--enemy)";
    } else if (player2IsVictorious) {
      clearMessage();
      addMessage(player2Wins);
      messages.style.backgroundColor = "var(--player2)";
      messages.style.borderColor = "var(--player1-text)";
      messages.style.color = "var(--enemy)";
    }

  }



  // function winnerGetsAModal(board) {
  //   if (stopGameHaveWinner) {
  //     openModal();
  //   }
  // }

  //   //NEW CODE OF USING A CUSTOM MODAL

  // function openModal() {
  //   const modal = document.querySelector("custom-modal");
  //   modal.style.display = "block";

  //   const modalCloseBtn = document.querySelector("#modal-close-btn");
  //   modalCloseBtn.addEventListener("click", closeModal);
  // }

  // function closeModal() {
  //   const modal = document.querySelector("custom-modal");
  //   modal.style.display = "none";
  //   location.reload();
  //   return false;
  // }

  // winnerGetsAModal();


  forPvsCMatchesBeginActualGameWithStartBtn();

  setupPlayerNumBtnEventListeners();
  // setupQuitBtnEventListener(1);
  // setupQuitBtnEventListener(2);
  // TODO - maybe - change this to above if I decide to dive in and improve the function.
  setupQuitBtnEventListener();
  setupHideScreenBtnEventListener();
  setupUnlockScreenBtnEventListener();

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

  console.log(`!!!!stopGameHaveWinner indicates ${stopGameHaveWinner}`);
  // endGame();
});
