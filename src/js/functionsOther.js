import {
  createElement,
  createImg,
  createImgShip,
} from "./functionTemplates.js";
// import { Ship } from "./ship.js";
// import { Gameboard } from "./gameboard.js";
import {
  getBoardElements,
  getBtnElements,
  getHeaderElements,
  getMessageElements,
} from "./domQueries.js";

import anchorIcon from "../assets/anchor.svg";

// Normal ships
import nA from "../assets/ship5A.svg";
import nB from "../assets/ship4B.svg";
import nD from "../assets/ship3D.svg";
import nS from "../assets/ship3S.svg";
import nC from "../assets/ship2C.svg";
// import nP from "../assets/ship1P.svg";

// Black ships
import bA from "../assets/ship5A-b.svg";
import bB from "../assets/ship4B-b.svg";
import bD from "../assets/ship3D-b.svg";
import bS from "../assets/ship3S-b.svg";
import bC from "../assets/ship2C-b.svg";
// import bP from "../assets/ship1P-b.svg";

// Highlighted ships
import hA from "../assets/ship5A-h.svg";
import hB from "../assets/ship4B-h.svg";
import hD from "../assets/ship3D-h.svg";
import hS from "../assets/ship3S-h.svg";
import hC from "../assets/ship2C-h.svg";
// import hP from "../assets/ship1P-r.svg";

// Sound effects
import btnClick from "../assets/soundClick.mp3";
import placeShipPop from "../assets/soundPop1.mp3";
import removeShipPop from "../assets/soundPop2.mp3";
import fireAtTarget from "../assets/soundFireAtTarget.mp3";
import hitExplosion from "../assets/soundHitExplosion.mp3";
import missSplash from "../assets/soundMissSplash.mp3";
import sinkIntoDarkness from "../assets/soundSinkIntoDarkness.mp3";

// Message related

// export function addMessage(msg) {
//   const { messageBar } = getMessageElements();
//   messageBar.innerText = msg;
// }

export function addMessage(msg) {
  const { messageBar } = getMessageElements();
  checkMessageFontSize(msg);
  messageBar.innerText = msg;
}

function checkMessageFontSize(msg) {
  const { messageBar } = getMessageElements();
  const { player1DeployShipsMsg, player2DeployShipsMsg } =
    handleMessageContent();

  if (
    msg === player1DeployShipsMsg ||
    msg === player2DeployShipsMsg
  ) {
    messageBar.style.fontSize = ".8rem";
  } else {
    messageBar.style.fontSize = "1rem";
  }
}

export function clearMessage() {
  const { messageBar } = getMessageElements();
  messageBar.innerText = "";
}

export function handleMessageContent() {
  const player1 = "PLAYER 1";
  const player2 = "PLAYER 2";
   const deployShips =
    `: Deploy your ships. ROTATE to select axis. Click a ship to highlight it in RED. Then, click on the desired "deployment zone" square below to place that ship. Or, click RANDOM to auto-deploy your ships.`; 
    const unlockScreen = `: UNLOCK screen.`;
    const clickCellToAttack = `: Below, click on a cell in your ENEMY TARGET ZONE grid to attack the enemy fleet.`;
    // Player vs Computer matches only.
    const clickStartGameInPvsC = `Click START to begin your match against PLAYER 2 (run by the computer).`;
    const endGameWin = "is VICTORIOUS! The enemy fleet has been sent to the cold, dark depths.";
  return {
    player1DeployShipsMsg: `${player1}${deployShips}`,
    player2DeployShipsMsg: `${player2}${deployShips}`,
    player1UnlockScreen: `${player1}${unlockScreen}`,
    player2UnlockScreen: `${player2}${unlockScreen}`,
    player1ClickCellToAttack: `${player1}${clickCellToAttack}`,
    player2ClickCellToAttack: `${player2}${clickCellToAttack}`,

    clickStartGameInPvsC: `${clickStartGameInPvsC}`,

    player1Wins: `${player1} ${endGameWin}`,
    player2Wins: `${player2} ${endGameWin}`,
  };
}

// Ship placement related

export function orientShipSvgOnShipGrid(boardNum, shipType, axis, x, y) {
  // Define transformation and image data for each ship type
  const shipData = {
    // a: { translate: "4rem", rotate: 90, image: nA },
    // b: { translate: "3rem", rotate: 90, image: nB },
    // d: { translate: "2rem", rotate: 90, image: nD },
    // s: { translate: "2rem", rotate: 90, image: nS },
    // c: { translate: "1rem", rotate: 90, image: nC },
    a: { translate: "3rem", rotate: 90, image: nA },
    b: { translate: "2.25rem", rotate: 90, image: nB },
    d: { translate: "1.5rem", rotate: 90, image: nD },
    s: { translate: "1.5rem", rotate: 90, image: nS },
    c: { translate: ".75rem", rotate: 90, image: nC },
  };

  // Only process if the shipType exists in the shipData
  if (!shipData[shipType]) return;

  const shipInfo = shipData[shipType];
  const baseId = `${boardNum === 1 ? "SG1" : "SG2"}: (${x},${y})`;
  const shipBoardCellId = document.getElementById(baseId);

  const ship = createImgShip(
    `ship-${shipType}${boardNum}`,
    shipType,
    shipInfo.image,
    "ship"
  );

  // Apply transformations based on the axis
  if (axis === "v") {
    ship.style.transform = `translateY(${shipInfo.translate}) rotate(${shipInfo.rotate}deg)`;
  } else {
    ship.style.transform = `translateX(${shipInfo.translate})`;
  }

  // Append the ship image to the grid cell
  shipBoardCellId.appendChild(ship);
  // shipBoardCellId.append(ship);
}

// export function removeAllShipSvgsOnShipGrid(boardNum) {
//   const shipCellsClass = document.querySelectorAll(`.ship-cells${boardNum}`);
//   // const shipA = document.querySelector(`#ship-a${boardNum}`);
//   // const shipB = document.querySelector(`#ship-b${boardNum}`);
//   const ships = document.querySelectorAll(".ship");
//   shipCellsClass.forEach(div => {
//     for (let ship in ships) {
//     if (div.hasChildNodes(ship)) {
//       div.removeChild(ship);
//     }
//     }

//   })
// }

// TODO - IS THIS FUNCTION STILL BEING USED?????
export function removeAllShipSvgsOnShipGrid(boardNum) {
  // const shipCellsClass = document.querySelectorAll(`.ship-cells${boardNum}`);
  // const ships = document.querySelectorAll(".ship");

  const { shipCellsClass } = getBoardElements(boardNum);
  const { ships } = getBoardElements();

  // Iterate over each grid cell (div with the ship-cells class)
  shipCellsClass.forEach((div) => {
    // For each ship, check if it's a child of the current div
    ships.forEach((ship) => {
      if (div.contains(ship)) {
        div.removeChild(ship); // Remove the ship from the div
      }
    });
  });
}

// export function removeSingleShipSvgOnShipGrid(boardNum, lastShip) {
//   // const shipCellsClass = document.querySelectorAll(`.ship-cells${boardNum}`);
//   // const ships = document.querySelectorAll(".ship");

//   // const { shipCellsClass } = getBoardElements(boardNum);
//   const { placeA, placeB, placeD, placeS, placeC, shipA, shipB, shipD, shipS, shipC } = getBoardElements(boardNum);

//   const ships = [
//     { boardCode: "a", ship: shipA, place: placeA },
//     { boardCode: "b", ship: shipB, place: placeB },
//     { boardCode: "d", ship: shipD, place: placeD },
//     { boardCode: "s", ship: shipS, place: placeS },
//     { boardCode: "c", ship: shipC, place: placeC },
//   ];

//     if (lastShip === "a") {
//       shipA.remove();
//       placeA.style.display = "flex";
//     }
//     if (lastShip === "b") {
//       shipB.remove();
//       placeB.style.display = "flex";
//     }
//     if (lastShip === "d") {
//       shipD.remove();
//       placeD.style.display = "flex";
//     }
//     if (lastShip === "s") {
//       shipS.remove();
//       placeS.style.display = "flex";
//     }
//     if (lastShip === "c") {
//       shipC.remove();
//       placeC.style.display = "flex";
//     }
//   }


// export function highlightPlaceShips(boardNum) {
// //   const allPlaceShipsClass = document.querySelectorAll(
// //     `.all-p${boardNum}-place-ships`
// //   );
// const { allPlaceShipsClass } = getBoardElements(boardNum);

//   const shipData = {
//     a: { blackImg: bA, highlightImg: hA },
//     b: { blackImg: bB, highlightImg: hB },
//     d: { blackImg: bD, highlightImg: hD },
//     s: { blackImg: bS, highlightImg: hS },
//     c: { blackImg: bC, highlightImg: hC },
//   };

//   allPlaceShipsClass.forEach((ship) =>
//     ship.addEventListener("click", () => {
//       const shipKey = ship.dataset.ship;

//       // This hits ALL ship keys for the current board
//       const allShipKeys = Object.keys(shipData);
//       const otherShipKeys = allShipKeys.filter((key) => key !== shipKey);

//       // Black and highlight images
//       const blackImg = shipData[shipKey].blackImg;
//       const highlightImg = shipData[shipKey].highlightImg;

//       // If the ship is not highlighted, highlight it, then reset others for this board
//       if (ship.src === blackImg && ship.dataset.selected === "") {
//         ship.src = highlightImg;
//         ship.dataset.selected = "yes";

//         // Reset all other ships for this board to black images and unselect
//         otherShipKeys.forEach((key) => {
//           const otherShip = shipData[key];
//           const shipElement = document.querySelector(
//             `#place-${key}${boardNum}`
//           );
//           shipElement.src = otherShip.blackImg; // Reset to black image
//           shipElement.dataset.selected = ""; // Unselect
//            });
//       }
//       // If this ship is already highlighted, unhighlight it and reset others for this board
//       else if (ship.src === highlightImg && ship.dataset.selected === "yes") {
//         ship.src = blackImg;
//         ship.dataset.selected = "";
//         // ship.classList.remove("draggable");

//         // Reset all other ships for this board to black images and unselect
//         otherShipKeys.forEach((key) => {
//           const otherShip = shipData[key];
//           // Below was the final change needed to get both boards working
//           const shipElement = document.querySelector(
//             `#place-${key}${boardNum}`
//           );
//           shipElement.src = otherShip.blackImg; // Reset to black image
//           shipElement.dataset.selected = ""; // Unselect
//         });
//       }
//     })
//   );
// }

// Game function related

export function removeSingleShipSvgOnShipGrid(boardNum, lastShip) {
  const {
    placeA,
    placeB,
    placeD,
    placeS,
    placeC,
    shipA,
    shipB,
    shipD,
    shipS,
    shipC,
  } = getBoardElements(boardNum);

  // Define the ships and their corresponding elements
  const ships = [
    { boardCode: "a", ship: shipA, place: placeA },
    { boardCode: "b", ship: shipB, place: placeB },
    { boardCode: "d", ship: shipD, place: placeD },
    { boardCode: "s", ship: shipS, place: placeS },
    { boardCode: "c", ship: shipC, place: placeC },
  ];

  // Find the ship with the matching `lastShip` code
  const shipToRemove = ships.find((ship) => ship.boardCode === lastShip);

  // If a matching ship is found, remove it and update its place display
  if (shipToRemove) {
    mp3RemovePop();
    shipToRemove.ship.remove();
    shipToRemove.place.style.display = "flex";
  }
}

export function highlightPlaceShipsHelper(boardNum) {
  const { allPlaceShipsClass } = getBoardElements(boardNum);

  const shipData = {
    a: { blackImg: bA, highlightImg: hA },
    b: { blackImg: bB, highlightImg: hB },
    d: { blackImg: bD, highlightImg: hD },
    s: { blackImg: bS, highlightImg: hS },
    c: { blackImg: bC, highlightImg: hC },
  };

  allPlaceShipsClass.forEach((ship) => {
    // Here we just set up the handler but don't attach the event listener
    ship.dataset.boardNum = boardNum; // Store boardNum for later use in the handler
  });
  return shipData; // return shipData so that index.js can use it when attaching listeners
}

export function handleHighlightPlaceShip(ship, boardNum, shipData) {
  const shipKey = ship.dataset.ship;

  // This hits ALL ship keys for the current board
  const allShipKeys = Object.keys(shipData);
  const otherShipKeys = allShipKeys.filter((key) => key !== shipKey);

  // Black and highlight images
  const blackImg = shipData[shipKey].blackImg;
  const highlightImg = shipData[shipKey].highlightImg;

  // If the ship is not highlighted, highlight it, then reset others for this board
  if (ship.src === blackImg && ship.dataset.selected === "") {
    ship.src = highlightImg;
    ship.dataset.selected = "yes";

    // Reset all other ships for this board to black images and unselect
    otherShipKeys.forEach((key) => {
      const otherShip = shipData[key];
      const shipElement = document.querySelector(`#place-${key}${boardNum}`);
      shipElement.src = otherShip.blackImg; // Reset to black image
      shipElement.dataset.selected = ""; // Unselect
    });
  }
  // If this ship is already highlighted, unhighlight it and reset others for this board
  else if (ship.src === highlightImg && ship.dataset.selected === "yes") {
    ship.src = blackImg;
    ship.dataset.selected = "";

    // Reset all other ships for this board to black images and unselect
    otherShipKeys.forEach((key) => {
      const otherShip = shipData[key];
      const shipElement = document.querySelector(`#place-${key}${boardNum}`);
      shipElement.src = otherShip.blackImg; // Reset to black image
      shipElement.dataset.selected = ""; // Unselect
    });
  }
}

export function handleResetPlaceShips(boardNum) {
  const allPlaceShipsClass = document.querySelectorAll(
    `.all-p${boardNum}-place-ships`
  );

  const shipData = {
    a: { blackImg: bA },
    b: { blackImg: bB },
    d: { blackImg: bD },
    s: { blackImg: bS },
    c: { blackImg: bC },
  };

  allPlaceShipsClass.forEach((ship) => {
    const shipKey = ship.dataset.ship;
    const blackImg = shipData[shipKey].blackImg;

    if (ship.src !== blackImg) {
      ship.src = blackImg;
      ship.dataset.selected = "";
    }
  });
}

export function colorSunkShips(board, boardNum) {
  const shipBoardId = boardNum === 1 ? "#p1-ship-board" : "#p2-ship-board";
  const targetShipBoardId =
    boardNum === 1 ? "#p2-target-ship-board" : "#p1-target-ship-board";

  for (let i = 0; i < board.board.length; i++) {
    for (let j = 0; j < board.board[i].length; j++) {
      let cellShip = document.getElementById(
        `SG${boardNum === 1 ? 1 : 2}: (${i},${j})`
      );
      let cellShipTarget = document.getElementById(
        `T-SG${boardNum === 1 ? 1 : 2}: (${i},${j})`
      );

      ["A!", "B!", "D!", "S!", "C!"].forEach((shipCode, index) => {
        if (board.ships[index].isSunk() && board.board[i][j] === shipCode) {
          // mp3Sink();
          cellShip.style.backgroundColor = "var(--text)";
          cellShipTarget.style.backgroundColor = "var(--text)";
        }
      });
      if (board.ships.every((ship) => ship.isSunk())) {
        // mp3Sink(); // When all ships are sunk...
        document.querySelector(shipBoardId).style.backgroundColor =
          "var(--loser)";
        document.querySelector(targetShipBoardId).style.backgroundColor =
          "var(--loser)";
      }
    }
  }
}

// export function clearColorSunkShips(board, boardNum) {
//   const shipBoardId = boardNum === 1 ? "#p1-ship-board" : "#p2-ship-board";
//   const targetShipBoardId =
//     boardNum === 1 ? "#p2-target-ship-board" : "#p1-target-ship-board";

//   for (let i = 0; i < board.board.length; i++) {
//     for (let j = 0; j < board.board[i].length; j++) {
//       let cellShip = document.getElementById(
//         `SG${boardNum === 1 ? 1 : 2}: (${i},${j})`
//       );
//       let cellShipTarget = document.getElementById(
//         `T-SG${boardNum === 1 ? 1 : 2}: (${i},${j})`
//       );

//       ["A!", "B!", "D!", "S!", "C!"].forEach((shipCode, index) => {
//         if (
//           board.ships[index].clearHitsAndSunkStatus() &&
//           board.board[i][j] === shipCode
//         ) {
//           cellShip.style.backgroundColor = "var(--sea)";
//           cellShipTarget.style.backgroundColor = "var(--sea)";
//         }
//       });

//       // if (board.ships.every((ship) => ship.isSunk())) {
//       //   document.querySelector(shipBoardId).style.backgroundColor =
//       //     "var(--loser)";
//       //   document.querySelector(targetShipBoardId).style.backgroundColor =
//       //     "var(--loser)";
//       // }
//     }
//   }
// }

export function addEmojiEffect(board, boardNum) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const baseId = `${boardNum === 1 ? "HMG1" : "HMG2"}: (${i},${j})`;
      let cell = document.getElementById(baseId);
      let cellTarget = document.getElementById(`T-${baseId}`);
      let cellShip = document.getElementById(`SG${boardNum}: (${i},${j})`);
      let cellShipTarget = document.getElementById(
        `T-SG${boardNum}: (${i},${j})`
      );

      if (
        board[i][j] === "A!" ||
        board[i][j] === "B!" ||
        board[i][j] === "D!" ||
        board[i][j] === "S!" ||
        board[i][j] === "C!"
      ) {
        cell.innerText = "💥";
        cellTarget.innerText = "💥";
        cellShip.style.backgroundColor = "var(--hit)";
        cellShipTarget.style.backgroundColor = "var(--hit)";
        mp3Hit();
      } else if (board[i][j] === "mm") {
        cell.innerText = "💨";
        cell.style.transform = "rotate(-90deg)";
        cellTarget.innerText = "💨";
        cellTarget.style.transform = "rotate(-90deg)";
        cellShip.style.backgroundColor = "var(--miss)";
        cellShipTarget.style.backgroundColor = "var(--miss)";
        mp3Miss();
      } else {
        cell.innerText = "  ";
        cellTarget.innerText = "  ";
      }
    }
  }
}

export function clearEmojiEffect(board, boardNum) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const baseId = `${boardNum === 1 ? "HMG1" : "HMG2"}: (${i},${j})`;
      let cell = document.getElementById(baseId);
      let cellTarget = document.getElementById(`T-${baseId}`);
      let cellShip = document.getElementById(`SG${boardNum}: (${i},${j})`);
      let cellShipTarget = document.getElementById(
        `T-SG${boardNum}: (${i},${j})`
      );

      if (board[i][j] !== "  ") {
        cell.innerText = "  ";
        cellTarget.innerText = "  ";
        cellTarget.classList.add("mouse-target"); // THIS FIXED PROBLEM OF NOT SEEING TARGET CURSOR...
        cellShip.style.backgroundColor = "var(--sea)";
        cellShipTarget.style.backgroundColor = "var(--sea)";
      }
    }
  }
}

export function highlightEmptyCellOnlyOnHover(board, boardNum) {
  const placeShipsId = boardNum === 1 ? "#p1-place-ships" : "#p2-place-ships";
  // console.log("placeShipsId:", placeShipsId);
  const placeShips = document.querySelector(placeShipsId);
  // console.log("placeShips:", placeShips);

  const targetZoneId = boardNum === 1 ? "#p1-target-zone" : "#p2-target-zone";
  const targetZone = document.querySelector(targetZoneId);

  // const targetZoneId1 = "#p1-target-zone";
  // const targetZone1 = document.querySelector(targetZoneId1);

  const validTargetSymbols = ["--", "a", "b", "d", "s", "c"];
  const validDeploySymbols = ["--"];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellDeploy = document.getElementById(
        `HMG${boardNum === 1 ? 1 : 2}: (${i},${j})`
      );
      let cellTarget = document.getElementById(
        `T-HMG${boardNum === 1 ? 1 : 2}: (${i},${j})`
      );

      // if (
      //   board[i][j] === "--" ||
      //   board[i][j] === "a" ||
      //   board[i][j] === "b" ||
      //   board[i][j] === "d" ||
      //   board[i][j] === "s" ||
      //   board[i][j] === "c"
      // )
      // {
      if (validTargetSymbols.includes(board[i][j])) {
        cellTarget.classList.add("mouse-target");
      } else {
        cellTarget.classList.remove("mouse-target");
      }

      // if (boardNum === 1 && targetZone1.style.display !== "none") {
      //   cellDeploy.classList.remove("mouse-deploy");
      // }
      if (placeShips.style === "none") {
        cellDeploy.classList.remove("mouse-deploy");
      } else if (targetZone.style.display === "flex") {
        cellDeploy.classList.remove("mouse-deploy");
      }
      // else if (placeShips.style === "flex") {
      //   cellDeploy.classList.add("mouse-deploy");
      // }
      else if (validDeploySymbols.includes(board[i][j])) {
        cellDeploy.classList.add("mouse-deploy");
      }
      // else {
      //   cellDeploy.classList.remove("mouse-deploy");
      // }
    }
  }
}

export function getRandomRow(min = 0, max = 9) {
  const randomRow = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomRow;
}

export function getRandomCol(min = 0, max = 9) {
  const randomCol = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomCol;
}

export function getRandomAxis(min = 0, max = 9) {
  const randomAxisNum = Math.floor(Math.random() * (max - min + 1)) + min;
  let randomAxis;
  if (randomAxisNum % 2 === 0) {
    randomAxis = "v";
  } else {
    randomAxis = "h";
  }
  return randomAxis;
}

// function everyOtherColDependingOnRow(row) {
//   const even = [0, 2, 4, 6, 8];
//   const odd = [1, 3, 5, 7, 9];
//   const randomIndex = Math.floor(Math.random() * even.length); // Generates a random index
//   const randomEvenNumber = even[randomIndex]; // Gets the random number from the array
//   const randomOddNumber = odd[randomIndex]; // Gets the random number from the array

//   let everyOtherColEven = randomEvenNumber;
//   let everyOtherColOdd = randomOddNumber;
//   if (row % 2 === 0) {
//     return everyOtherColEven;
//   } else if (row % 2 !== 0) {
//     return everyOtherColOdd;
//   }
// }

function everyOtherColDependingOnRow(row) {
  const even = [0, 2, 4, 6, 8];
  const odd = [1, 3, 5, 7, 9];

  if (row % 2 === 0) {
    return even[Math.floor(Math.random() * even.length)];
  } else {
    return odd[Math.floor(Math.random() * odd.length)];
  }
}

// Put these sets outside of function so that it accumulate new coordinates and not refresh itself when called
const noRepeatCoordinatesSet = new Set();
const priorHitCoordinatesSet = new Set();
const hunterCoordinatesSet = new Set();
let randomRow, randomCol, coordinates, hunterCoordinates;

const priorHitCoordinatesArray = Array.from(priorHitCoordinatesSet);
const lastHitTargetCoordinates =
  priorHitCoordinatesArray[priorHitCoordinatesArray.length - 1];
const hunterCoordinatesArray = Array.from(hunterCoordinatesSet);





// export function getUniqueRandomCoordinates(
//   hitOrMiss,
//   // lastPlayer2ComputerAttack,
//   randomRowStored,
//   randomColStored
// ) {
//   let attempts = 0;
//   let foundValidCoordinate = false;
//   let coordinateDistance = 1;
//   let lastAttackWasAHit;
//   let lastLastAttackWasAHit;

//   let adjacentCoordinates = [
//     `${randomRowStored + coordinateDistance},${randomColStored}`, // Down
//     `${randomRowStored - coordinateDistance},${randomColStored}`, // Up
//     `${randomRowStored},${randomColStored + coordinateDistance}`, // Right
//     `${randomRowStored},${randomColStored - coordinateDistance}`, // Left
//     // `${randomRowStored + 1},${randomColStored + 1}`, // Down-right (diagonal)
//     // `${randomRowStored - 1},${randomColStored - 1}`, // Up-left (diagonal)
//     // `${randomRowStored + 1},${randomColStored - 1}`, // Down-left (diagonal)
//     // `${randomRowStored - 1},${randomColStored + 1}`, // Up-right (diagonal)
//   ];

//   if (hitOrMiss === "hit") {
//     lastAttackWasAHit = true;
//     const currentHitCoordinates = `${randomRowStored},${randomColStored}`;
//     priorHitCoordinatesSet.add(currentHitCoordinates);
//   } else if (hitOrMiss === "miss" && lastAttackWasAHit) {
//     lastLastAttackWasAHit = true;
//   } else {
//     lastAttackWasAHit = false;
//     lastLastAttackWasAHit = false;
//   }

//   // Try to find a valid adjacent coordinate that hasn't been used
//   while (
//     attempts < 10 &&
//     !foundValidCoordinate &&
//     (lastAttackWasAHit || lastLastAttackWasAHit)
//   ) {
//     let randomIndex = Math.floor(Math.random() * adjacentCoordinates.length);
//     coordinates = adjacentCoordinates[randomIndex];
//     [randomRow, randomCol] = coordinates.split(",").map(Number); // Split into row and col

//     // Check if the coordinates are valid (within bounds and not used before)
//     if (
//       randomRow >= 0 &&
//       randomRow < 10 && // Ensure it's within bounds
//       randomCol >= 0 &&
//       randomCol < 10 &&
//       !noRepeatCoordinatesSet.has(coordinates) // Ensure it's not a previously used coordinate
//     ) {
//       foundValidCoordinate = true; // A valid coordinate is found
//     } else {
//       attempts++; // Increase the number of attempts
//     }
//   }

//   // If no valid coordinate found after 10 attempts, default to a random one
//   if (!foundValidCoordinate && hunterCoordinatesArray.length < 20) {
//     console.log(
//       "Hunter Mode."
//     );
//     do {
//       randomRow = getRandomRow();
//       randomCol = everyOtherColDependingOnRow(randomRow);
//       coordinates = `${randomRow},${randomCol}`;
//       hunterCoordinates = coordinates;
//     } while (noRepeatCoordinatesSet.has(coordinates)); // Ensure uniqueness
//   }

//   // If no valid coordinate found after 10 attempts, default to a random one
//   if (!foundValidCoordinate) {
//     console.log(
//       "No valid adjacent coordinate found after 10 attempts, picking random coordinate."
//     );
//     do {
//       randomRow = getRandomRow();
//       randomCol = getRandomCol();
//       coordinates = `${randomRow},${randomCol}`;
//     } while (noRepeatCoordinatesSet.has(coordinates)); // Ensure uniqueness
//   }

//   // Add the unique coordinate to the set
//   noRepeatCoordinatesSet.add(coordinates);
//   hunterCoordinatesSet.add(hunterCoordinates);
//   console.log(priorHitCoordinatesSet);
//   console.log(hunterCoordinatesSet);
//   console.log(noRepeatCoordinatesSet);

//   return {
//     randomRow,
//     randomCol,
//   };
// }


export function getUniqueRandomCoordinates(
  hitOrMiss,
  randomRowStored,
  randomColStored
) {
  let attempts = 0;
  let foundValidCoordinate = false;
  let coordinateDistance = 1;

  // List of adjacent coordinates to target after a hit
  let adjacentCoordinates = [
    `${randomRowStored + coordinateDistance},${randomColStored}`, // Down
    `${randomRowStored - coordinateDistance},${randomColStored}`, // Up
    `${randomRowStored},${randomColStored + coordinateDistance}`, // Right
    `${randomRowStored},${randomColStored - coordinateDistance}`, // Left
  ];

  // Handle hit or miss updates
  if (hitOrMiss === "hit") {
    const currentHitCoordinates = `${randomRowStored},${randomColStored}`;
    priorHitCoordinatesSet.add(currentHitCoordinates); // Add the hit coordinates to the set
  }

  // If the AI has hit something before, prioritize adjacent cells for the next move
  if (priorHitCoordinatesSet.size > 0) {
    // Search for a valid adjacent coordinate to the last hit
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
        foundValidCoordinate = true; // A valid coordinate is found
      } else {
        attempts++; // Increase the number of attempts
      }
    }
  }

  // If no valid adjacent coordinate is found after 10 attempts, or there are no hits yet
  if (!foundValidCoordinate || priorHitCoordinatesSet.size === 0) {
    // If the checkerboard pattern cells are exhausted, go back to random coordinates
    if (hunterCoordinatesSet.size >= 50) {
      // We assume 50 is the number of cells already targeted in the checkerboard pattern
      do {
        console.log("Attack Style: Basic Random Approach");
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        coordinates = `${randomRow},${randomCol}`;
      } while (noRepeatCoordinatesSet.has(coordinates)); // Ensure uniqueness
    } else {
      // Continue targeting in the checkerboard pattern if not all cells have been targeted
      do {
        console.log("Attack Style: Checkerboard 'Hunter' Approach");
        randomRow = getRandomRow();
        randomCol = everyOtherColDependingOnRow(randomRow);
        coordinates = `${randomRow},${randomCol}`;
      } while (noRepeatCoordinatesSet.has(coordinates)); // Ensure uniqueness
    }
  }

  // Add the unique coordinate to the set
  noRepeatCoordinatesSet.add(coordinates);
  hunterCoordinatesSet.add(coordinates);

  return { randomRow, randomCol };
}

const click = new Audio(btnClick);
click.preload = "auto";

export function mp3Click() {
  click.currentTime = 0; // Reset the audio to the beginning
  click.play();
}

const placePop = new Audio(placeShipPop);
placePop.preload = "auto";

export function mp3PlacePop() {
  placePop.currentTime = 0; // Reset the audio to the beginning
  placePop.play();
}

const removePop = new Audio(removeShipPop);
removePop.preload = "auto";

export function mp3RemovePop() {
  removePop.currentTime = 0; // Reset the audio to the beginning
  removePop.play();
}

const fire = new Audio(fireAtTarget);
fire.preload = "auto";

export function mp3Fire() {
  fire.currentTime = 0; // Reset the audio to the beginning
  fire.play();
}

const hit = new Audio(hitExplosion);
hit.preload = "auto";

export function mp3Hit() {
  hit.currentTime = 0; // Reset the audio to the beginning
  hit.play();
}

const miss = new Audio(missSplash);
miss.preload = "auto";

export function mp3Miss() {
  miss.currentTime = 0; // Reset the audio to the beginning
  miss.play();
}

const sink = new Audio(sinkIntoDarkness);
sink.preload = "auto";

export function mp3Sink() {
  sink.currentTime = 0; // Reset the audio to the beginning
  sink.play();
}

// export function stopGameThereIsAWinner(boardNum) {
//   const { p1ShipBoard, p2ShipBoard } = getBoardElements();
//   const { player1Wins, player2Wins } = handleMessageContent();
//   // const { hitMissTargetCellsClass } = getBoardElements(boardNum);
//   if (p1ShipBoard.style.backgroundColor === "var(--loser)") {
//     clearMessage();
//     addMessage(player2Wins);
//   }
//   if (p2ShipBoard.style.backgroundColor === "var(--loser)") {
//     clearMessage();
//     addMessage(player1Wins);
//   }

  // hitMissTargetCellsClass.forEach((cell) => {
  //   // Assuming 'cell' is the element, and you want to remove an event listener
  //   // You need to specify the event type and the handler function
  //   cell.removeEventListener("click", () => {}); // Replace `yourEventHandler` with the actual function name you want to remove
  // });
//}


// export function isSunkChecker(board, boardNum) {
//   const shipBoardId = boardNum === 1 ? "#p1-ship-board" : "#p2-ship-board";
//   const targetShipBoardId =
//     boardNum === 1 ? "#p2-target-ship-board" : "#p1-target-ship-board";

//   for (let i = 0; i < board.board.length; i++) {
//     for (let j = 0; j < board.board[i].length; j++) {
//       let cellShip = document.getElementById(
//         `SG${boardNum === 1 ? 1 : 2}: (${i},${j})`
//       );
//       let cellShipTarget = document.getElementById(
//         `T-SG${boardNum === 1 ? 1 : 2}: (${i},${j})`
//       );

//       ["A!", "B!", "D!", "S!", "C!"].forEach((shipCode, index) => {
//         if (board.ships[index].isSunk() && board.board[i][j] === shipCode) {
//           // mp3Sink();
//           cellShip.style.backgroundColor = "var(--text)";
//           cellShipTarget.style.backgroundColor = "var(--text)";
//         }
//       });

//       if (board.ships.every((ship) => ship.isSunk())) {
//         mp3Sink(); // When all ships are sunk...
//         document.querySelector(shipBoardId).style.backgroundColor =
//           "var(--loser)";
//         document.querySelector(targetShipBoardId).style.backgroundColor =
//           "var(--loser)";
//         // if (
//         //   (document.querySelector("#p1-ship-board").style.backgroundColor ===
//         //     "var(--loser)")
//         // ) {
//         //   clearMessage();
//         //   addMessage(player1Wins);
//         // }
//         // if (
//         //   (document.querySelector("#p2-ship-board").style.backgroundColor ===
//         //     "var(--loser)")
//         // ) {
//         //   clearMessage();
//         //   addMessage(player2Wins);
//         // }
//       }
//     }
//   }
// }