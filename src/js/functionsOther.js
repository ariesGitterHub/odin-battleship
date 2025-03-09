import { createImgShip } from "./functionTemplates.js";
import {
  getBoardElements,
  getBtnElements,
  getHeaderElements,
  getMessageElements,
} from "./domQueries.js";

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

export function addMessage(msg) {
  const { messageBar } = getMessageElements();
  // checkMessageFontSize(msg);
  messageBar.innerText = msg;
}

// function checkMessageFontSize(msg) {
//   const { messageBar } = getMessageElements();
//   const { player1DeployShipsMsg, player2DeployShipsMsg } =
//     handleMessageContent();

//   if (
//     msg === player1DeployShipsMsg ||
//     msg === player2DeployShipsMsg
//   ) {
//     messageBar.style.fontSize = ".8rem";
//   } else {
//     messageBar.style.fontSize = ".8rem";
//   }
// }

export function clearMessage() {
  const { messageBar } = getMessageElements();
  messageBar.innerText = "";
}

export function handleMessageContent() {
  const player1 = "PLAYER 1";
  const player2 = "PLAYER 2";
  const deployShipsMsg = `Deploy your fleet: Click a ship to highlight it in red. Then, click on the desired "deployment zone" square to place that ship. Or, click RANDOM to auto-deploy your fleet.`;
  const rotateMsg = `This button rotates a ship's vertical/horizontal axis. Remember to highlight a ship prior to placing it.`;
  const undoMsg = `This button undoes the last immediate ship placement made to the deployment zone. Re-highlight ships to place ships anew.`;
  const unlockScreen = `: UNLOCK screen.`;
  const clickCellToAttack = `: Click on a square in the ENEMY TARGET ZONE grid to attack.`;
  const clickStartGameInPvsC = `Click START to begin your match against PLAYER 2 (controlled by the computer).`;
  const clickAcceptGameInPvsP = `Click ACCEPT if your "deployment zone" ship placements are acceptable.`;
  const endGameWin = `is VICTORIOUS! The enemy fleet has been sunk.`;
  return {
    deployShipsMsg: deployShipsMsg,
    rotateMsg: rotateMsg,
    undoMsg: undoMsg,
    player1UnlockScreen: `${player1}${unlockScreen}`,
    player2UnlockScreen: `${player2}${unlockScreen}`,
    player1ClickCellToAttack: `${player1}${clickCellToAttack}`,
    player2ClickCellToAttack: `${player2}${clickCellToAttack}`,
    clickStartGameInPvsC: clickStartGameInPvsC,
    clickAcceptGameInPvsP: clickAcceptGameInPvsP,
    player1Wins: `${player1} ${endGameWin}`,
    player2Wins: `${player2} ${endGameWin}`,
  };
}

// Ship placement related
export function orientShipSvgOnShipGrid(boardNum, shipType, axis, x, y) {
  // Define transformation and image data for each ship type
  const shipData = {
    a: { translate: "3.6rem", rotate: 90, image: nA },
    b: { translate: "2.7rem", rotate: 90, image: nB },
    d: { translate: "1.8rem", rotate: 90, image: nD },
    s: { translate: "1.8rem", rotate: 90, image: nS },
    c: { translate: "0.9rem", rotate: 90, image: nC },
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
}

export function removeAllShipSvgsOnShipGrid(boardNum) {
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
          cellShip.style.backgroundColor = "var(--text)";
          cellShipTarget.style.backgroundColor = "var(--text)";
        }
      });
      if (board.ships.every((ship) => ship.isSunk())) {
        document.querySelector(shipBoardId).style.backgroundColor =
          "var(--loser)";
        document.querySelector(targetShipBoardId).style.backgroundColor =
          "var(--loser)";
      }
    }
  }
}

// export function addEmojiEffect(board, boardNum) {
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const baseId = `${boardNum === 1 ? "HMG1" : "HMG2"}: (${i},${j})`;
//       let cell = document.getElementById(baseId);
//       let cellTarget = document.getElementById(`T-${baseId}`);
//       let cellShip = document.getElementById(`SG${boardNum}: (${i},${j})`);
//       let cellShipTarget = document.getElementById(
//         `T-SG${boardNum}: (${i},${j})`
//       );

//       if (
//         board[i][j] === "A!" ||
//         board[i][j] === "B!" ||
//         board[i][j] === "D!" ||
//         board[i][j] === "S!" ||
//         board[i][j] === "C!"
//       ) {
//         cell.innerText = "💥";
//         cellTarget.innerText = "💥";
//         cellShip.style.backgroundColor = "var(--hit)";
//         cellShipTarget.style.backgroundColor = "var(--hit)";
//         mp3Hit();
//       } else if (board[i][j] === "mm") {
//         cell.innerText = "💨";
//         cell.style.transform = "rotate(-90deg)";
//         cellTarget.innerText = "💨";
//         cellTarget.style.transform = "rotate(-90deg)";
//         cellShip.style.backgroundColor = "var(--miss)";
//         cellShipTarget.style.backgroundColor = "var(--miss)";
//         mp3Miss();
//       } else {
//         cell.innerText = "  ";
//         cellTarget.innerText = "  ";
//       }
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

// TRIED requestAnimationFrame()...got emojis to work on Apple but affected colorSunkShips() adversely.
// export function addEmojiEffect(board, boardNum) {
//   // Create an animation function that will be applied to each cell.
//   function animateEmoji(cell, targetCell, cellShip, cellShipTarget, emojiType) {
//     let startTime = null;
//     const duration = 500; // Duration of the effect in milliseconds
//     const initialTransform = cell.style.transform || "rotate(0deg)"; // Starting transform state
//     const initialOpacity = cell.style.opacity || 0;

//     // Animation function using requestAnimationFrame
//     function animate(timestamp) {
//       if (!startTime) startTime = timestamp;
//       const progress = timestamp - startTime;

//       // Calculate the progress of the animation
//       const progressRatio = Math.min(progress / duration, 1);

//       // Apply smooth transitions for rotation and opacity
//       if (emojiType === "hit") {
//         // For "💥", we could animate a quick fade-in and background change
//         cell.style.opacity = progressRatio; // Fading in the hit emoji
//         targetCell.style.opacity = progressRatio;
//         cellShip.style.backgroundColor = "var(--hit)";
//         cellShipTarget.style.backgroundColor = "var(--hit)";
//       } else if (emojiType === "miss") {
//         // For "💨", we could animate rotation and fading in
//         cell.style.transform = `rotate(${progressRatio * -90}deg)`; // Rotate from 0deg to -90deg
//         targetCell.style.transform = `rotate(${progressRatio * -90}deg)`;
//         cell.style.opacity = progressRatio;
//         targetCell.style.opacity = progressRatio;
//         cellShip.style.backgroundColor = "var(--miss)";
//         cellShipTarget.style.backgroundColor = "var(--miss)";
//       }

//       // If the animation hasn't finished, request the next frame
//       if (progress < duration) {
//         requestAnimationFrame(animate);
//       } else {
//         // Ensure final states are applied once the animation ends
//         cell.style.opacity = 1;
//         targetCell.style.opacity = 1;
//         if (emojiType === "miss") {
//           cell.style.transform = "rotate(-90deg)";
//           targetCell.style.transform = "rotate(-90deg)";
//         }
//       }
//     }

//     // Start the animation loop
//     requestAnimationFrame(animate);
//   }

//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const baseId = `${boardNum === 1 ? "HMG1" : "HMG2"}: (${i},${j})`;
//       let cell = document.getElementById(baseId);
//       let cellTarget = document.getElementById(`T-${baseId}`);
//       let cellShip = document.getElementById(`SG${boardNum}: (${i},${j})`);
//       let cellShipTarget = document.getElementById(
//         `T-SG${boardNum}: (${i},${j})`
//       );

//       if (
//         board[i][j] === "A!" ||
//         board[i][j] === "B!" ||
//         board[i][j] === "D!" ||
//         board[i][j] === "S!" ||
//         board[i][j] === "C!"
//       ) {
//         cell.innerText = "💥";
//         cellTarget.innerText = "💥";
//         // Call the animateEmoji function with the "hit" emoji type
//         animateEmoji(cell, cellTarget, cellShip, cellShipTarget, "hit");
//         mp3Hit();
//       } else if (board[i][j] === "mm") {
//         cell.innerText = "💨";
//         cellTarget.innerText = "💨";
//         // Call the animateEmoji function with the "miss" emoji type
//         animateEmoji(cell, cellTarget, cellShip, cellShipTarget, "miss");
//         mp3Miss();
//       } else {
//         cell.innerText = "  ";
//         cellTarget.innerText = "  ";
//         // Reset to default state if the cell isn't a hit or miss
//         cell.style.opacity = 0;
//         cellTarget.style.opacity = 0;
//         cell.style.transform = "rotate(0deg)";
//         cellTarget.style.transform = "rotate(0deg)";
//       }
//     }
//   }
// }

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
  const placeShips = document.querySelector(placeShipsId);
  const targetZoneId = boardNum === 1 ? "#p1-target-zone" : "#p2-target-zone";
  const targetZone = document.querySelector(targetZoneId);
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

      if (validTargetSymbols.includes(board[i][j])) {
        cellTarget.classList.add("mouse-target");
      } else {
        cellTarget.classList.remove("mouse-target");
      }

      if (placeShips.style === "none") {
        cellDeploy.classList.remove("mouse-deploy");
      } else if (targetZone.style.display === "flex") {
        cellDeploy.classList.remove("mouse-deploy");
      } else if (validDeploySymbols.includes(board[i][j])) {
        cellDeploy.classList.add("mouse-deploy");
      }
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

// Keep below?
// const lastHitTargetCoordinates = priorHitCoordinatesArray[priorHitCoordinatesArray.length - 1];
// const hunterCoordinatesArray = Array.from(hunterCoordinatesSet);

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
        // console.log("Attack Style: Basic Random Approach");
        randomRow = getRandomRow();
        randomCol = getRandomCol();
        coordinates = `${randomRow},${randomCol}`;
      } while (noRepeatCoordinatesSet.has(coordinates)); // Ensure uniqueness
    } else {
      // Continue targeting in the checkerboard pattern if not all cells have been targeted
      do {
        // console.log("Attack Style: Checkerboard 'Hunter' Approach");
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
  click.currentTime = 0; // Resets the audio to the beginning
  click.play();
}

const placePop = new Audio(placeShipPop);
placePop.preload = "auto";

export function mp3PlacePop() {
  placePop.currentTime = 0; // Resets the audio to the beginning
  placePop.play();
}

const removePop = new Audio(removeShipPop);
removePop.preload = "auto";

export function mp3RemovePop() {
  removePop.currentTime = 0; // Resets the audio to the beginning
  removePop.play();
}

const fire = new Audio(fireAtTarget);
fire.preload = "auto";

export function mp3Fire() {
  fire.currentTime = 0; // Resets the audio to the beginning
  fire.play();
}

const hit = new Audio(hitExplosion);
hit.preload = "auto";

export function mp3Hit() {
  hit.currentTime = 0; // Resets the audio to the beginning
  hit.play();
}

const miss = new Audio(missSplash);
miss.preload = "auto";

export function mp3Miss() {
  miss.currentTime = 0; // Resets the audio to the beginning
  miss.play();
}

const sink = new Audio(sinkIntoDarkness);
sink.preload = "auto";

export function mp3Sink() {
  sink.currentTime = 0; // Resets the audio to the beginning
  sink.play();
}
