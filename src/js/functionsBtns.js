import {
  getBoardElements,
  getBtnElements,
  getHeaderElements,
} from "./domQueries.js";
import {
  addMessage, 
  clearMessage,
  handleMessageContent,
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

export function handleBtnNumPlayer(playerNum) {
  const { p1FullBoard, p2FullBoard } = getBoardElements();

  if (playerNum === 1) {
    swapInPlaceShipScreenElements();
    p1FullBoard.style.display = "flex";
    p2FullBoard.style.display = "none";
  }

  if (playerNum === 2) {
    swapInPlaceShipScreenElements();
    p1FullBoard.style.display = "none";
    p2FullBoard.style.display = "flex";
  }
}



// export function handleBtnQuitGame() {
//   const { gifContainer } = getHeaderElements();
//   const { btnPvsC, btnPvsP, btnQuitGame, btnStartGame } = getBtnElements();
//   const { p1FullBoard, p2FullBoard } = getBoardElements();
//   const { startGameMsg } = handleMessageContent();

//   gifContainer.style.display = "flex";
//   btnPvsC.style.display = "flex";
//   btnPvsP.style.display = "flex";
//   btnQuitGame.style.display = "none";
//   btnStartGame.style.display = "none";
//   p1FullBoard.style.display = "none";
//   p2FullBoard.style.display = "none";

//   clearMessage();
//   addMessage(startGameMsg);
// }

export function handleBtnStartGame() {}

export function handleBtnRotateShips(boardNum) {
  // const { btnRotateId } = getBtnElements(boardNum);
  const { x5GridId } = getBtnElements(boardNum);
  const { allPlaceShipsClass } = getBtnElements(boardNum);

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

    x5GridId.style.transform = `rotate(${currentRotation}deg)`;
  };

  // Return the rotation handler function to be called externally
  return rotateShips;
}

export function handleBtnUndoLastShip() {}

export function handleBtnClearAllShips(boardNum) {
  const { placeA, placeB, placeD, placeS, placeC } = getBoardElements(boardNum);

  //   placeA.style.display = "flex";
  //   placeB.style.display = "flex";
  //   placeD.style.display = "flex";
  //   placeS.style.display = "flex";
  //   placeC.style.display = "flex";

  const placeShips = [placeA, placeB, placeD, placeS, placeC];
  placeShips.forEach((placeShip) => (placeShip.style.display = "flex"));

  handleResetPlaceShips(boardNum);
  removeAllShipSvgsOnShipGrid(boardNum);

  //   }
  // return clearShips;
  //   console.log(boardNum);
}



export function randomShipPlacementCoordinateHelper() {
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);
  const randomShipCoordinateResult = `(${row}, ${col})`;
  return randomShipCoordinateResult;
}

export function handleBtnRandomShipPlacement() {
 
    const hitMissCells = document.querySelectorAll(
      `.hit-miss-cells${boardNum}`
    );
    // TODO-how do I rewrite below to account for domQueries references?
    const shipPlaces = {
      a: document.querySelector(`#place-a${boardNum}`),
      b: document.querySelector(`#place-b${boardNum}`),
      d: document.querySelector(`#place-d${boardNum}`),
      s: document.querySelector(`#place-s${boardNum}`),
      c: document.querySelector(`#place-c${boardNum}`),
    };

    const ships = {
      a: testGame[boardNum].ships[0],
      b: testGame[boardNum].ships[1],
      d: testGame[boardNum].ships[2],
      s: testGame[boardNum].ships[3],
      c: testGame[boardNum].ships[4],
    };

    hitMissCells.forEach((cell) => {
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
              placedShipListArr[boardNum].push(ship.boardCode);
              console.log(testGame[boardNum].allShipsArePlaced());
              console.log(player[boardNum].playerBoard.board);
              console.log(placedShipListArr[boardNum]);
              checkIfPlaceShipsAreAllPlaced(boardNum);
            }
          }
        }
      });
    });
  }
