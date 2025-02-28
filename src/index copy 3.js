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
  const player2 = new Player(2, "machine", testGame2);

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
  const currentSetTimeoutValue = 0;
  let stopGameHaveWinner = false
 
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
    const { startGameMsg } = handleMessageContent();

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

    // clearMessage();
    // addMessage("Please select the number of players.");
  }

  // Set up btn eventListeners that handle the number of players
  function setupPlayerNumBtnEventListeners() {
    const { gifContainer } = getHeaderElements();
    const { messages } = getMessageElements();
    const { mainBtnContainer, btnPvsC, btnPvsP, btnQuitGame, btnStartGame } =
      getBtnElements();
    const { p1FullBoard, p2FullBoard } = getBoardElements();
    const { player1DeployShipsMsg } =
      handleMessageContent();

    btnPvsC.addEventListener("click", () => {
      mp3Click();
      gifContainer.style.display = "none";
      messages.style.display = "flex";
      // messages.style.fontSize = "1rem";
      mainBtnContainer.style.flexDirection = "row";
      btnPvsC.style.display = "none";
      btnPvsP.style.display = "none";
      btnQuitGame.style.display = "flex";
      // handleBtnNumPlayer(1);
      p1FullBoard.style.display = "flex";
      p2FullBoard.style.display = "none";

      clearMessage();
      addMessage(player1DeployShipsMsg);
      player2.playerType = "machine";
      // console.log(`Player 1: ${player1.playerType}, Player 2: $player2.playerType}`);
    });

    btnPvsP.addEventListener("click", () => {
      mp3Click();
      gifContainer.style.display = "none";
      messages.style.display = "flex";
      // messages.style.fontSize = "1rem";
      mainBtnContainer.style.flexDirection = "row";
      btnPvsC.style.display = "none";
      btnPvsP.style.display = "none";
      btnQuitGame.style.display = "flex";
      // handleBtnNumPlayer(1);
      p1FullBoard.style.display = "flex";
      p2FullBoard.style.display = "none";
      player2.playerType = "human";
      // console.log(`Player 1: ${player1.playerType}, Player 2: $player2.playerType}`);
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
    const {
      p1FullBoard,
      p1PlaceShips,
      p2FullBoard,
      p2PlaceShips,
    } = getBoardElements();
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

  // forPvsPMatchesShowHideScreenBtn()
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
      // Player 1 has clicked ACCEPT DEPLOYMENT, now to unhide player 2 so they can place ships...
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

  // TODO - set up Undo Btn
  function setupUndoBtnEventListener(boardNum) {
    const { btnHideScreen, btnUndo } = getBtnElements(boardNum);

    btnUndo.addEventListener("click", () => {
      mp3Click();
      btnHideScreen.style.display = "none";

      if (placedShipListSet[boardNum].size === 0) {
        console.log("Nothing to undo.");
        return;
      } else {
        // Get the last item from the order array
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

        // let removeLastShip = placedShipListArr[boardNum].pop();
        // Remove it from the Set
        placedShipListSet[boardNum].delete(lastShip);
        removeSingleShipSvgOnShipGrid(boardNum, lastShip);
        console.log(placedShipListSet1);
        console.log(placedShipListSet2);

        console.log(testGame1);
        console.log(testGame2);
      }
      // console.log(placedShipListSet1);
      // console.log(placedShipListSet2);
    });
  }

  setupUndoBtnEventListener(1);
  setupUndoBtnEventListener(2);

  // Set up btn eventListener that handles clearing placed ships on the gameboard
  function setupClearBtnEventListener(boardNum) {
    const { btnClear, btnStartGame, btnHideScreen, btnUnlockScreen } = getBtnElements(boardNum);
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
      // console.log(placedShipListArr1);
      // console.log(placedShipListArr2);

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
      player2.playerType === "machine" &&
      placedShipListSet1.size === 5 &&
      p1TargetZone.style.display !== "flex"
    ) {
      console.log(player2.playerType);
      console.log(placedShipListSet1.size);

      btnStartGame.style.display = "flex";
      p2BtnRandom.click();
      // clearMessage();
      // addMessage("PLAYER 1: click on a cell in your ENEMY TARGET ZONE grid to attack.");
      clearMessage();
      addMessage(clickStartGameInPvsC);
    } else {
      btnStartGame.style.display = "none";
    }
  }

  function forPvsPMatchesShowHideScreenBtn() {
    const { btnHideScreen } = getBtnElements();
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
      !isPvsPStarted &&
      placedShipListSet1.size === 5 &&
      placedShipListSet2.size !== 5 &&
      // p1TargetZone.style.display !== "flex"
      p2FullBoard.style.display !== "flex"
    ) {
      console.log(player2.playerType);
      btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player1)";
      btnHideScreen.style.borderColor = "var(--player1-text)";
      btnHideScreen.style.color = "var(--enemy)";
      btnHideScreen.innerText = "Accept Deployment";

    } else if (
      player2.playerType === "human" &&
      !isPvsPStarted &&
      placedShipListSet2.size === 5 &&
      // p2TargetZone.style.display !== "flex"
       p1FullBoard.style.display !== "flex"
    ) {
      console.log(player2.playerType);
      btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player2)";
      btnHideScreen.style.borderColor = "var(--player2-text)";
      btnHideScreen.style.color = "var(--enemy)";
      btnHideScreen.innerText = "Accept Deployment";
      // addMessage(startMatchPvsC);
    } else if (
      player2.playerType === "human" &&
      isPvsPStarted &&
      // p1PlaceShips.style.display !== "flex" &&
      p2FullBoard.style.display !== "flex" &&
      playerTurn % 2 !== 0
    ) {
      btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player2)";
      btnHideScreen.style.borderColor = "var(--player2-text)";
      btnHideScreen.style.color = "var(--enemy)";
      btnHideScreen.innerText = "Switch to PLAYER 2";
    } else if (
      player2.playerType === "human" &&
      isPvsPStarted &&
      // p2PlaceShips.style.display !== "flex" &&
      p1FullBoard.style.display !== "flex" &&
      playerTurn % 2 === 0
    ) {
      btnHideScreen.style.display = "flex";
      btnHideScreen.style.backgroundColor = "var(--player1)";
      btnHideScreen.style.borderColor = "var(--player1-text)";
      btnHideScreen.style.color = "var(--enemy)";
      btnHideScreen.innerText = "Switch to PLAYER 1";
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
          stopGameThereIsAWinner(testGame[boardNum], boardNum);
          // Highlight the board again
          highlightEmptyCellOnlyOnHover(board, boardNum);
          // stopGameThereIsAWinner(1);
          // stopGameThereIsAWinner(2);
          // console.log(`Turn before P! = ${playerTurn}`);
          playerTurn += 1;
          console.log(
            `Attack on testGame${boardNum} by P1, Turn flips to: ${playerTurn}`
          );
          player2ComputerAttack();
          forPvsPMatchesShowHideScreenBtn();
          clearMessage();
          if (player2.playerType === "machine") {
            addMessage(
              `PLAYER 1 attacks. It's ${hitOrMiss} at coordinates (${row}, ${col}). Wait for PLAYER 2's counterattack.`
            );
          } else {
            // addMessage(
            //   `PLAYER 1 attacks. It's ${hitOrMiss} at coordinates (${row}, ${col}). SWITCH to PLAYER 2 to start the next turn.`
            // );
            addMessage(
              `PLAYER 1 attacks. It's a ${hitOrMiss} at coordinates (${row}, ${col}). SWITCH to PLAYER 2.`
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
          hitOrMiss = testGame[boardNum].receiveAttack(row, col);

          // clearMessage();
          // // TODO - add below to handleMessageContent
          // addMessage(
          //   `PLAYER 2 attacks coordinates (${row}, ${col}). Wait for PLAYER 1's counterattack.`
          // );
          mp3Fire();
          addEmojiEffect(board, boardNum);
          colorSunkShips(testGame[boardNum], boardNum);
          stopGameThereIsAWinner(testGame[boardNum], boardNum);
          // Highlight the board again
          highlightEmptyCellOnlyOnHover(board, boardNum);
          // stopGameThereIsAWinner(1);
          // stopGameThereIsAWinner(2);
          // console.log(`Turn before P! = ${playerTurn}`);
          playerTurn += 1;
          console.log(
            `Attack on testGame${boardNum} by P2, Turn flips to: ${playerTurn}`
          );
          // player2ComputerAttack();
          forPvsPMatchesShowHideScreenBtn();
          clearMessage();
          if (player2.playerType === "human") {
            // addMessage(
            //   `PLAYER 2 attacks. It's ${hitOrMiss} at coordinates (${row}, ${col}). SWITCH to PLAYER 1 to start the next turn.`
            // );
          addMessage(
            `PLAYER 2 attacks. It's a ${hitOrMiss} at coordinates (${row}, ${col}). SWITCH to PLAYER 1.`
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
        // if (hitOrMiss === "hit"){

        // }
        addMessage(
          `PLAYER 2 attacked! It's a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}). PLAYER 1, it is now your turn to attack.`
        );
        playerTurn += 1;
        console.log(`Attack on testGame1 by P2, Turn flips to: ${playerTurn}`);
        mp3Fire();
        addEmojiEffect(player1.playerBoard.board, 1);
        colorSunkShips(testGame1, 1);
        stopGameThereIsAWinner(testGame1, 1)
        highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
        // stopGameThereIsAWinner(1);
        // stopGameThereIsAWinner(2);

        if (hitOrMiss === "hit") {
          console.log("This attack was a hit!");
          randomRowStored = randomRow;
          randomColStored = randomCol;
          // stopGameThereIsAWinner(1);
          // stopGameThereIsAWinner(2);
        } else {
          console.log("That attack missed...");
          // stopGameThereIsAWinner(1);
          // stopGameThereIsAWinner(2);
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
    const { player1ClickCellToAttack } = handleMessageContent();

    if (player2.playerType === "machine") {
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

  function stopGameThereIsAWinner(board, boardNum) {
 const { player1Wins, player2Wins } = handleMessageContent();   
    // const shipBoardId = boardNum === 1 ? "#p1-ship-board" : "#p2-ship-board";
    // const targetShipBoardId =
    //   boardNum === 1 ? "#p2-target-ship-board" : "#p1-target-ship-board";

    // for (let i = 0; i < board.board.length; i++) {
    //   for (let j = 0; j < board.board[i].length; j++) {
    //     let cellShip = document.getElementById(
    //       `SG${boardNum === 1 ? 1 : 2}: (${i},${j})`
    //     );
    //     let cellShipTarget = document.getElementById(
    //       `T-SG${boardNum === 1 ? 1 : 2}: (${i},${j})`
    //     );

        // ["A!", "B!", "D!", "S!", "C!"].forEach((shipCode, index) => {
        //   if (board.ships[index].isSunk() && board.board[i][j] === shipCode) {
        //     // mp3Sink();
        //     cellShip.style.backgroundColor = "var(--text)";
        //     cellShipTarget.style.backgroundColor = "var(--text)";
        //   }
        // });
// colorSunkShips
        if (board.ships.every((ship) => ship.isSunk())) {
          mp3Sink(); 
          stopGameHaveWinner = true// When all ships are sunk...
          // document.querySelector(shipBoardId).style.backgroundColor =
          //   "var(--loser)";
          // document.querySelector(targetShipBoardId).style.backgroundColor =
          //   "var(--loser)";

           // const board = player[boardNum].playerBoard.board;
    // const { hitMissTargetCellsClass } = getBoardElements(boardNum);

    // hitMissTargetCellsClass.forEach((cell) => {
    //   cell.removeEventListener("click", () => {}); })


          if (stopGameHaveWinner && board === testGame1) {
            clearMessage();
            addMessage(player2Wins);
          } else if (stopGameHaveWinner && board === testGame2) {
            clearMessage();
            addMessage(player1Wins);
          }
        }
      }
  //   }
  // }

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
  // }
});
