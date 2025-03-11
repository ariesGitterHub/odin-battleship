export function getHeaderElements() {
  return {
    header: document.querySelector("#header"),
    titleContainer: document.querySelector("#title-container"),
    titleTextTop: document.querySelector("#title-text-top"),
    titleTextBot: document.querySelector("#title-text-bot"),
    MMM: document.querySelector("#MMM"),
    gifContainer: document.querySelector("#gif-container"),
    battleshipGif: document.querySelector("#battleship-gif"),
  };
}

export function getMessageElements() {
  return {
    messages: document.querySelector("#messages"),
    messageBar: document.querySelector("#message-bar"),
  };
}

export function getBtnElements(boardNum) {
  return {
    mainBtnContainer: document.querySelector("#main-btn-container"),
    btnPvsC: document.querySelector("#btn-pvsc"),
    btnPvsP: document.querySelector("#btn-pvsp"),
    btnQuitGame: document.querySelector("#btn-quit-game"),
    btnStartGame: document.querySelector("#btn-start-game"),
    btnHideScreen: document.querySelector("#btn-hide-screen"),
    btnUnlockScreen: document.querySelector("#btn-unlock-screen"),
    btnRotate: document.querySelector(`#p${boardNum}-btn-rotate`),

    // TODO - MOVE THESE TWO to getBoardElements
    // x5Grid: document.querySelector(`#p${boardNum}-x5-grid`),
    // allPlaceShipsClass: document.querySelectorAll(`.all-p${boardNum}-place-ships`),

    btnUndo: document.querySelector(`#p${boardNum}-btn-undo`),
    btnClear: document.querySelector(`#p${boardNum}-btn-clear`),
    p2BtnRandom: document.querySelector("#p2-btn-random"),
    btnRandom: document.querySelector(`#p${boardNum}-btn-random`),
    // const shipCellsId = document.querySelectorAll(`.ship-cells${boardNum}`);
  };
}
// TODO - ORGANIZE THIS!!!!
export function getBoardElements(boardNum) {
  return {
    appContainer: document.querySelector("#app-container"),
    body: document.querySelector("body"),
    boardContainer: document.querySelector("#board-container"),
    p1FullBoard: document.querySelector("#p1-full-board"),
    p2FullBoard: document.querySelector("#p2-full-board"),
    // TODO - keep this below? or delete and just reference the full boards themselves
    flipFullBoard: document.querySelector(".flip-full-board"),

    p1PlaceShips: document.querySelector("#p1-place-ships"),
    p2PlaceShips: document.querySelector("#p2-place-ships"),

    p1DeploymentZone: document.querySelector("#p1-deployment-zone"),
    p2DeploymentZone: document.querySelector("#p2-deployment-zone"),

    p1TargetZone: document.querySelector("#p1-target-zone"),
    p2TargetZone: document.querySelector("#p2-target-zone"),

    p1ShipBoard: document.querySelector("#p1-ship-board"),
    p1BtnContainer: document.querySelector("#p1-place-ship-btn-container"),
    p1HitMissBoard: document.querySelector("#p1-hit-miss-board"),
    p1TargetShipBoard: document.querySelector("#p1-target-ship-board"),
    p1TargetHitMissBoard: document.querySelector("#p1-target-hit-miss-board"),

    p2ShipBoard: document.querySelector("#p2-ship-board"),
    p2BtnContainer: document.querySelector("#p2-place-ship-btn-container"),
    p2HitMissBoard: document.querySelector("#p2-hit-miss-board"),
    p2TargetShipBoard: document.querySelector("#p2-target-ship-board"),
    p2TargetHitMissBoard: document.querySelector("#p2-target-hit-miss-board"),

    ships: document.querySelectorAll(".ship"),

    shipCellsClass: document.querySelectorAll(`.ship-cells${boardNum}`),
    hitMissCellsClass: document.querySelectorAll(`.hit-miss-cells${boardNum}`),
    hitMissTargetCellsClass: document.querySelectorAll(
      `.hit-miss-target-cells${boardNum}`
    ),

    allPlaceShipsClass: document.querySelectorAll(
      `.all-p${boardNum}-place-ships`
    ),
    x5Grid: document.querySelector(`#p${boardNum}-x5-grid`),

    placeA: document.querySelector(`#place-a${boardNum}`),
    placeB: document.querySelector(`#place-b${boardNum}`),
    placeD: document.querySelector(`#place-d${boardNum}`),
    placeS: document.querySelector(`#place-s${boardNum}`),
    placeC: document.querySelector(`#place-c${boardNum}`),

    shipA: document.querySelector(`#ship-a${boardNum}`),
    shipB: document.querySelector(`#ship-b${boardNum}`),
    shipD: document.querySelector(`#ship-d${boardNum}`),
    shipS: document.querySelector(`#ship-s${boardNum}`),
    shipC: document.querySelector(`#ship-c${boardNum}`),
    // shipA1: document.querySelector(`#ship-a1`),
  };
}

 // Start refactor of manuallyAttackTargetCoordinates(boardNum)

  // Old code...keep for future reference to show what was chopped up in the refactor

  // function manuallyAttackTargetCoordinates(boardNum) {
  //   const { p1FullBoard, p2FullBoard } = getBoardElements();
  //   const { hitMissTargetCellsClass } = getBoardElements(boardNum);
  //   const board = player[boardNum].playerBoard.board;
  //   highlightEmptyCellOnlyOnHover(board, boardNum);

  //   hitMissTargetCellsClass.forEach((cell) => {
  //     cell.addEventListener("click", () => {
  //       let targetId = cell.id;
  //       let regex = /\((\d+),(\d+)\)/;
  //       let matches = targetId.match(regex);
  //       let row, col;

  //       if (player2.playerType === "human") {
  //         isPvsPStarted = true;
  //       } else {
  //         isPvsPStarted = false;
  //       }
  //       if (
  //         !stopGameHaveWinner &&
  //         matches &&
  //         cell.innerText === "" &&
  //         playerTurn % 2 === 0 &&
  //         p1FullBoard.style.display === "flex"
  //       ) {
  //         setTimeout(() => {
  //           row = +matches[1]; // Reminder, +matches converts the string to a number
  //           col = +matches[2]; // Same as above
  //           hitOrMiss = testGame[boardNum].receiveAttack(row, col);
  //           attackSoundEffects(hitOrMiss);
  //           addEmojiEffect(board, boardNum);
  //           colorSunkShips(testGame[boardNum], boardNum);
  //           checkForSunkFleet(testGame[boardNum], boardNum);
  //           // Highlight the board again
  //           highlightEmptyCellOnlyOnHover(board, boardNum);

  //           playerTurn += 1;
  //           player2ComputerAttack();
  //           forPvsPMatchesShowHideScreenBtn();
  //           clearMessage();
  //           if (player2.playerType === "computer") {
  //             addMessage(
  //               `PLAYER 1's attack is a ${hitOrMiss} at square: (${row}, ${col}). PLAYER 2's TURN!`
  //             );
  //             endGame();
  //           } else {
  //             addMessage(
  //               `PLAYER 1's attack is a ${hitOrMiss} at square: (${row}, ${col}). SWITCH to PLAYER 2.`
  //             );
  //             endGame();
  //           }
  //         }, setTimeoutBlockTrick);
  //       }
  //       if (
  //         !stopGameHaveWinner &&
  //         matches &&
  //         cell.innerText === "" &&
  //         player2.playerType === "human" &&
  //         playerTurn % 2 !== 0 &&
  //         p2FullBoard.style.display === "flex"
  //       ) {
  //         setTimeout(() => {
  //           row = +matches[1]; // Reminder, +matches converts the string to a number
  //           col = +matches[2]; // Same as above
  //           hitOrMiss = testGame[boardNum].receiveAttack(row, col);
  //           attackSoundEffects(hitOrMiss);
  //           addEmojiEffect(board, boardNum);
  //           colorSunkShips(testGame[boardNum], boardNum);
  //           checkForSunkFleet(testGame[boardNum], boardNum);
  //           // Highlight the board again
  //           highlightEmptyCellOnlyOnHover(board, boardNum);
  //           playerTurn += 1;
  //           forPvsPMatchesShowHideScreenBtn();
  //           clearMessage();
  //           if (player2.playerType === "human") {
  //             addMessage(
  //               `PLAYER 2's attack is a ${hitOrMiss} at square: (${row}, ${col}). SWITCH to PLAYER 1.`
  //             );
  //             endGame();
  //           }
  //         }, setTimeoutBlockTrick);
  //       }
  //     });
  //   });
  // }

  // function player2ComputerAttack() {
  //   if (
  //     !stopGameHaveWinner &&
  //     player2.playerType === "computer" &&
  //     playerTurn % 2 !== 0
  //   ) {
  //     setTimeout(() => {
  //       clearMessage();
  //       let { randomRow, randomCol } = getUniqueRandomCoordinates(
  //         hitOrMiss,
  //         randomRowStored,
  //         randomColStored,
  //         lastPlayer2ComputerPriorAttack
  //       );
  //       hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
  //       addMessage(
  //         `PLAYER 2's attack is a ${hitOrMiss} at square: (${randomRow}, ${randomCol}). PLAYER 1's TURN!`
  //       );
  //       playerTurn += 1;
  //       attackSoundEffects(hitOrMiss);
  //       addEmojiEffect(player1.playerBoard.board, 1);
  //       colorSunkShips(testGame1, 1);
  //       checkForSunkFleet(testGame1);
  //       highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
  //       endGame();
  //       if (hitOrMiss === "hit") {
  //         randomRowStored = randomRow;
  //         randomColStored = randomCol;
  //       }
  //     }, currentSetTimeoutValue); // setTimeout allows player 2 messages to be seen and sound effects to get some play
  //   }
  // }

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
        ? `${player1Message}PLAYER 2's TURN!`
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
    if (player2.playerType === "computer" && isPlayer2Turn) {
      player2ComputerAttack();
    }
  }
}

function manuallyAttackTargetCoordinates(boardNum) {
  const { hitMissTargetCellsClass } = getBoardElements(boardNum);

  hitMissTargetCellsClass.forEach((cell) => {
    cell.addEventListener("click", () => handleCellClick(boardNum, cell));
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
      const hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
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
    }, currentSetTimeoutValue); // Allows for message/sound effect play
  }
}

  // End refactor of manuallyAttackTargetCoordinates(boardNum)

  const { p1FullBoard, p2FullBoard } = getBoardElements();