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


// export function orientShipSvgOnShipGrid1(shipType, axis, x, y) {
//   const p1ShipBoardCellIndex = document.getElementById(`SG1: (${x},${y})`);
//   if (shipType === "a") {
//     const shipA1 = createImgShip("ship-a1", "a", `${nA}`, "ship");
//     if (axis === "v") {
//       shipA1.style.transform = "translateY(4rem) rotate(90deg)";
//     } else {
//       shipA1.style.transform = "translateX(4rem)";
//     }
//     p1ShipBoardCellIndex.appendChild(shipA1);
//   }

//   if (shipType === "b") {
//     const shipB1 = createImgShip("ship-b1", "b", `${nB}`, "ship");
//     if (axis === "v") {
//       shipB1.style.transform = "translateY(3rem) rotate(90deg)";
//     } else {
//       shipB1.style.transform = "translateX(3rem)";
//     }
//     p1ShipBoardCellIndex.appendChild(shipB1);
//   }

//   if (shipType === "d") {
//     const shipD1 = createImgShip("ship-d1", "d", `${nD}`, "ship");
//     if (axis === "v") {
//       shipD1.style.transform = "translateY(2rem) rotate(90deg)";
//     } else {
//       shipD1.style.transform = "translateX(2rem)";
//     }
//     p1ShipBoardCellIndex.appendChild(shipD1);
//   }

//   if (shipType === "s") {
//     const shipS1 = createImgShip("ship-s1", "s", `${nS}`, "ship");
//     if (axis === "v") {
//       shipS1.style.transform = "translateY(2rem) rotate(90deg)";
//     } else {
//       shipS1.style.transform = "translateX(2rem)";
//     }
//     p1ShipBoardCellIndex.appendChild(shipS1);
//   }

//   if (shipType === "c") {
//     const shipC1 = createImgShip("ship-c1", "c", `${nC}`, "ship");
//     if (axis === "v") {
//       shipC1.style.transform = "translateY(1rem) rotate(90deg)";
//     } else {
//       shipC1.style.transform = "translateX(1rem)";
//     }
//     p1ShipBoardCellIndex.appendChild(shipC1);
//   }
// }

// export function orientShipSvgOnShipGrid2(shipType, axis, x, y) {
//   const p2ShipBoardCellIndex = document.getElementById(`SG2: (${x},${y})`);
//   if (shipType === "a") {
//     const shipA2 = createImgShip("ship-a2", "a", `${nA}`, "ship");
//     if (axis === "v") {
//       shipA2.style.transform = "translateY(4rem) rotate(90deg)";
//     } else {
//       shipA2.style.transform = "translateX(4rem)";
//     }
//     p2ShipBoardCellIndex.appendChild(shipA2);
//   }

//   if (shipType === "b") {
//     const shipB2 = createImgShip("ship-b2", "b", `${nB}`, "ship");
//     if (axis === "v") {
//       shipB2.style.transform = "translateY(3rem) rotate(90deg)";
//     } else {
//       shipB2.style.transform = "translateX(3rem)";
//     }
//     p2ShipBoardCellIndex.appendChild(shipB2);
//   }

//   if (shipType === "d") {
//     const shipD2 = createImgShip("ship-d2", "d", `${nD}`, "ship");
//     if (axis === "v") {
//       shipD2.style.transform = "translateY(2rem) rotate(90deg)";
//     } else {
//       shipD2.style.transform = "translateX(2rem)";
//     }
//     p2ShipBoardCellIndex.appendChild(shipD2);
//   }

//   if (shipType === "s") {
//     const shipS2 = createImgShip("ship-s2", "s", `${nS}`, "ship");
//     if (axis === "v") {
//       shipS2.style.transform = "translateY(2rem) rotate(90deg)";
//     } else {
//       shipS2.style.transform = "translateX(2rem)";
//     }
//     p2ShipBoardCellIndex.appendChild(shipS2);
//   }

//   if (shipType === "c") {
//     const shipC2 = createImgShip("ship-c2", "c", `${nC}`, "ship");
//     if (axis === "v") {
//       shipC2.style.transform = "translateY(1rem) rotate(90deg)";
//     } else {
//       shipC2.style.transform = "translateX(1rem)";
//     }
//     p2ShipBoardCellIndex.appendChild(shipC2);
//   }
// }

// export function orientShipSvgOnShipGrid(boardNum, shipType, axis, x, y) {
//   const baseId = `${boardNum === 1 ? "SG1" : "SG2"}: (${x},${y})`;
//    const shipBoardCellId = document.getElementById(baseId);
//   if (shipType === "a") {
//     const shipA = createImgShip(`ship-a${boardNum}`, "a", `${nA}`, "ship");
//     if (axis === "v") {
//       shipA.style.transform = "translateY(4rem) rotate(90deg)";
//     } else {
//       shipA.style.transform = "translateX(4rem)";
//     }
//     shipBoardCellId.appendChild(shipA);
//   }

//   if (shipType === "b") {
//     const shipB = createImgShip(`ship-b${boardNum}`, "b", `${nB}`, "ship");
//     if (axis === "v") {
//       shipB.style.transform = "translateY(3rem) rotate(90deg)";
//     } else {
//       shipB.style.transform = "translateX(3rem)";
//     }
//     shipBoardCellId.appendChild(shipB);
//   }

//   if (shipType === "d") {
//     const shipD = createImgShip(`ship-d${boardNum}`, "d", `${nD}`, "ship");
//     if (axis === "v") {
//       shipD.style.transform = "translateY(2rem) rotate(90deg)";
//     } else {
//       shipD.style.transform = "translateX(2rem)";
//     }
//     shipBoardCellId.appendChild(shipD);
//   }

//   if (shipType === "s") {
//     const shipS = createImgShip(`ship-s${boardNum}`, "s", `${nS}`, "ship");
//     if (axis === "v") {
//       shipS.style.transform = "translateY(2rem) rotate(90deg)";
//     } else {
//       shipS.style.transform = "translateX(2rem)";
//     }
//     shipBoardCellId.appendChild(shipS);
//   }

//   if (shipType === "c") {
//     const shipC = createImgShip(`ship-c${boardNum}`, "c", `${nC}`, "ship");
//     if (axis === "v") {
//       shipC.style.transform = "translateY(1rem) rotate(90deg)";
//     } else {
//       shipC.style.transform = "translateX(1rem)";
//     }
//     shipBoardCellId.appendChild(shipC);
//   }
// }

// Even better version
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


// export function colorSunkShips1(board) {
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       let cellShipTarget = document.getElementById(`T-SG1: (${i},${j})`);
//       const p1ShipBoard = document.querySelector("#p1-ship-board");
//       const p2TargetShipBoard = document.querySelector("#p2-target-ship-board");
//       if (testGame1.ships[0].isSunk() && board[i][j] === "A!") {
//         cellShipTarget.style.backgroundColor = "var(--text)";
//       }
//       if (testGame1.ships[1].isSunk() && board[i][j] === "B!") {
//         cellShipTarget.style.backgroundColor = "var(--text)";
//       }
//       if (testGame1.ships[2].isSunk() && board[i][j] === "D!") {
//         cellShipTarget.style.backgroundColor = "var(--text)";
//       }
//       if (testGame1.ships[3].isSunk() && board[i][j] === "S!") {
//         cellShipTarget.style.backgroundColor = "var(--text)";
//       }
//       if (testGame1.ships[4].isSunk() && board[i][j] === "C!") {
//         cellShipTarget.style.backgroundColor = "var(--text)";
//       }

//       if (
//         testGame1.ships[0].isSunk() &&
//         testGame1.ships[1].isSunk() &&
//         testGame1.ships[2].isSunk() &&
//         testGame1.ships[3].isSunk() &&
//         testGame1.ships[4].isSunk()
//       ) {
//         p1ShipBoard.style.backgroundColor = "var(--loser)";
//         p2TargetShipBoard.style.backgroundColor = "var(--loser)";
//       }
//     }
//   }
// }

// export function colorSunkShips2(board) {
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       let cellShipTarget = document.getElementById(`T-SG2: (${i},${j})`);
//       const p2ShipBoard = document.querySelector("#p2-ship-board");
//       const p1TargetShipBoard = document.querySelector("#p1-target-ship-board");
//       if (testGame2.ships[0].isSunk() && board[i][j] === "A!") {
//         cellShipTarget.style.backgroundColor = "var(--text)";
//       }
//       if (testGame2.ships[1].isSunk() && board[i][j] === "B!") {
//         cellShipTarget.style.backgroundColor = "var(--text)";
//       }
//       if (testGame2.ships[2].isSunk() && board[i][j] === "D!") {
//         cellShipTarget.style.backgroundColor = "var(--text)";
//       }
//       if (testGame2.ships[3].isSunk() && board[i][j] === "S!") {
//         cellShipTarget.style.backgroundColor = "var(--text)";
//       }
//       if (testGame2.ships[4].isSunk() && board[i][j] === "C!") {
//         cellShipTarget.style.backgroundColor = "var(--text)";
//       }

//       if (
//         testGame2.ships[0].isSunk() &&
//         testGame2.ships[1].isSunk() &&
//         testGame2.ships[2].isSunk() &&
//         testGame2.ships[3].isSunk() &&
//         testGame2.ships[4].isSunk()
//       ) {
//         p2ShipBoard.style.backgroundColor = "var(--loser)";
//         p1TargetShipBoard.style.backgroundColor = "var(--loser)";
//       }
//     }
//   }
// }

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


