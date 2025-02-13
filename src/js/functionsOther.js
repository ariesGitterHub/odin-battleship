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

// Message related

export function addMessage(msg) {
  const { messageBar } = getMessageElements();
  messageBar.innerText = msg;
}

export function clearMessage() {
  const { messageBar } = getMessageElements();
  messageBar.innerText = "";
}

export function handleMessageContent() {
  const player1 = "PLAYER 1";
  const player2 = "PLAYER 2";
  const noPlayersSelectedYet = "Please select the number of players."
  const deployShips =
    ": DEPLOY YOUR SHIPS. Rotate ships to select axis. Click on any ship to highlight it in red, then click the desired deployment zone square to place ship. Or, click RANDOM BUTTON to make random ship placements.";
  const startMatchPvsC =
    ": if your ship placement is satisfactory, click the START GAME BUTTON to begin a match against the computer.";
  const placeShipPassFromP1toP2 =
    ": if your ship placement is satisfactory, click the PASS GAME BUTTON to allow PLAYER 2 to place their ships.";
  const placeShipPassFromP2toP1 =
    ": if your ship placement is satisfactory, click the PASS GAME BUTTON to allow PLAYER 1 to start the game.";
  const startMatchPvsP =
    ": click the START GAME BUTTON to begin a match against the PLAYER 2. ";
  const gameTimeAttack =
    ": click on a cell in your ENEMY TARGET ZONE grid to attack.";
  const computerAttack =
    "attacks your fleet! (See results in your Deployment Zone.)";
  // const matchIsUnderway = ""
  const endGameWin = "wins, and has sunk the enemy fleet!";
  return {
    startGameMsg: noPlayersSelectedYet,
    player1DeployShipsMsg: `${player1}${deployShips}`,
    player2DeployShipsMsg: `${player2}${deployShips}`,
    startMatchPvsC: `${player1}${startMatchPvsC}`,
    player1PassPlaceShip: `${player1}${placeShipPassFromP1toP2}`,
    player2PassPlaceShip: `${player2}${placeShipPassFromP2toP1}`,
    startMatchPvsP: `${player1}${startMatchPvsP}`,
    player1Attack: `${player1}${gameTimeAttack}`,
    player2Attack: `${player2}${gameTimeAttack}`,
    player2ComputerAttack: `${player2} ${computerAttack}`,
    player1Wins: `${player1} ${endGameWin}`,
    player2Wins: `${player1} ${endGameWin}`,
  };
}

// Ship placement related

export function orientShipSvgOnShipGrid(boardNum, shipType, axis, x, y) {
  // Define transformation and image data for each ship type
  const shipData = {
    a: { translate: "4rem", rotate: 90, image: nA },
    b: { translate: "3rem", rotate: 90, image: nB },
    d: { translate: "2rem", rotate: 90, image: nD },
    s: { translate: "2rem", rotate: 90, image: nS },
    c: { translate: "1rem", rotate: 90, image: nC },
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
      } else if (board[i][j] === "mm") {
        cell.innerText = "💨";
        cell.style.transform = "rotate(-90deg)";
        cellTarget.innerText = "💨";
        cellTarget.style.transform = "rotate(-90deg)";
        cellShip.style.backgroundColor = "var(--miss)";
        cellShipTarget.style.backgroundColor = "var(--miss)";
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
