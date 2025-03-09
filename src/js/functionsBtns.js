import {
  getBoardElements,
  getBtnElements,
  getHeaderElements,
} from "./domQueries.js";
import {
  handleResetPlaceShips,
  removeAllShipSvgsOnShipGrid,
} from "./functionsOther.js";

// Helper function for handleBtnNumPlayer(playerNum)
function swapInPlaceShipScreenElements() {
  const { gifContainer } = getHeaderElements();
  const { btnPvsC, btnPvsP, btnQuitGame, btnStartGame } = getBtnElements();

  gifContainer.style.display = "none";
  btnPvsC.style.display = "none";
  btnPvsP.style.display = "none";
  btnQuitGame.style.display = "flex";
}

// TODO - REMOVE THIS FUNCTION IF NOTHING BREAKS
// export function handleBtnNumPlayer(playerNum) {
//   const { p1FullBoard, p2FullBoard } = getBoardElements();

//   if (playerNum === 1) {
//     swapInPlaceShipScreenElements();
//     p1FullBoard.style.display = "flex";
//     p2FullBoard.style.display = "none";
//   }

//   if (playerNum === 2) {
//     swapInPlaceShipScreenElements();
//     p1FullBoard.style.display = "none";
//     p2FullBoard.style.display = "flex";
//   }
// }

export function handleBtnStartGame() {}

export function handleBtnRotateShips(boardNum) {
  const { x5Grid } = getBoardElements(boardNum);
  const { allPlaceShipsClass } = getBoardElements(boardNum);

  let currentRotation = 0; // 0 = horizontal axis
  let rotationCount = 0;

  // Function to update the rotation state and apply the changes
  const rotateShips = () => {
    rotationCount += 1;
    if (rotationCount % 2 !== 0) {
      currentRotation = 90;
      allPlaceShipsClass.forEach((axis) => {
        axis.dataset.axis = "v";
      });
    } else {
      currentRotation = 0;
      allPlaceShipsClass.forEach((axis) => {
        axis.dataset.axis = "h";
      });
    }

    x5Grid.style.transform = `rotate(${currentRotation}deg)`;
  };

  return rotateShips;
}

export function handleBtnUndoLastShip() {}

export function handleBtnClearAllShips(boardNum) {
  const { placeA, placeB, placeD, placeS, placeC } = getBoardElements(boardNum);

  const placeShips = [placeA, placeB, placeD, placeS, placeC];
  placeShips.forEach((placeShip) => (placeShip.style.display = "flex"));

  handleResetPlaceShips(boardNum);
  removeAllShipSvgsOnShipGrid(boardNum);
}

export function randomShipPlacementCoordinateHelper() {
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);
  const randomShipCoordinateResult = `(${row}, ${col})`;
  return randomShipCoordinateResult;
}
