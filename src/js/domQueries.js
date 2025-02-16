// REMOVE UNUSED SELECTORS!!!!
export function getHeaderElements() {
  return {
    header: document.querySelector("#header"),
    titleContainer: document.querySelector("#title-container"),
    titleText: document.querySelector("#title-text"),
    MMM: document.querySelector("#MMM"),
    gifContainer: document.querySelector("#gif-container"),
    battleshipGif: document.querySelector(".gif"),
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
    btnPassDevice: document.querySelector("#btn-pass-device"),
    btnRotate: document.querySelector(`#p${boardNum}-btn-rotate`),

    // TODO - MOVE THESE TWO to getBoardElements
    x5Grid: document.querySelector(`#p${boardNum}-x5-grid`),
    allPlaceShipsClass: document.querySelectorAll(
      `.all-p${boardNum}-place-ships`
    ),

    btnClear: document.querySelector(`#p${boardNum}-btn-clear`),
    p2BtnRandom: document.querySelector("#p2-btn-random"),
    btnRandom: document.querySelector(`#p${boardNum}-btn-random`),
    // const shipCellsId = document.querySelectorAll(`.ship-cells${boardNum}`);
  };
}
 // TODO - ORGANIZE THIS!!!!
export function getBoardElements(boardNum) {
  return {
    boardContainer: document.querySelector("#board-container"),
    p1FullBoard: document.querySelector("#p1-full-board"),
    p2FullBoard: document.querySelector("#p2-full-board"),

    p1PlaceShips: document.querySelector("#p1-place-ships"),
    p2PlaceShips: document.querySelector("#p2-place-ships"),

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
    hitMissTargetCellsClass: document.querySelectorAll(`.hit-miss-target-cells${boardNum}`),

    allPlaceShipsClass: document.querySelectorAll(
      `.all-p${boardNum}-place-ships`
    ),

    placeA: document.querySelector(`#place-a${boardNum}`),
    placeB: document.querySelector(`#place-b${boardNum}`),
    placeD: document.querySelector(`#place-d${boardNum}`),
    placeS: document.querySelector(`#place-s${boardNum}`),
    placeC: document.querySelector(`#place-c${boardNum}`),
  };
}


  function takeTurnsPvsC() {
    const { player1Attack, player2ComputerAttack } = handleMessageContent();
    if (player2.playerType === "machine") {
      // console.log(player2.playerType);
      if (playerTurn > 0 && playerTurn % 2 === 0) {
        // clearMessage();
        // addMessage(player1Attack);
      }
      if (playerTurn > 0 && playerTurn % 2 !== 0) {
        clearMessage();

        let { randomRow, randomCol } = getUniqueRandomCoordinates();
        let hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
        // setTimeout(() => {
        // hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
        // }, 500);
        addMessage(
          `${player2ComputerAttack} and it is a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}).`
        );
        // console.log(
        //   `Last attack by P2 was a ${hitOrMiss} at (${randomRow}, ${randomCol})`
        // );

        //console.log(testGame1.receiveAttack(randomRow, randomCol));
        // console.log(`Turn before P2 = ${playerTurn}`);
        playerTurn += 1;
        // console.log(`Turn after P2 = ${playerTurn}`);
        mp3Fire();
        // console.log(randomRow, randomCol);
        // START HERE ON THURSDAY...

        // testGame1.receiveAttack(randomRow, randomCol);
        addEmojiEffect(player1.playerBoard.board, 1);
        colorSunkShips(testGame1, 1);
        highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
        // console.table(player1.playerBoard.board);
      }
    }
  }