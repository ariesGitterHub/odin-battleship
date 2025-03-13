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
    btnUndo: document.querySelector(`#p${boardNum}-btn-undo`),
    btnClear: document.querySelector(`#p${boardNum}-btn-clear`),
    p2BtnRandom: document.querySelector("#p2-btn-random"),
    btnRandom: document.querySelector(`#p${boardNum}-btn-random`),
  };
}

export function getBoardElements(boardNum) {
  return {
    appContainer: document.querySelector("#app-container"),
    boardContainer: document.querySelector("#board-container"),
    p1FullBoard: document.querySelector("#p1-full-board"),
    p2FullBoard: document.querySelector("#p2-full-board"),
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
  };
}