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
    btnRotate: document.querySelector(`#p${boardNum}-btn-rotate`),
    x5GridId: document.querySelector(`#p${boardNum}-x5-grid`),
    allPlaceShipsClass: document.querySelectorAll(
      `.all-p${boardNum}-place-ships`
    ),

    btnClear: document.querySelector(`#p${boardNum}-btn-clear`),
    btnRandom: document.querySelector(`#p${boardNum}-btn-random`),
    // const shipCellsId = document.querySelectorAll(`.ship-cells${boardNum}`);
  };
}

export function getBoardElements(boardNum) {
  return {
    boardContainer: document.querySelector("#board-container"),
    p1FullBoard: document.querySelector("#p1-full-board"),
    p2FullBoard: document.querySelector("#p2-full-board"),
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
