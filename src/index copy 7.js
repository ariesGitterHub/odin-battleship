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
  getRandomAxis,
  getRandomCol,
  getRandomRow,
  getUniqueRandomCoordinates,
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

  // Helper arrays/sets that track if all ships have been placed
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
  const currentSetTimeoutValue = 2500; // Use on player2 computer attacks
  const setTimeoutBlockTrick = 0; // Used to try and get Apple mobile browser to work better with code
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
    // const { gifContainer } = getHeaderElements();
    const { header } = getHeaderElements();
    // const { messages } = getMessageElements();
    const {
      mainBtnContainer,
      btnPvsC,
      btnPvsP,
      // btnQuitGame,
      // btnStartGame,
      // btnHideScreen,
      // btnUnlockScreen,
    } = getBtnElements();
    // const { p1FullBoard, p2FullBoard } = getBoardElements();

    // gifContainer.style.display = "flex";
    flexShowIt([header, btnPvsC, btnPvsP]);
    mainBtnContainer.style.flexDirection = "column";
    // messages.style.display = "none";
        // btnPvsC.style.display = "flex";
    // btnPvsP.style.display = "flex";
    // btnQuitGame.style.display = "none";
    // btnStartGame.style.display = "none";
    // btnHideScreen.style.display = "none";
    // btnUnlockScreen.style.display = "none";
    // p1FullBoard.style.display = "none";
    // p2FullBoard.style.display = "none";
  }

  function clickedPlayerNumBtnEffects(playerType) {
    const { header } = getHeaderElements();
    const { messages } = getMessageElements();
    const { mainBtnContainer, btnPvsC, btnPvsP, btnQuitGame } =
      getBtnElements();
    const { p1FullBoard } = getBoardElements();
    const { deployShipsMsg } = handleMessageContent();

    header.style.display = "none";
    flexHideIt([header, btnPvsC, btnPvsP]);
    flexShowIt([messages, btnQuitGame, p1FullBoard]);
    mainBtnContainer.style.flexDirection = "row";
    // messages.style.display = "flex";
    // btnPvsC.style.display = "none";
    // btnPvsP.style.display = "none";
    // btnQuitGame.style.display = "flex";
    // p1FullBoard.style.display = "flex";
    // p2FullBoard.style.display = "none";

    if (playerType === "computer") {
      player2.playerType = "computer";
    } else {
      player2.playerType = "human";
    }

    clearMessage();
    addMessage(deployShipsMsg);
  }

  // function setupPlayerNumBtnEventListeners() {
  //   const { header } = getHeaderElements();
  //   const { messages } = getMessageElements();
  //   const { mainBtnContainer, btnPvsC, btnPvsP, btnQuitGame } =
  //     getBtnElements();
  //   const { p1FullBoard, p2FullBoard } = getBoardElements();
  //   const { deployShipsMsg } = handleMessageContent();

  //   btnPvsC.addEventListener("click", () => {
  //     mp3Click();
  //     header.style.display = "none";
  //     messages.style.display = "flex";
  //     mainBtnContainer.style.flexDirection = "row";
  //     btnPvsC.style.display = "none";
  //     btnPvsP.style.display = "none";
  //     btnQuitGame.style.display = "flex";
  //     p1FullBoard.style.display = "flex";
  //     p2FullBoard.style.display = "none";

  //     clearMessage();
  //     addMessage(deployShipsMsg);
  //     player2.playerType = "computer";
  //   });

  //   btnPvsP.addEventListener("click", () => {
  //     mp3Click();
  //     header.style.display = "none";
  //     messages.style.display = "flex";
  //     mainBtnContainer.style.flexDirection = "row";
  //     btnPvsC.style.display = "none";
  //     btnPvsP.style.display = "none";
  //     btnQuitGame.style.display = "flex";
  //     p1FullBoard.style.display = "flex";
  //     p2FullBoard.style.display = "none";
  //     player2.playerType = "human";
  //     clearMessage();
  //     addMessage(deployShipsMsg);
  //   });
  // }

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

  splashScreenStart();

  // Set up btn eventListener to quit the game
  function setupQuitBtnEventListener(boardNum) {
    const { btnQuitGame } = getBtnElements();
    const { p1PlaceShips, p2PlaceShips, p1TargetZone, p2TargetZone } =
      getBoardElements();
    btnQuitGame.addEventListener("click", () => {
      mp3Click();
      window.location.reload(); // Not proper per se, but it's quick and it works; also refreshes deploys
    });
  }

  function setupHideScreenBtnEventListener(boardNum) {
    const { battleshipGif, header } = getHeaderElements();
    const { btnHideScreen, btnUnlockScreen } = getBtnElements();
    const { appContainer, p1FullBoard, p1PlaceShips, p2FullBoard, p2PlaceShips } =
      getBoardElements();
    const { player1UnlockScreen, player2UnlockScreen } = handleMessageContent();

    btnHideScreen.addEventListener("click", () => {
      mp3Click();
      flexHideIt([btnHideScreen]);
      flexShowIt([btnUnlockScreen]);
      // btnHideScreen.style.display = "none";
      // btnUnlockScreen.style.display = "flex";
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
        // header.style.display = "flex";
        // p1FullBoard.style.display = "none";
        // p1PlaceShips.style.display = "none";
        clearMessage();
        addMessage(player2UnlockScreen);
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
        // header.style.display = "flex";
        // p2FullBoard.style.display = "none";
        // p2PlaceShips.style.display = "none";
        clearMessage();
        addMessage(player1UnlockScreen);
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
        // header.style.display = "flex";
        // p1FullBoard.style.display = "none";
        clearMessage();
        addMessage(player2UnlockScreen);
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
        // header.style.display = "flex";
        // p2FullBoard.style.display = "none";
        clearMessage();
        addMessage(player1UnlockScreen);
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
      // btnUnlockScreen.style.display = "none";
      // Player 1 has clicked ACCEPT, now to unhide player 2 so they can place ships
      if (
        player2.playerType === "human" &&
        !isPvsPStarted &&
        p2FullBoard.style.display !== "flex" &&
        placedShipListSet2.size !== 5
      ) {
        flexHideIt([header]);
        flexShowIt([p2FullBoard]);
        // header.style.display = "none";
        // p2FullBoard.style.display = "flex";
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
        flexShowIt([p1FullBoard, p1TargetZone]);
        // header.style.display = "none";
        // p1FullBoard.style.display = "flex";
        // p1TargetZone.style.display = "flex"; // PULLS UP NEEDED TARGET ZONE
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
        flexShowIt([p2FullBoard, p2TargetZone]);
        // header.style.display = "none";
        // p2FullBoard.style.display = "flex";
        // p2TargetZone.style.display = "flex"; // PULLS UP NEEDED TARGET ZONE
        // p1FullBoard.style.display = "none";
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
        // header.style.display = "none";
        p1FullBoard.style.display = "flex";
        p1TargetZone.style.display = "flex";
        // p2FullBoard.style.display = "none";
        clearMessage();
        addMessage(player1ClickCellToAttack);
      }
    });
  }

  // This eventListener that handles place ship rotation from h to v
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
      // btnStartGame.style.display = "none";
      // btnHideScreen.style.display = "none";
      // btnUnlockScreen.style.display = "none";
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
  // Two different tracks here: 1) PvsC, 2) PvsP

  function forPvsCMatchesCheckIfPlaceShipsAreAllPlacedThenShowStartBtn() {
    const { btnStartGame, p2BtnRandom } = getBtnElements();
    const { p1PlaceShips, p1TargetZone } = getBoardElements();
    const { clickStartGameInPvsC } = handleMessageContent();
    if (
      player2.playerType === "computer" &&
      placedShipListSet1.size === 5 &&
      p1TargetZone.style.display !== "flex"
    ) {
      flexShowIt([btnStartGame]);
      // btnStartGame.style.display = "flex";
      p2BtnRandom.click();
      clearMessage();
      addMessage(clickStartGameInPvsC);
    } else {
      flexHideIt([btnStartGame]);
      // btnStartGame.style.display = "none";
    }
  }

  function forPvsPMatchesShowHideScreenBtn() {
    const { btnHideScreen } = getBtnElements();
    const { p1FullBoard, p2FullBoard } = getBoardElements();
    const { clickAcceptGameInPvsP } = handleMessageContent();

    if (
      player2.playerType === "human" &&
      !isPvsPStarted &&
      placedShipListSet1.size === 5 &&
      placedShipListSet2.size !== 5 &&
      p2FullBoard.style.display !== "flex"
    ) {
      flexShowIt([btnHideScreen]);
      // btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player1)";
      btnHideScreen.style.borderColor = "var(--player1-text)";
      btnHideScreen.style.color = "var(--enemy)";
      btnHideScreen.innerText = "Accept";
      clearMessage();
      addMessage(clickAcceptGameInPvsP);
    } else if (
      player2.playerType === "human" &&
      !isPvsPStarted &&
      placedShipListSet2.size === 5 &&
      p1FullBoard.style.display !== "flex"
    ) {
      flexShowIt([btnHideScreen]);
      // btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player2)";
      btnHideScreen.style.borderColor = "var(--player2-text)";
      btnHideScreen.style.color = "var(--enemy)";
      btnHideScreen.innerText = "Accept";
      clearMessage();
      addMessage(clickAcceptGameInPvsP);
    } else if (
      player2.playerType === "human" &&
      isPvsPStarted &&
      p2FullBoard.style.display !== "flex" &&
      playerTurn % 2 !== 0
    ) {
      flexShowIt([btnHideScreen]);
      // btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player2)";
      btnHideScreen.style.borderColor = "var(--player2-text)";
      btnHideScreen.style.color = "var(--enemy)";
      btnHideScreen.innerText = "Switch";
    } else if (
      player2.playerType === "human" &&
      isPvsPStarted &&
      p1FullBoard.style.display !== "flex" &&
      playerTurn % 2 === 0
    ) {
      flexShowIt([btnHideScreen]);
      // btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player1)";
      btnHideScreen.style.borderColor = "var(--player1-text)";
      btnHideScreen.style.color = "var(--enemy)";
      btnHideScreen.innerText = "Switch";
    } else {
      flexHideIt([btnHideScreen]);
      // btnHideScreen.style.display = "none";
    }
  }

  function setupHighlightPlaceShipsEventListener(boardNum) {
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
        } else {
          isPvsPStarted = false;
        }
        if (
          !stopGameHaveWinner &&
          matches &&
          cell.innerText === "" &&
          playerTurn % 2 === 0 &&
          p1FullBoard.style.display === "flex"
        ) {
          setTimeout(() => {
            row = +matches[1]; // Reminder, +matches converts the string to a number
            col = +matches[2]; // Same as above
            hitOrMiss = testGame[boardNum].receiveAttack(row, col);
            attackSoundEffects(hitOrMiss);
            addEmojiEffect(board, boardNum);
            colorSunkShips(testGame[boardNum], boardNum);
            checkForSunkFleet(testGame[boardNum], boardNum);
            // Highlight the board again
            highlightEmptyCellOnlyOnHover(board, boardNum);

            playerTurn += 1;
            player2ComputerAttack();
            forPvsPMatchesShowHideScreenBtn();
            clearMessage();
            if (player2.playerType === "computer") {
              addMessage(
                `PLAYER 1's attack is a ${hitOrMiss} at square: (${row}, ${col}). PLAYER 2's TURN!`
              );
              endGame();
            } else {
              addMessage(
                `PLAYER 1's attack is a ${hitOrMiss} at square: (${row}, ${col}). SWITCH to PLAYER 2.`
              );
              endGame();
            }
          }, setTimeoutBlockTrick);
        }
        if (
          !stopGameHaveWinner &&
          matches &&
          cell.innerText === "" &&
          player2.playerType === "human" &&
          playerTurn % 2 !== 0 &&
          p2FullBoard.style.display === "flex"
        ) {
          setTimeout(() => {
            row = +matches[1]; // Reminder, +matches converts the string to a number
            col = +matches[2]; // Same as above
            hitOrMiss = testGame[boardNum].receiveAttack(row, col);
            attackSoundEffects(hitOrMiss);
            addEmojiEffect(board, boardNum);
            colorSunkShips(testGame[boardNum], boardNum);
            checkForSunkFleet(testGame[boardNum], boardNum);
            // Highlight the board again
            highlightEmptyCellOnlyOnHover(board, boardNum);
            playerTurn += 1;
            forPvsPMatchesShowHideScreenBtn();
            clearMessage();
            if (player2.playerType === "human") {
              addMessage(
                `PLAYER 2's attack is a ${hitOrMiss} at square: (${row}, ${col}). SWITCH to PLAYER 1.`
              );
              endGame();
            }
          }, setTimeoutBlockTrick);
        }
      });
    });
  }

  function player2ComputerAttack() {
    if (
      !stopGameHaveWinner &&
      player2.playerType === "computer" &&
      playerTurn % 2 !== 0
    ) {
      setTimeout(() => {
        clearMessage();
        let { randomRow, randomCol } = getUniqueRandomCoordinates(
          hitOrMiss,
          randomRowStored,
          randomColStored,
          lastPlayer2ComputerPriorAttack
        );
        hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
        addMessage(
          `PLAYER 2's attack is a ${hitOrMiss} at square: (${randomRow}, ${randomCol}). PLAYER 1's TURN!`
        );
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
        }
      }, currentSetTimeoutValue); // setTimeout allows player 2 messages to be seen and sound effects to get some play
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
        mp3Click();
        flexHideIt([p1PlaceShips, btnStartGame]);
        // p1PlaceShips.style.display = "none";
        // p1TargetZone.style.display = "flex";
        // btnStartGame.style.display = "none";
        flexShowIt([p1TargetZone]);
        clearMessage();
        addMessage(player1ClickCellToAttack);
      });
    }
  }

  function checkForSunkFleet(board) {
    if (board.ships.every((ship) => ship.isSunk())) {
      mp3Sink();
      stopGameHaveWinner = true; // When all ships are sunk...
      // console.log(`!!!!stopGameHaveWinner indicates ${stopGameHaveWinner}`);
      if (board === testGame1) {
        player2IsVictorious = true;
      } else if (board === testGame2) {
        player1IsVictorious = true;
      }
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
