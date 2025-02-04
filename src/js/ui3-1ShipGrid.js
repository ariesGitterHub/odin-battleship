import { createElement } from "./basicFunctionTemplates.js";
// import { Ship } from "./ship.js";
// import { Gameboard } from "./gameboard.js";
import { createImg } from "./basicFunctionTemplates.js";

import { createImgShip } from "./basicShipImgTemplate.js";
import nA from "../assets/ship5A.svg";
import nB from "../assets/ship4B.svg";
import nD from "../assets/ship3D.svg";
import nS from "../assets/ship3S.svg";
import nC from "../assets/ship2C.svg";

// import p from "../assets/ship1P.svg";

// export function createShipGrid1(board) {
//   let grid = [];
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement("div", {
//         id: `SG1: (${i},${j})`,
//         class: "ship-cells1",
//       });
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

// export function createTargetShipGrid1(board) {
//   let grid = [];
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement("div", {
//         id: `T-SG1: (${i},${j})`,
//         class: "ship-cells1 ship-target-cells1",
//       });
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

// export function createShipGrid2(board) {
//   let grid = [];
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement("div", {
//         id: `SG2: (${i},${j})`,
//         class: "ship-cells2",
//       });
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

// export function createTargetShipGrid2(board) {
//   let grid = [];
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement("div", {
//         id: `T-SG2: (${i},${j})`,
//         class: "ship-cells2 ship-target-cells2",
//       });
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

export function createShipGrid(board, boardNum, gridType) {
  let grid = [];
  const idPrefix =
    gridType === "targetZone" ? `T-SG${boardNum}` : `SG${boardNum}`;
  const cellClass =
    gridType === "targetZone"
      ? `ship-target-cells${boardNum}`
      : `ship-cells${boardNum}`;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `${idPrefix}: (${i},${j})`,
        class: cellClass,
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

// More concise version of above that is not what I am used to, read up on "flatMap":
// export function createShipGrid(board, gameboardNum, gridType) {
//   const idPrefix =
//     gridType === "targetZone" ? `T-SG${gameboardNum}` : `SG${gameboardNum}`;
//   const cellClass = `${
//     gridType === "targetZone" ? "ship-target-cells" : "ship-cells"
//   }${gameboardNum}`;

//   return board.flatMap((row, i) =>
//     row.map((_, j) =>
//       createElement("div", {
//         id: `${idPrefix}: (${i},${j})`,
//         class: cellClass,
//       })
//     )
//   );
// }

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
  const shipCellsClass = document.querySelectorAll(`.ship-cells${boardNum}`);
  const ships = document.querySelectorAll(".ship");

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

export function colorSunkShips(board, boardNum) {
  const shipBoardId =
    boardNum === 1 ? "#p1-ship-board" : "#p2-ship-board";
  const targetShipBoardId =
    boardNum === 1 ? "#p2-target-ship-board" : "#p1-target-ship-board";

  for (let i = 0; i < board.board.length; i++) {
    for (let j = 0; j < board.board[i].length; j++) {
      let cellShipTarget = document.getElementById(
        `T-SG${boardNum === 1 ? 1 : 2}: (${i},${j})`
      );

      ["A!", "B!", "D!", "S!", "C!"].forEach((shipCode, index) => {
        if (board.ships[index].isSunk() && board.board[i][j] === shipCode) {
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


