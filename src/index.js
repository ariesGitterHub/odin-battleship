import "./styles/styles.css";
import { createHeader } from "./js/createHeader.js";
import gifSailing from "./assets/gifSailing.gif";
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
  handleBtnRotateShips,
} from "./js/functionsBtns.js";
import {
  addEmojiEffect,
  addMessage,
  attackSoundEffects,
  clearMessage,
  colorSunkShips,
  everyOtherColDependingOnRow,
  getRandomAxis,
  getRandomCol,
  getRandomRow,
  handleHighlightPlaceShip,
  handleMessageContent,
  highlightEmptyCellOnlyOnHover,
  highlightPlaceShipsHelper,
  mp3Click,
  mp3PlacePop,
  mp3RemovePop,
  mp3Sink,
  orientShipSvgOnShipGrid,
  removeSingleShipSvgOnShipGrid,
} from "./js/functionsOther.js";
import { Gameboard } from "./js/classGameboard.js";
import { Player } from "./js/classPlayer.js";

document.addEventListener("DOMContentLoaded", () => {
  // Input the number of desired rows and cols here.
  const gridNumRows = 10;
  const gridNumCols = 10;

  // Create the grids
  let seaBoard1 = Array(gridNumRows)
    .fill()
    .map(() => Array(gridNumCols).fill("--"));
  let seaBoard2 = Array(gridNumRows)
    .fill()
    .map(() => Array(gridNumCols).fill("--"));

  // Create instances of the gameboards
  // NOTE: Calling it "testGame" is a holdover from the initial purpose of this code, i.e., to test using jest; Keep the legacy name.
  const testGame1 = new Gameboard(seaBoard1);
  const testGame2 = new Gameboard(seaBoard2);

  // Create instances of the players and their gameboards
  const player1 = new Player(1, "human", testGame1);
  const player2 = new Player(2, "computer", testGame2);

  // Helper arrays/sets that track if all ships have been placed
  let placedShipListArr1 = [];
  let placedShipListArr2 = [];
  const placedShipListSet1 = new Set();
  const placedShipListSet2 = new Set();

  let isPvsPStarted = false;
  let playerTurn = 0;

  const currentSetTimeoutValue = 2300; // Time Delay: used on player2ComputerAttack() to allow sounds to execute more fully and to give player 1 (human) a chance to read message indicating where player 2 (computer) attacked
  // const currentSetTimeoutValue = 0; // No delay - speedier for testing purposes, keep for future testing

  let stopGameHaveWinner = false;
  let player1IsVictorious = false;
  let player2IsVictorious = false;

  // Helpers that aid with boardNum parameters in later functions
  const player = { 1: player1, 2: player2 };
  const testGame = { 1: testGame1, 2: testGame2 };
  const placedShipListSet = { 1: placedShipListSet1, 2: placedShipListSet2 };
  // const placedShipListArr = { 1: placedShipListArr1, 2: placedShipListArr2 };

  // Create UI elements
  createHeader();
  createBoardContainerDivs();
  createMessageElements();
  createBtnElements();

  // Arrange gameboard content
  displayBoardContent(player1.playerBoard.board, player2.playerBoard.board);

  highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
  highlightEmptyCellOnlyOnHover(player2.playerBoard.board, 2);

  function flexShowIt(elements) {
    // Ensure elements is an array or NodeList
    const elementsArray = Array.isArray(elements)
      ? elements
      : Array.from(elements);
    elementsArray.forEach((element) => {
      element.style.display = "flex";
    });
  }

  function flexHideIt(elements) {
    // Ensure elements is an array or NodeList
    const elementsArray = Array.isArray(elements)
      ? elements
      : Array.from(elements);
    elementsArray.forEach((element) => {
      element.style.display = "none";
    });
  }

  // PHASE 1 - Start with the basic splash screen

  function splashScreenStart() {
    const { header } = getHeaderElements();
    const { mainBtnContainer, btnPvsC, btnPvsP } = getBtnElements();
    flexShowIt([header, btnPvsC, btnPvsP]);
    mainBtnContainer.style.flexDirection = "column";
  }

  splashScreenStart();

  function clickedPlayerNumBtnEffects(playerType) {
    const { header } = getHeaderElements();
    const { messages } = getMessageElements();
    const { mainBtnContainer, btnPvsC, btnPvsP, btnQuitGame } =
      getBtnElements();
    const { p1FullBoard } = getBoardElements();
    const { deployShipsMsg } = handleMessageContent();
    flexHideIt([header, btnPvsC, btnPvsP]);
    flexShowIt([messages, btnQuitGame, p1FullBoard]);
    mainBtnContainer.style.flexDirection = "row";
    if (playerType === "computer") {
      player2.playerType = "computer";
    } else {
      player2.playerType = "human";
    }
    clearMessage();
    addMessage(deployShipsMsg);
  }

  // Set up btn eventListeners that handle the number of players
  function setupPlayerNumBtnEventListeners() {
    const { btnPvsC, btnPvsP } = getBtnElements();
    btnPvsC.addEventListener("click", () => {
      mp3Click();
      clickedPlayerNumBtnEffects("computer");
    });
    btnPvsP.addEventListener("click", () => {
      mp3Click();
      clickedPlayerNumBtnEffects("human");
    });
  }

  // Set up btn eventListener to quit the game
  function setupQuitBtnEventListener(boardNum) {
    const { btnQuitGame } = getBtnElements();
    btnQuitGame.addEventListener("click", () => {
      mp3Click();
      window.location.reload(); // Not proper per se, but it's quick and it works; it also refreshes new deploys nicely
    });
  }

  function adjustMessageHeightOnUnlockScreenAtCertainViewWidths() {
    const { messages } = getMessageElements();
    const { btnUnlockScreen } = getBtnElements();
    if (btnUnlockScreen.style.display === "flex") {
      messages.style.height = "fit-content";
    } else {
      messages.style.height = "var-(height-message)";
    }
  }

  function setupHideScreenBtnEventListener(boardNum) {
    const { battleshipGif, header } = getHeaderElements();
    // const { messages } = getMessageElements();
    const { btnHideScreen, btnUnlockScreen } = getBtnElements();
    const {
      appContainer,
      p1FullBoard,
      p1PlaceShips,
      p2FullBoard,
      p2PlaceShips,
    } = getBoardElements();
    const { player1UnlockScreen, player2UnlockScreen } = handleMessageContent();
    btnHideScreen.addEventListener("click", () => {
      mp3Click();
      flexHideIt([btnHideScreen]);
      flexShowIt([btnUnlockScreen]);
      battleshipGif.src = gifSailing;
      if (
        player2.playerType === "human" &&
        !isPvsPStarted &&
        p1FullBoard.style.display === "flex" &&
        placedShipListSet1.size === 5
      ) {
        appContainer.style.background = "var(--background-player2)";
        flexHideIt([p1FullBoard, p1PlaceShips]);
        flexShowIt([header]);
        clearMessage();
        addMessage(player2UnlockScreen);
        adjustMessageHeightOnUnlockScreenAtCertainViewWidths();
      }
      if (
        player2.playerType === "human" &&
        !isPvsPStarted &&
        p2FullBoard.style.display === "flex" &&
        placedShipListSet2.size === 5
      ) {
        appContainer.style.background = "var(--background-player1)";
        flexHideIt([p2FullBoard, p2PlaceShips]);
        flexShowIt([header]);
        clearMessage();
        addMessage(player1UnlockScreen);
        adjustMessageHeightOnUnlockScreenAtCertainViewWidths();
      }
      if (
        player2.playerType === "human" &&
        isPvsPStarted &&
        p1FullBoard.style.display === "flex" &&
        placedShipListSet1.size === 5
      ) {
        appContainer.style.background = "var(--background-player2)";
        flexHideIt([p1FullBoard]);
        flexShowIt([header]);
        clearMessage();
        addMessage(player2UnlockScreen);
        adjustMessageHeightOnUnlockScreenAtCertainViewWidths();
      }
      if (
        player2.playerType === "human" &&
        isPvsPStarted &&
        p2FullBoard.style.display === "flex" &&
        placedShipListSet2.size === 5
      ) {
        appContainer.style.background = "var(--background-player1)";
        flexHideIt([p2FullBoard]);
        flexShowIt([header]);
        clearMessage();
        addMessage(player1UnlockScreen);
        adjustMessageHeightOnUnlockScreenAtCertainViewWidths();
      }
    });
  }

  // function setupUnlockScreenBtnEventListener(boardNum) {
  function setupUnlockScreenBtnEventListener() {
    const { header } = getHeaderElements();
    const { btnUnlockScreen } = getBtnElements();
    const {
      appContainer,
      p1FullBoard,
      p1TargetZone,
      p2FullBoard,
      p2TargetZone,
    } = getBoardElements();
    const {
      deployShipsMsg,
      player1ClickCellToAttack,
      player2ClickCellToAttack,
    } = handleMessageContent();
    btnUnlockScreen.addEventListener("click", () => {
      mp3Click();
      appContainer.style.background = "var(--background-main)";
      flexHideIt([btnUnlockScreen]);
      // Player 1 has clicked ACCEPT, now to unhide player 2 so they can place ships
      if (
        player2.playerType === "human" &&
        !isPvsPStarted &&
        p2FullBoard.style.display !== "flex" &&
        placedShipListSet2.size !== 5
      ) {
        flexHideIt([header]);
        flexShowIt([p2FullBoard]);
        clearMessage();
        addMessage(deployShipsMsg);
      }
      // START PvsP GAME
      if (
        player2.playerType === "human" &&
        !isPvsPStarted &&
        playerTurn === 0 &&
        p1FullBoard.style.display !== "flex" &&
        placedShipListSet2.size === 5
      ) {
        flexHideIt([header]);
        flexShowIt([p1FullBoard, p1TargetZone]); // PULLS UP NEEDED TARGET ZONE
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
        flexHideIt([header, p1FullBoard]);
        flexShowIt([p2FullBoard, p2TargetZone]); // PULLS UP NEEDED TARGET ZONE
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
        flexHideIt([header, p2FullBoard]);
        flexShowIt([p1FullBoard, p1TargetZone]);
        p1FullBoard.style.display = "flex";
        p1TargetZone.style.display = "flex";
        clearMessage();
        addMessage(player1ClickCellToAttack);
      }
    });
  }

  // This eventListener that handles place ship rotation from h to v/v to h
  function setupRotateBtnEventListener(boardNum) {
    const rotate = handleBtnRotateShips(boardNum);
    const { btnRotate } = getBtnElements(boardNum);
    const { rotateMsg } = handleMessageContent();
    btnRotate.addEventListener("click", () => {
      mp3Click();
      rotate();
      clearMessage();
      addMessage(rotateMsg);
    });
  }

  // This eventListener undoes last ship placement
  function setupUndoBtnEventListener(boardNum) {
    const { btnStartGame, btnHideScreen, btnUndo } = getBtnElements(boardNum);
    const { undoMsg } = handleMessageContent();
    btnUndo.addEventListener("click", () => {
      mp3Click();
      btnStartGame.style.display = "none";
      btnHideScreen.style.display = "none";
      clearMessage();
      addMessage(undoMsg);
      if (placedShipListSet[boardNum].size === 0) {
        return;
      } else {
        placedShipListArr1 = Array.from(placedShipListSet1);
        placedShipListArr2 = Array.from(placedShipListSet2);
        let lastShip;
        if (boardNum === 1) {
          lastShip = placedShipListArr1[placedShipListArr1.length - 1];
        } else if (boardNum === 2) {
          lastShip = placedShipListArr2[placedShipListArr2.length - 1];
        }
        testGame[boardNum].removeShip(lastShip);
        placedShipListSet[boardNum].delete(lastShip);
        removeSingleShipSvgOnShipGrid(boardNum, lastShip);
      }
    });
  }

  setupUndoBtnEventListener(1);
  setupUndoBtnEventListener(2);

  // This eventListener handles clearing placed ships on the gameboard
  function setupClearBtnEventListener(boardNum) {
    const { btnClear, btnStartGame, btnHideScreen, btnUnlockScreen } =
      getBtnElements(boardNum);
    const { deployShipsMsg } = handleMessageContent();
    const { p1FullBoard, p2FullBoard } = getBoardElements();
    btnClear.addEventListener("click", () => {
      mp3Click();
      handleBtnClearAllShips(boardNum);
      flexHideIt([btnStartGame, btnHideScreen, btnUnlockScreen]);
      testGame[boardNum].removeAllShips();
      if (placedShipListSet[boardNum] === 0) {
        mp3RemovePop();
      }
      clearMessage();
      if (p1FullBoard.style.display === "flex") {
        addMessage(deployShipsMsg);
        placedShipListArr1 = [];
        placedShipListSet1.clear();
      } else if (p2FullBoard.style.display === "flex") {
        addMessage(deployShipsMsg);
        placedShipListArr2 = [];
        placedShipListSet2.clear();
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
            place.style.display = "none"; // Hide the ship once the ship is placed
          }
        }
      });
      forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn();
      forPvsPMatchesShowHideScreenBtn();
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
    const shipKeys = ["a", "b", "d", "s", "c"];
    const ships = shipKeys.reduce((accumulator, key, index) => {
      accumulator[key] = testGame[boardNum].ships[index];
      return accumulator;
    }, {});

    // Even shorter version of above, but too abstracted for my liking - keep as reminder/reference
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
              shipPlaces[getDataShip].style.display = "none"; // Leave as is
              shipPlaces[getDataShip].dataset.selected = "";
              placedShipListSet[boardNum].add(ship.boardCode);
              forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn();
              forPvsPMatchesShowHideScreenBtn();
            }
          }
        }
      });
    });
  }

  // PHASE 2 - Now that the ships are placed

  // Two different game tracks here: 1) PvsC, 2) PvsP

  function forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn() {
    const { btnStartGame, p2BtnRandom } = getBtnElements();
    const { p1TargetZone } = getBoardElements();
    const { clickStartGameInPvsC } = handleMessageContent();
    if (
      player2.playerType === "computer" &&
      placedShipListSet1.size === 5 &&
      p1TargetZone.style.display !== "flex"
    ) {
      flexShowIt([btnStartGame]);
      p2BtnRandom.click();
      clearMessage();
      addMessage(clickStartGameInPvsC);
    } else {
      flexHideIt([btnStartGame]);
    }
  }

  function updateHideScreenBtn(styles, message, buttonText) {
    const { btnHideScreen } = getBtnElements();
    flexShowIt([btnHideScreen]);
    btnHideScreen.style.backgroundColor = styles.backgroundColor;
    btnHideScreen.style.borderColor = styles.borderColor;
    btnHideScreen.style.color = styles.textColor;
    btnHideScreen.innerText = buttonText;
    clearMessage();
    addMessage(message);
  }

  function forPvsPMatchesShowHideScreenBtn() {
    const { p1FullBoard, p2FullBoard } = getBoardElements();
    const { clickAcceptGameInPvsP } = handleMessageContent();
    // Condition for Player 2 human and Player 1 ship placement
    if (player2.playerType === "human" && !isPvsPStarted) {
      if (
        placedShipListSet1.size === 5 &&
        placedShipListSet2.size !== 5 &&
        p2FullBoard.style.display !== "flex"
      ) {
        updateHideScreenBtn(
          {
            backgroundColor: "var(--player1)",
            borderColor: "var(--player1-text)",
            textColor: "var(--enemy)",
          },
          clickAcceptGameInPvsP,
          "Accept"
        );
      } else if (
        placedShipListSet2.size === 5 &&
        p1FullBoard.style.display !== "flex"
      ) {
        updateHideScreenBtn(
          {
            backgroundColor: "var(--player2)",
            borderColor: "var(--player2-text)",
            textColor: "var(--enemy)",
          },
          clickAcceptGameInPvsP,
          "Accept"
        );
      }
    }
    // Conditions for Player 2 human and the game being started
    else if (player2.playerType === "human" && isPvsPStarted) {
      if (p2FullBoard.style.display !== "flex" && playerTurn % 2 !== 0) {
        updateHideScreenBtn(
          {
            backgroundColor: "var(--player2)",
            borderColor: "var(--player2-text)",
            textColor: "var(--enemy)",
          },
          null,
          "Switch"
        );
      } else if (p1FullBoard.style.display !== "flex" && playerTurn % 2 === 0) {
        updateHideScreenBtn(
          {
            backgroundColor: "var(--player1)",
            borderColor: "var(--player1-text)",
            textColor: "var(--enemy)",
          },
          null,
          "Switch"
        );
      }
    } else {
      // Hide the button if no conditions are met
      flexHideIt([getBtnElements().btnHideScreen]);
    }
  }

  function setupHighlightPlaceShipsEventListener(boardNum) {
    const shipData = highlightPlaceShipsHelper(boardNum); // Set up ships and get ship data
    const { allPlaceShipsClass } = getBoardElements(boardNum);
    allPlaceShipsClass.forEach((ship) => {
      ship.addEventListener("click", () => {
        mp3Click();
        // Call the handler with the necessary parameters
        handleHighlightPlaceShip(ship, boardNum, shipData);
      });
    });
  }

  function processAttack(boardNum, row, col) {
    const board = player[boardNum].playerBoard.board;
    const hitOrMiss = testGame[boardNum].receiveAttack(row, col);
    attackSoundEffects(hitOrMiss);
    addEmojiEffect(board, boardNum);
    colorSunkShips(testGame[boardNum], boardNum);
    checkForSunkFleet(testGame[boardNum], boardNum);
    highlightEmptyCellOnlyOnHover(board, boardNum);
    playerTurn += 1;
    forPvsPMatchesShowHideScreenBtn();
    return hitOrMiss;
  }

  function updateTurnMessage(hitOrMiss, row, col, isPlayer1) {
    const player1Message = `PLAYER 1's attack is a ${hitOrMiss} at square: (${row}, ${col}). `;
    const player2Message = `PLAYER 2's attack is a ${hitOrMiss} at square: (${row}, ${col}). `;
    if (player2.playerType === "computer") {
      addMessage(
        isPlayer1
          ? `${player1Message}Wait for PLAYER 2 to make an attack.`
          : `${player2Message}SWITCH to PLAYER 1.`
      );
      endGame();
    } else if (player2.playerType === "human") {
      addMessage(
        isPlayer1
          ? `${player1Message}SWITCH to PLAYER 2.`
          : `${player2Message}SWITCH to PLAYER 1.`
      );
      endGame();
    }
  }

  function handleCellClick(boardNum, cell) {
    const { p1FullBoard, p2FullBoard } = getBoardElements();
    const targetId = cell.id;
    const regex = /\((\d+),(\d+)\)/;
    const matches = targetId.match(regex);
    let row, col;
    if (!matches || cell.innerText !== "") return;
    row = +matches[1];
    col = +matches[2];
    // Determine if the attack is valid based on the turn and board visibility
    if (player2.playerType === "human") {
      isPvsPStarted = true;
    } else {
      isPvsPStarted = false;
    }
    const isPlayer1Turn = playerTurn % 2 === 0;
    const isPlayer2Turn = playerTurn % 2 !== 0;
    // Check if player 1 or player 2 can attack based on the game state
    if (
      !stopGameHaveWinner &&
      matches &&
      cell.innerText === "" &&
      ((isPlayer1Turn && p1FullBoard.style.display === "flex") ||
        (isPlayer2Turn && p2FullBoard.style.display === "flex"))
    ) {
      const hitOrMiss = processAttack(boardNum, row, col);
      updateTurnMessage(hitOrMiss, row, col, isPlayer1Turn);
      // If it's player 2's turn and they are a computer, trigger their attack
      if (player2.playerType === "computer" && isPlayer1Turn) {
        // Trigger player 2's computer attack after player 1's turn
        setTimeout(() => {
          player2ComputerAttack();
        }, 0); // Using a short timeout to ensure the game state has been updated
      }
    }
  }

  function manuallyAttackTargetCoordinates(boardNum) {
    const { hitMissTargetCellsClass } = getBoardElements(boardNum);
    hitMissTargetCellsClass.forEach((cell) => {
      cell.addEventListener("click", () => handleCellClick(boardNum, cell));
    });
  }

  // Put these sets outside of function so that it accumulate new coordinates and not refresh itself when called
  const noRepeatCoordinatesSet = new Set();
  // const priorHitCoordinatesSet = new Set(); // Not used, I had planned on using this to make player2ComputerAttack() attacks deadlier. It would have combined the sunkStatuses of ships out of play to change up computer attack schemes. Currently, most games are just close enough to only mildly stress out player 1 (human), player 2 (computer) will win if player 1 is careless or very unlucky
  const hunterCoordinatesSet = new Set();
  // const priorHitCoordinatesArray = Array.from(priorHitCoordinatesSet); // Part of above plans to make player2ComputerAttacks deadlier

  let hitOrMiss,
    randomRow,
    randomCol,
    randomRowStored,
    randomColStored,
    coordinates;

  let lastPlayer2ComputerAttack = "start";
  let player2FocusesOnAdjacentSquares = 0;
  let doNotMoveOnToNextAttackType = false; // Prevents double attacks by player2Computer when targetAdjacentCoordinates() can't find a valid target

  function targetAdjacentCoordinates() {
    let attempts = 0;
    let foundValidCoordinate = false;
    let coordinateDistance = 1;
    let adjacentCoordinates = [
      `${randomRowStored + coordinateDistance},${randomColStored}`, // Down
      `${randomRowStored - coordinateDistance},${randomColStored}`, // Up
      `${randomRowStored},${randomColStored + coordinateDistance}`, // Right
      `${randomRowStored},${randomColStored - coordinateDistance}`, // Left
    ];
    while (attempts < 10 && !foundValidCoordinate) {
      let randomIndex = Math.floor(Math.random() * adjacentCoordinates.length);
      coordinates = adjacentCoordinates[randomIndex];
      [randomRow, randomCol] = coordinates.split(",").map(Number); // Split into row and col
      // Check if the coordinates are valid (within bounds and not used before)
      if (
        randomRow >= 0 &&
        randomRow < 10 &&
        randomCol >= 0 &&
        randomCol < 10 &&
        !noRepeatCoordinatesSet.has(coordinates) // Ensure it's not a previously used coordinate
      ) {
        foundValidCoordinate = true; // A valid target is found
        // console.log("Attack Style: Targeted Attack Pattern");
        noRepeatCoordinatesSet.add(coordinates);
        return { randomRow, randomCol };
      } else {
        attempts++;
      }
    }
    if (attempts >= 10 && !foundValidCoordinate) {
      // console.log("No valid targets found");
      doNotMoveOnToNextAttackType = true;
      console.log(`DON'T MOVE ON = ${doNotMoveOnToNextAttackType}`);
      randomRow = null;
      randomCol = null;
      let { randomRow, randomCol } = targetRandomCoordinates();
      return { randomRow, randomCol };
    }
  }

  function targetRandomCoordinates() {
    let coordinatesOnlyHunter;
    if (hunterCoordinatesSet.size >= 38) {
      // Guard against runaway loops; Reduced to 38 from 41 (was 50 initially, which was too high)
      // Basic random attacks
      do {
        // console.log("Attack Style: Basic Random Attack Pattern");
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        coordinates = `${randomRow},${randomCol}`;
      } while (noRepeatCoordinatesSet.has(coordinates)); // Ensure uniqueness
    } else {
      // Start off attacks by hunting every other square
      do {
        // console.log("Attack Style: Checkerboard 'Hunter' Attack Pattern");
        randomRow = getRandomRow();
        randomCol = everyOtherColDependingOnRow(randomRow);
        coordinates = `${randomRow},${randomCol}`;
        coordinatesOnlyHunter = coordinates;
      } while (noRepeatCoordinatesSet.has(coordinates)); // Ensure uniqueness
    }
    noRepeatCoordinatesSet.add(coordinates);
    hunterCoordinatesSet.add(coordinatesOnlyHunter);
    return { randomRow, randomCol };
  }

  function player2ComputerAttack() {
    if (
      !stopGameHaveWinner &&
      player2.playerType === "computer" &&
      playerTurn % 2 !== 0
    ) {
      setTimeout(() => {
        if (
          lastPlayer2ComputerAttack === "hit" ||
          player2FocusesOnAdjacentSquares > 0
        ) {
          let { randomRow, randomCol } = targetAdjacentCoordinates();
          hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
          if (lastPlayer2ComputerAttack === "miss") {
            player2FocusesOnAdjacentSquares--;
            doNotMoveOnToNextAttackType = false;
          }
        } else if (
          (lastPlayer2ComputerAttack === "miss" &&
            player2FocusesOnAdjacentSquares === 0 &&
            !doNotMoveOnToNextAttackType) ||
          (lastPlayer2ComputerAttack === "start" &&
            player2FocusesOnAdjacentSquares === 0 &&
            !doNotMoveOnToNextAttackType)
        ) {
          let { randomRow, randomCol } = targetRandomCoordinates();
          hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
          // console.log("Alternate input scheme for retry and undefined");
          doNotMoveOnToNextAttackType = false;
        }
        clearMessage();
        addMessage(
          `PLAYER 2's attack is a ${hitOrMiss} at square: (${randomRow}, ${randomCol}). PLAYER 1's turn, make your attack!.`
        );
        // console.log(
        //   `PLAYER 2's attack is a ${hitOrMiss} at (${randomRow}, ${randomCol}).`
        // );
        playerTurn += 1;
        attackSoundEffects(hitOrMiss);
        addEmojiEffect(player1.playerBoard.board, 1);
        colorSunkShips(testGame1, 1);
        checkForSunkFleet(testGame1);
        highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
        endGame();
        if (hitOrMiss === "hit") {
          randomRowStored = randomRow;
          randomColStored = randomCol;
          lastPlayer2ComputerAttack = hitOrMiss;
          player2FocusesOnAdjacentSquares = 3;
          // priorHitCoordinatesSet.add(coordinates); // Keep for reference, if changed later
        } else if (hitOrMiss === "miss") {
          lastPlayer2ComputerAttack = hitOrMiss;
        } else {
          // Catches when hitOrMiss is a "retry" or "undefined"
          lastPlayer2ComputerAttack = hitOrMiss;
          let { randomRow, randomCol } = targetRandomCoordinates();
          hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
        }
        // console.log(noRepeatCoordinatesSet);
        // console.log(hunterCoordinatesSet);
        // console.log(priorHitCoordinatesSet);
      }, currentSetTimeoutValue); // Allows for message/sound effect to play more fully
    }
  }
  manuallyAttackTargetCoordinates(1);
  manuallyAttackTargetCoordinates(2);

  // PHASE 3 - MATCH MECHANICS - PLAYER VS MACHINE

  function forPvsCMatchesBeginActualGameWithStartBtn() {
    const { btnStartGame } = getBtnElements();
    const { p1PlaceShips, p1TargetZone } = getBoardElements();
    const { player1ClickCellToAttack } = handleMessageContent();
    if (player2.playerType === "computer") {
      btnStartGame.addEventListener("click", () => {
        // console.log(testGame1); // Map of the current board state for player 1
        // console.log(testGame2); // Map of the current board state for player 2
        mp3Click();
        flexHideIt([p1PlaceShips, btnStartGame]);
        flexShowIt([p1TargetZone]);
        clearMessage();
        addMessage(player1ClickCellToAttack);
      });
    }
  }

  function checkForSunkFleet(board) {
    if (board.ships.every((ship) => ship.isSunk())) {
      mp3Sink();
      stopGameHaveWinner = true; // When all ships are sunk
      if (board === testGame1) {
        player2IsVictorious = true;
      } else if (board === testGame2) {
        player1IsVictorious = true;
      }
    }
  }

  function endGame() {
    const { btnHideScreen } = getBtnElements()
    const { messages } = getMessageElements();
    const { appContainer } = getBoardElements();
    const { player1Wins, player2Wins, player2ComputerWins } =
      handleMessageContent();
    if (player1IsVictorious) {
      clearMessage();
      addMessage(`${player1Wins}${playerTurn} turns.`);
      flexHideIt([btnHideScreen]);
      appContainer.style.background = "var(--background-player1)";
      messages.style.backgroundColor = "var(--player1)";
      messages.style.borderColor = "var(--player1-text)";
      messages.style.color = "var(--enemy)";
    } else if (player2IsVictorious) {
      clearMessage();
      if (player2.playerType === "human") {
        addMessage(`${player2Wins}${playerTurn} turns.`);
      } else {
        addMessage(`${player2ComputerWins}${playerTurn} turns.`);
      }
      flexHideIt([btnHideScreen]);
      appContainer.style.background = "var(--background-player2)";
      messages.style.backgroundColor = "var(--player2)";
      messages.style.borderColor = "var(--player1-text)";
      messages.style.color = "var(--enemy)";
    }
  }

  forPvsCMatchesBeginActualGameWithStartBtn();
  setupPlayerNumBtnEventListeners();
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
});