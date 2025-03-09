import { createElement } from "./functionTemplates.js";

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
