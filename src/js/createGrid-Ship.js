import { createElement, 
  // createImg, createImgShip
 } from "./functionTemplates.js";
// import { Ship } from "./ship.js";
// import { Gameboard } from "./gameboard.js";
// import { getBoardElements } from "./domQueries.js";
// import nA from "../assets/ship5A.svg";
// import nB from "../assets/ship4B.svg";
// import nD from "../assets/ship3D.svg";
// import nS from "../assets/ship3S.svg";
// import nC from "../assets/ship2C.svg";

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



